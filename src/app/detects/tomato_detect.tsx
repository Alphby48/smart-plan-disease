import HeaderDetectComponent from "@/components/header-detect";
import TipsComponent from "@/components/tips";
import TitleCardComponent from "@/components/title-card";
import { Buffer } from "buffer";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as jpeg from "jpeg-js";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Camera,
  Image as ImageIcon,
  Upload,
  Zap,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loadTensorflowModel } from "react-native-fast-tflite";
import { SafeAreaView } from "react-native-safe-area-context";
import { PLANT_DATA } from "../../../functions/data";

const DeteksiTomatApp = () => {
  const [model, setModel] = useState<any>(null);
  const [result, setResult] = useState<any>({});
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [planData, setPlanData] = useState<any>(
    PLANT_DATA.filter((item) => item.name === "Tomat")[0],
  );

  const KELAS_TOMAT = planData.chips;
  useEffect(() => {
    async function init() {
      const [{ localUri, uri }] = await Asset.loadAsync(
        require("../../../assets/model/Tomato_MobileNetV2_fine-tuning.tflite"),
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
          //   setResult("Gagal: Model tidak merespons.");
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

        const namaPenyakit = KELAS_TOMAT[maxIndex] || `Kelas ${maxIndex}`;
        const persentase = (maxConfidence * 100).toFixed(2);
        setResult({
          namaPenyakit,
          persentase,
          kelas: maxIndex,
        });
      }
    } catch (error) {
      //   setResult();
      console.error(error);
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

  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#f4fcf6]">
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <HeaderDetectComponent text="Deteksi Penyakit Tomat" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* TITLE CARD */}
        <TitleCardComponent
          latin="Solana lycopersicum"
          title="Deteksi Penyakit Tomat"
          accuracy={95.02}
        />

        {/* BUKA KAMERA LANGSUNG CARD */}
        <TouchableOpacity
          onPress={takePhoto}
          className="bg-[#0f4a25] mx-5 mt-4 p-4 rounded-2xl flex-row items-center shadow-md"
        >
          <View className="w-14 h-14 bg-[#d9f99d] rounded-xl justify-center items-center mr-4">
            <Camera color="#0f4a25" size={28} />
          </View>
          <View className="flex-1 mr-2">
            <View className="flex-row items-center mb-1">
              <Text className="text-base font-bold text-white mr-2">
                Buka Kamera Langsung
              </Text>
              <View className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
            </View>
            <Text className="text-xs text-green-100 leading-4">
              Ambil foto daun langsung dari tanaman di kebun
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-white/10 justify-center items-center">
            <ArrowRight color="white" size={18} />
          </View>
        </TouchableOpacity>

        {/* PILIH DARI GALERI CARD */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-white mx-5 mt-4 p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-100"
        >
          <View className="w-14 h-14 bg-[#f3f4f6] rounded-xl justify-center items-center mr-4">
            <ImageIcon color="#166534" size={28} />
          </View>
          <View className="flex-1 mr-2">
            <View className="flex-row items-center mb-1">
              <Text className="text-base font-bold text-[#111827] mr-2">
                Pilih dari Galeri
              </Text>
              <View className="bg-gray-200 px-2 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-gray-600">
                  JPG, PNG
                </Text>
              </View>
            </View>
            <Text className="text-xs text-gray-500 leading-4">
              Unggah foto yang sudah tersimpan di galeri ponsel
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-[#f3f4f6] justify-center items-center">
            <Upload color="#4b5563" size={16} />
          </View>
        </TouchableOpacity>

        {/* INFO TEXT */}
        <View className="flex-row justify-center items-center mt-5 mb-4">
          <Zap color="#84cc16" size={14} />
          <Text className="text-[11px] font-medium text-gray-600 ml-3">
            Foto otomatis dianalisis oleh AI dalam hitungan detik
          </Text>
        </View>

        {/* TIPS FOTO BAR */}
        <TipsComponent />

        {/* CONTOH HASIL DIAGNOSA */}
        <View className="bg-white mx-5 mt-6 p-4 rounded-[28px] shadow-sm border border-gray-100">
          <View className="flex-row justify-between items-center mb-4 px-1">
            <View className="flex-row items-center">
              <Activity color="#374151" size={20} />
              <Text className="text-lg font-bold text-[#111827] ml-2.5">
                Hasil Diagnosa
              </Text>
            </View>
            <View className="bg-[#e5e7eb] px-2 py-1 rounded-full">
              <Text className="text-[10px] font-bold text-gray-600">
                {planData.model}
              </Text>
            </View>
          </View>

          {/* Inner Light Green Card */}
          <View className="bg-[#eef8f1] rounded-2xl p-2.5">
            {/* Image Section */}
            <View className="w-full h-[200px] mb-3 flex-row items-center justify-center my-5">
              {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  className="w-[224px] h-[224px] rounded-xl bg-gray-300"
                />
              )}
            </View>

            {/* Disease Info */}
            {result.namaPenyakit && (
              <View className="flex-col items-center my-5 gap-4">
                <Text className="text-3xl font-bold text-[#166534]">
                  {result.namaPenyakit}
                </Text>
                <Text className="text-xl font-bold text-[#166534]">
                  {`Confidence: ${result.persentase}%`}
                </Text>
              </View>
            )}
            {/* Penjelasan */}
            {result.namaPenyakit && (
              <View className="flex-col my-5 gap-4">
                <Text className="text-xl font-bold text-[#166534]">
                  Penjelasan:
                </Text>
                <Text className="text-lg font-medium text-gray-600">
                  {planData.explanation[result.kelas]}
                </Text>
                <Text className="text-xl font-bold text-[#166534] mt-2">
                  Solusi:
                </Text>
                <Text className="text-lg font-medium text-gray-600">
                  {planData.solution[result.kelas]}
                </Text>
              </View>
            )}
            {/* Recommendation Box */}
            <View className="bg-white p-3 rounded-xl flex-row items-center shadow-sm">
              <BadgeCheck color="#166534" size={20} />
              <Text className="text-xs font-bold text-[#166534] flex-1 ml-3">
                Rekomendasi organik & fungisida otomatis tersedia
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeteksiTomatApp;
