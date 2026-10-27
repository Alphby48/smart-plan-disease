import { Buffer } from "buffer";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import * as jpeg from "jpeg-js";
import { useEffect, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import { loadTensorflowModel } from "react-native-fast-tflite";

export default function ChiliDisease() {
  const [model, setModel] = useState<any>(null);
  const [result, setResult] = useState<string>("");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const KELAS_CABAI = [
    "Bercak Daun",
    "Daun Keriting",
    "Daun Kuning",
    "Daun Sehat",
    "Embun Tepung",
  ];

  useEffect(() => {
    async function init() {
      const [{ localUri, uri }] = await Asset.loadAsync(
        require("../../assets/model/Chili_MobileNetV2_fine-tuning.tflite"),
      );
      const modelPath = localUri || uri;
      const loaded = await loadTensorflowModel({ url: modelPath }, []);
      setModel(loaded);
    }
    init();
  }, []);

  // Fungsi inti untuk memproses URI gambar dari sumber mana pun
  const processAndPredict = async (uri: string) => {
    try {
      setImageUri(uri);
      setResult("Memproses...");

      const resized = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 224, height: 224 } }],
        { format: ImageManipulator.SaveFormat.JPEG },
      );

      const base64 = await FileSystem.readAsStringAsync(resized.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const buffer = Buffer.from(base64, "base64");
      const rawImageData = jpeg.decode(buffer, { useTArray: true });

      const rgbData = new Float32Array(224 * 224 * 3);
      let rgbIndex = 0;
      for (let i = 0; i < rawImageData.data.length; i += 4) {
        rgbData[rgbIndex++] = rawImageData.data[i];
        rgbData[rgbIndex++] = rawImageData.data[i + 1];
        rgbData[rgbIndex++] = rawImageData.data[i + 2];
      }

      if (model) {
        const output = await model.run([rgbData.buffer]);
        if (!output || output.length === 0) {
          setResult("Gagal: Model tidak merespons.");
          return;
        }

        const resultTensor = output[0];
        const floatOutput = new Float32Array(
          resultTensor.buffer || resultTensor,
        );

        let maxConfidence = 0;
        let maxIndex = 0;
        for (let i = 0; i < floatOutput.length; i++) {
          if (floatOutput[i] > maxConfidence) {
            maxConfidence = floatOutput[i];
            maxIndex = i;
          }
        }

        const namaPenyakit = KELAS_CABAI[maxIndex] || `Kelas ${maxIndex}`;
        const persentase = (maxConfidence * 100).toFixed(2);
        setResult(`Penyakit: ${namaPenyakit}\nConfidence: ${persentase}%`);
      }
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  // Opsi 1: Kamera
  const takePhoto = async () => {
    const photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!photo.canceled && photo.assets && photo.assets.length > 0) {
      await processAndPredict(photo.assets[0].uri);
    }
  };

  // Opsi 2: Galeri
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      await processAndPredict(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
      className="bg-white"
    >
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 224, height: 224, marginBottom: 20 }}
        />
      )}

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button title="Buka Kamera" onPress={takePhoto} disabled={!model} />
        <Button
          title="Pilih dari Galeri"
          onPress={pickImage}
          disabled={!model}
        />
      </View>

      <Text
        style={{ marginTop: 20, textAlign: "center" }}
        className="text-black"
      >
        {result}
      </Text>
    </View>
  );
}
