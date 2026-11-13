import BottomNavigationComponent from "@/components/bottom-navigation";
import HeaderDetectComponent from "@/components/header-detect";
import TipsComponent from "@/components/tips";
import { Buffer } from "buffer";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as jpeg from "jpeg-js";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Camera,
  CheckCircle2,
  ChevronRight,
  Image as ImageIcon,
  Layers,
  Leaf,
  RefreshCw,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loadTensorflowModel } from "react-native-fast-tflite";
import { SafeAreaView } from "react-native-safe-area-context";
import { PLANT_DATA } from "../../functions/data";

// Stage 1 classes per AGENTS.md: ['Cabai', 'Jagung', 'Padi', 'Tomat']
const STAGE1_CLASSES = ["Cabai", "Jagung", "Padi", "Tomat"] as const;

// Mapping to Stage 2 disease tflite models
const DISEASE_MODEL_ASSETS: Record<string, any> = {
  Cabai: require("@/assets/model/Chili_MobileNetV2_fine-tuning.tflite"),
  Jagung: require("@/assets/model/Corn_MobileNetV2_fine-tuning.tflite"),
  Padi: require("@/assets/model/Rice_MobileNetV2_fine-tuning.tflite"),
  Tomat: require("@/assets/model/Tomato_MobileNetV2_fine-tuning.tflite"),
};

type PredictingStage =
  | "idle"
  | "preprocessing"
  | "stage1"
  | "stage2"
  | "done"
  | "error";

interface Stage1Result {
  tanaman: string;
  persentase: string;
  kelas: number;
  plantData: any;
}

interface Stage2Result {
  namaPenyakit: string;
  persentase: string;
  kelas: number;
  penjelasan: string;
  solusi: string;
}

const PindaiCepatApp = () => {
  const router = useRouter();

  const [stage1Model, setStage1Model] = useState<any>(null);
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const diseaseModelsCache = useRef<Record<string, any>>({});

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [predictingStage, setPredictingStage] =
    useState<PredictingStage>("idle");
  const [stage1Result, setStage1Result] = useState<Stage1Result | null>(null);
  const [stage2Result, setStage2Result] = useState<Stage2Result | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Inisialisasi Model Stage 1 (Klasifikasi Daun)
  useEffect(() => {
    let isMounted = true;
    async function initStage1() {
      try {
        setIsModelLoading(true);
        const [{ localUri, uri }] = await Asset.loadAsync(
          require("@/assets/model/Daun_MobileNetV2_fine-tuning.tflite"),
        );
        const modelPath = localUri || uri;
        const loaded = await loadTensorflowModel({ url: modelPath }, []);
        if (isMounted) {
          setStage1Model(loaded);
          setIsModelLoading(false);
        }
      } catch (err) {
        console.error("Gagal memuat Stage 1 Leaf Model:", err);
        if (isMounted) {
          setIsModelLoading(false);
          setErrorMessage(
            "Gagal memuat model klasifikasi daun. Pastikan file model tersedia.",
          );
        }
      }
    }
    initStage1();

    return () => {
      isMounted = false;
    };
  }, []);

  // Helper untuk lazy-loading dan cache model Stage 2
  const getDiseaseModel = async (plantName: string) => {
    if (diseaseModelsCache.current[plantName]) {
      return diseaseModelsCache.current[plantName];
    }
    const assetSource = DISEASE_MODEL_ASSETS[plantName];
    if (!assetSource) {
      throw new Error(`Model penyakit untuk tanaman ${plantName} belum tersedia.`);
    }
    const [{ localUri, uri }] = await Asset.loadAsync(assetSource);
    const modelPath = localUri || uri;
    const loaded = await loadTensorflowModel({ url: modelPath }, []);
    diseaseModelsCache.current[plantName] = loaded;
    return loaded;
  };

  // Pipeline inferensi dua tahap (Stage 1 -> Stage 2)
  const processAndPredict = async (uri: string) => {
    try {
      setImageUri(uri);
      setErrorMessage(null);
      setStage1Result(null);
      setStage2Result(null);
      setPredictingStage("preprocessing");

      // 1. Image preprocessing strictly following AGENTS.md reference logic
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

      if (!stage1Model) {
        throw new Error(
          "Model klasifikasi daun belum siap. Mohon tunggu beberapa detik.",
        );
      }

      // 2. STAGE 1: Klasifikasi Daun (Cabai, Jagung, Padi, Tomat)
      setPredictingStage("stage1");
      const stage1Output = await stage1Model.run([rgbData.buffer]);
      if (!stage1Output || stage1Output.length === 0) {
        throw new Error("Model Tahap 1 tidak memberikan output.");
      }

      const stage1ResultTensor = stage1Output[0];
      const stage1FloatOutput = new Float32Array(
        stage1ResultTensor.buffer || stage1ResultTensor,
      );

      let stage1MaxConfidence = 0;
      let stage1MaxIndex = 0;
      for (let i = 0; i < stage1FloatOutput.length; i++) {
        if (stage1FloatOutput[i] > stage1MaxConfidence) {
          stage1MaxConfidence = stage1FloatOutput[i];
          stage1MaxIndex = i;
        }
      }

      const detectedPlant =
        STAGE1_CLASSES[stage1MaxIndex] || `Kelas ${stage1MaxIndex}`;
      const plantConfidence = (stage1MaxConfidence * 100).toFixed(2);
      const targetPlantData =
        PLANT_DATA.find((item: any) => item.name === detectedPlant) || null;

      const stage1Res: Stage1Result = {
        tanaman: detectedPlant,
        persentase: plantConfidence,
        kelas: stage1MaxIndex,
        plantData: targetPlantData,
      };
      setStage1Result(stage1Res);

      // 3. STAGE 2: Routing ke Model Penyakit Tanaman yang Cocok
      setPredictingStage("stage2");
      const diseaseModel = await getDiseaseModel(detectedPlant);

      // Masukkan buffer gambar yang persis sama ke Model Penyakit
      const stage2Output = await diseaseModel.run([rgbData.buffer]);
      if (!stage2Output || stage2Output.length === 0) {
        throw new Error(
          `Model penyakit untuk ${detectedPlant} tidak memberikan respon.`,
        );
      }

      const stage2ResultTensor = stage2Output[0];
      const stage2FloatOutput = new Float32Array(
        stage2ResultTensor.buffer || stage2ResultTensor,
      );

      let stage2MaxConfidence = 0;
      let stage2MaxIndex = 0;
      for (let i = 0; i < stage2FloatOutput.length; i++) {
        if (stage2FloatOutput[i] > stage2MaxConfidence) {
          stage2MaxConfidence = stage2FloatOutput[i];
          stage2MaxIndex = i;
        }
      }

      const chips: string[] = targetPlantData?.chips || [];
      const namaPenyakit = chips[stage2MaxIndex] || `Kelas ${stage2MaxIndex}`;
      const diseaseConfidence = (stage2MaxConfidence * 100).toFixed(2);
      const penjelasan =
        targetPlantData?.explanation?.[stage2MaxIndex] ||
        "Penjelasan rinci untuk diagnosa ini belum tersedia.";
      const solusi =
        targetPlantData?.solution?.[stage2MaxIndex] ||
        "Gunakan fungisida atau bakterisida sesuai anjuran dan konsultasikan dengan petugas penyuluh pertanian setempat.";

      setStage2Result({
        namaPenyakit,
        persentase: diseaseConfidence,
        kelas: stage2MaxIndex,
        penjelasan,
        solusi,
      });

      setPredictingStage("done");
    } catch (err: any) {
      console.error("Pindai Cepat Error:", err);
      setErrorMessage(
        err?.message || "Terjadi kesalahan saat memproses gambar daun.",
      );
      setPredictingStage("error");
    }
  };

  // Opsi 1: Kamera
  const takePhoto = async () => {
    try {
      const photo = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 1,
      });
      if (!photo.canceled && photo.assets && photo.assets.length > 0) {
        await processAndPredict(photo.assets[0].uri);
      }
    } catch (err) {
      console.error("Kamera error:", err);
    }
  };

  // Opsi 2: Galeri
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        await processAndPredict(result.assets[0].uri);
      }
    } catch (err) {
      console.error("Galeri error:", err);
    }
  };

  const isHealthy =
    stage2Result?.namaPenyakit.toLowerCase().includes("sehat") || false;

  return (
    <SafeAreaView className="flex-1 bg-[#f4fcf6]">
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <HeaderDetectComponent text="Pindai Cepat AI" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 110 }}
      >
        {/* BANNER UTAMA */}
        <View className="bg-[#14532d] mx-5 mt-2 p-5 rounded-3xl relative overflow-hidden shadow-sm">
          <View className="absolute -right-10 -bottom-10 w-44 h-44 bg-[#166534] rounded-full opacity-50" />
          <View className="flex-row items-center bg-white/20 px-3 py-1 rounded-full self-start mb-3">
            <Sparkles color="#bbf7d0" size={14} />
            <Text className="text-xs font-semibold text-white ml-2">
              Auto-Detection • 2-Stage Pipeline
            </Text>
          </View>
          <Text className="text-xl font-extrabold text-white mb-1">
            Pindai Cepat Tanpa Pilih
          </Text>
          <Text className="text-xs text-green-100 leading-5 pr-2">
            AI otomatis mengenali daun (Cabai, Jagung, Padi, Tomat) lalu
            mengarahkan diagnosa ke model spesifik tanaman secara otomatis.
          </Text>

          {/* 2-STAGE BADGE STEPS */}
          <View className="flex-row items-center mt-4 pt-3 border-t border-white/15">
            <View className="flex-row items-center flex-1">
              <View className="w-5 h-5 rounded-full bg-[#86efac] justify-center items-center mr-2">
                <Text className="text-[10px] font-bold text-[#14532d]">1</Text>
              </View>
              <Text className="text-[11px] font-medium text-white">
                Klasifikasi Daun
              </Text>
            </View>
            <ChevronRight color="#86efac" size={16} />
            <View className="flex-row items-center flex-1 ml-2">
              <View className="w-5 h-5 rounded-full bg-[#86efac] justify-center items-center mr-2">
                <Text className="text-[10px] font-bold text-[#14532d]">2</Text>
              </View>
              <Text className="text-[11px] font-medium text-white">
                Diagnosa Penyakit
              </Text>
            </View>
          </View>
        </View>

        {/* STATUS MODEL LOADING */}
        {isModelLoading && (
          <View className="mx-5 mt-3 bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-xl flex-row items-center">
            <ActivityIndicator size="small" color="#d97706" />
            <Text className="text-xs font-medium text-amber-800 ml-2.5 flex-1">
              Menyiapkan model AI klasifikasi daun...
            </Text>
          </View>
        )}

        {/* BUTTON ACTION: BUKA KAMERA */}
        <TouchableOpacity
          onPress={takePhoto}
          disabled={isModelLoading || predictingStage === "stage1" || predictingStage === "stage2"}
          activeOpacity={0.85}
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
              <View className="w-2 h-2 rounded-full bg-[#84cc16]" />
            </View>
            <Text className="text-xs text-green-100 leading-4">
              Arahkan ke daun tanaman bergejala untuk auto-scan
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-white/10 justify-center items-center">
            <ArrowRight color="white" size={18} />
          </View>
        </TouchableOpacity>

        {/* BUTTON ACTION: PILIH DARI GALERI */}
        <TouchableOpacity
          onPress={pickImage}
          disabled={isModelLoading || predictingStage === "stage1" || predictingStage === "stage2"}
          activeOpacity={0.85}
          className="bg-white mx-5 mt-3 p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-100"
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
              Unggah foto daun yang sudah tersimpan di galeri
            </Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-[#f3f4f6] justify-center items-center">
            <Upload color="#4b5563" size={16} />
          </View>
        </TouchableOpacity>

        {/* INDIKATOR PROGRES DUA TAHAP */}
        {(predictingStage === "preprocessing" ||
          predictingStage === "stage1" ||
          predictingStage === "stage2") && (
          <View className="bg-white mx-5 mt-4 p-5 rounded-2xl shadow-sm border border-green-100">
            <View className="flex-row items-center mb-3">
              <ActivityIndicator size="small" color="#166534" />
              <Text className="text-sm font-bold text-[#111827] ml-3">
                Memproses Pipeline 2-Tahap...
              </Text>
            </View>

            <View className="space-y-2 mt-2">
              <View className="flex-row items-center py-1">
                {predictingStage === "preprocessing" ? (
                  <ActivityIndicator size={14} color="#166534" />
                ) : (
                  <CheckCircle2 color="#16a34a" size={16} />
                )}
                <Text className="text-xs text-gray-700 ml-2 font-medium">
                  Persiapan Gambar (Resizing 224x224 & Float32 Tensor)
                </Text>
              </View>

              <View className="flex-row items-center py-1">
                {predictingStage === "stage1" ? (
                  <ActivityIndicator size={14} color="#166534" />
                ) : stage1Result ? (
                  <CheckCircle2 color="#16a34a" size={16} />
                ) : (
                  <View className="w-4 h-4 rounded-full border border-gray-300" />
                )}
                <Text className="text-xs text-gray-700 ml-2 font-medium">
                  {stage1Result
                    ? `Tahap 1 Selesai: Daun ${stage1Result.tanaman} (${stage1Result.persentase}%)`
                    : "Tahap 1: Klasifikasi Daun (Cabai, Jagung, Padi, Tomat)..."}
                </Text>
              </View>

              <View className="flex-row items-center py-1">
                {predictingStage === "stage2" ? (
                  <ActivityIndicator size={14} color="#166534" />
                ) : stage2Result ? (
                  <CheckCircle2 color="#16a34a" size={16} />
                ) : (
                  <View className="w-4 h-4 rounded-full border border-gray-300" />
                )}
                <Text className="text-xs text-gray-700 ml-2 font-medium">
                  {stage2Result
                    ? `Tahap 2 Selesai: ${stage2Result.namaPenyakit}`
                    : "Tahap 2: Mendiagnosa Penyakit Spesifik Tanaman..."}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ERROR STATE */}
        {errorMessage && (
          <View className="mx-5 mt-4 bg-red-50 border border-red-200 p-4 rounded-2xl flex-row items-start">
            <AlertCircle color="#dc2626" size={20} className="mt-0.5" />
            <View className="ml-3 flex-1">
              <Text className="text-sm font-bold text-red-800">
                Gagal Mendiagnosa
              </Text>
              <Text className="text-xs text-red-600 mt-1 leading-4">
                {errorMessage}
              </Text>
            </View>
          </View>
        )}

        {/* HASIL DIAGNOSA LENGKAP */}
        {predictingStage === "done" && stage1Result && stage2Result && (
          <View className="bg-white mx-5 mt-5 p-4 rounded-[28px] shadow-sm border border-gray-100">
            {/* Header Hasil */}
            <View className="flex-row justify-between items-center mb-3 px-1">
              <View className="flex-row items-center">
                <Activity color="#166534" size={20} />
                <Text className="text-lg font-bold text-[#111827] ml-2">
                  Hasil Diagnosa AI
                </Text>
              </View>
              <View className="bg-[#dcfce7] px-2.5 py-1 rounded-full">
                <Text className="text-[10px] font-bold text-[#166534]">
                  Two-Stage Success
                </Text>
              </View>
            </View>

            {/* Container Card */}
            <View className="bg-[#eef8f1] rounded-2xl p-4">
              {/* Foto Daun Preview */}
              {imageUri && (
                <View className="w-full h-[210px] mb-4 items-center justify-center">
                  <Image
                    source={{ uri: imageUri }}
                    className="w-[210px] h-[210px] rounded-2xl bg-gray-200"
                    resizeMode="cover"
                  />
                </View>
              )}

              {/* STAGE 1: HASIL KLASIFIKASI TANAMAN */}
              <View className="bg-white p-3.5 rounded-xl mb-3 shadow-xs border border-green-100">
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center">
                    <View className="w-6 h-6 rounded-full bg-[#dcfce7] justify-center items-center mr-2">
                      <Leaf color="#166534" size={14} />
                    </View>
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Tahap 1: Jenis Tanaman
                    </Text>
                  </View>
                  <View className="bg-[#dcfce7] px-2 py-0.5 rounded-full">
                    <Text className="text-[11px] font-bold text-[#166534]">
                      {stage1Result.persentase}% Akurasi
                    </Text>
                  </View>
                </View>
                <Text className="text-xl font-extrabold text-[#111827]">
                  {stage1Result.tanaman}
                  {stage1Result.plantData?.scientific && (
                    <Text className="text-xs font-normal italic text-gray-500">
                      {" "}
                      ({stage1Result.plantData.scientific})
                    </Text>
                  )}
                </Text>
                <Text className="text-[11px] text-gray-500 mt-0.5">
                  Model berhasil merutekan otomatis ke classifier penyakit{" "}
                  {stage1Result.tanaman}.
                </Text>
              </View>

              {/* STAGE 2: HASIL DETEKSI PENYAKIT */}
              <View className="bg-white p-4 rounded-xl shadow-xs border border-green-100">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <View className="w-6 h-6 rounded-full bg-[#dcfce7] justify-center items-center mr-2">
                      <Layers color="#166534" size={14} />
                    </View>
                    <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Tahap 2: Diagnosa Penyakit
                    </Text>
                  </View>
                  <View
                    className={`px-2 py-0.5 rounded-full ${
                      isHealthy ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-[11px] font-bold ${
                        isHealthy ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {stage2Result.persentase}% Confidence
                    </Text>
                  </View>
                </View>

                <Text
                  className={`text-2xl font-black ${
                    isHealthy ? "text-[#166534]" : "text-[#991b1b]"
                  }`}
                >
                  {stage2Result.namaPenyakit}
                </Text>

                {/* Penjelasan */}
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-xs font-bold text-[#111827] mb-1">
                    Karakteristik & Penjelasan:
                  </Text>
                  <Text className="text-xs text-gray-600 leading-5">
                    {stage2Result.penjelasan}
                  </Text>
                </View>

                {/* Solusi */}
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <Text className="text-xs font-bold text-[#166534] mb-1">
                    Rekomendasi Tindakan / Solusi:
                  </Text>
                  <Text className="text-xs text-gray-600 leading-5">
                    {stage2Result.solusi}
                  </Text>
                </View>
              </View>

              {/* LINK KE DETAIL SCREEN TANAMAN SPESIFIK */}
              {stage1Result.plantData?.link && (
                <TouchableOpacity
                  onPress={() => router.push(stage1Result.plantData.link as any)}
                  activeOpacity={0.8}
                  className="bg-[#166534] mt-4 p-3.5 rounded-xl flex-row items-center justify-between"
                >
                  <View className="flex-row items-center flex-1 mr-2">
                    <BadgeCheck color="#ffffff" size={18} />
                    <Text className="text-xs font-bold text-white ml-2 flex-1">
                      Buka Modul Khusus {stage1Result.tanaman}
                    </Text>
                  </View>
                  <ChevronRight color="#ffffff" size={16} />
                </TouchableOpacity>
              )}

              {/* RETAKE BUTTON */}
              <TouchableOpacity
                onPress={takePhoto}
                activeOpacity={0.8}
                className="bg-white border border-gray-200 mt-2 p-3 rounded-xl flex-row items-center justify-center"
              >
                <RefreshCw color="#374151" size={16} />
                <Text className="text-xs font-bold text-gray-700 ml-2">
                  Pindai Daun Lainnya
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TIPS FOTO */}
        <View className="mt-5">
          <TipsComponent />
        </View>

        {/* INFO FOOTER */}
        <View className="flex-row justify-center items-center mt-4 mb-2 px-6">
          <Zap color="#84cc16" size={14} />
          <Text className="text-[11px] font-medium text-gray-500 ml-2 text-center">
            Pindai Cepat menggunakan MobileNetV2 terkalibrasi dua tahap
          </Text>
        </View>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <BottomNavigationComponent />
    </SafeAreaView>
  );
};

export default PindaiCepatApp;
