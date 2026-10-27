import BottomNavigationComponent from "@/components/bottom-navigation";
import HeaderComponent from "@/components/header";
import { useRouter } from "expo-router";
import {
  Camera,
  Check,
  CheckCircle,
  Leaf,
  Scan,
  X,
  Zap,
} from "lucide-react-native";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PanduanApp = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#f4fcf6]">
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <HeaderComponent navigation="Panduan" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* HERO CARD */}
        <View className="mx-5 my-2 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <View className="flex-row items-center bg-[#f0fdf4] px-3 py-1.5 rounded-full self-start mb-4">
            <CheckCircle color="#166534" size={14} />
            <Text className="text-xs font-bold text-[#166534] ml-2">
              Panduan Cepat Diagnosa AI
            </Text>
          </View>
          <Text className="text-[28px] font-bold text-[#111827] mb-2">
            Panduan Foto Daun
          </Text>
          <Text className="text-sm text-gray-500 leading-5">
            Cukup ikuti 3 langkah mudah untuk akurasi deteksi AI optimal di
            kebun tanpa repot.
          </Text>
        </View>

        {/* 3 LANGKAH MUDAH */}
        <View className="px-5 mt-4 mb-3">
          <Text className="text-lg font-bold text-[#111827]">
            3 Langkah Mudah
          </Text>
          <Text className="text-sm text-gray-500">
            Praktis dan siap dalam hitungan detik
          </Text>
        </View>

        <View className="px-5 space-y-3">
          {/* Step 1 */}
          <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-100">
            <View className="w-10 h-10 bg-[#166534] rounded-full justify-center items-center mr-4">
              <Text className="text-white font-bold text-base">1</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#111827] mb-0.5">
                Pilih Daun Sakit
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Ambil helai daun dengan bercak atau gejala penyakit paling
                jelas.
              </Text>
            </View>
            <Leaf color="#166534" size={24} className="ml-2 opacity-80" />
          </View>

          {/* Step 2 */}
          <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-100 mt-3">
            <View className="w-10 h-10 bg-[#166534] rounded-full justify-center items-center mr-4">
              <Text className="text-white font-bold text-base">2</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#111827] mb-0.5">
                Jarak 10–15 cm & Fokus
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Posisikan kamera sejajar, ketuk layar agar bercak terlihat
                tajam.
              </Text>
            </View>
            <Scan color="#166534" size={24} className="ml-2 opacity-80" />
          </View>

          {/* Step 3 */}
          <View className="bg-white p-4 rounded-2xl flex-row items-center shadow-sm border border-gray-100 mt-3">
            <View className="w-10 h-10 bg-[#166534] rounded-full justify-center items-center mr-4">
              <Text className="text-white font-bold text-base">3</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#111827] mb-0.5">
                Ambil Foto & Cek Hasil
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Tekan tombol pindai, hasil diagnosis langsung muncul seketika.
              </Text>
            </View>
            <Camera color="#166534" size={24} className="ml-2 opacity-80" />
          </View>
        </View>

        {/* TIPS FOTO TERBAIK */}
        <View className="px-5 mt-6 mb-3">
          <Text className="text-lg font-bold text-[#111827]">
            Tips Foto Terbaik
          </Text>
          <Text className="text-sm text-gray-500">
            Pedoman ringkas agar hasil diagnosa tepat sasaran
          </Text>
        </View>

        <View className="mx-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          {/* Tip 1 */}
          <View className="flex-row mb-4">
            <View className="w-8 h-8 rounded-full bg-[#dcfce7] justify-center items-center mr-3 mt-1">
              <Check color="#166534" size={16} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#166534] mb-0.5">
                Fokus Satu Daun
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Posisikan daun di tengah, bukan seluruh pohon atau kebun dari
                jauh.
              </Text>
            </View>
          </View>

          {/* Tip 2 */}
          <View className="flex-row mb-4">
            <View className="w-8 h-8 rounded-full bg-[#dcfce7] justify-center items-center mr-3 mt-1">
              <Check color="#166534" size={16} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#166534] mb-0.5">
                Cahaya Alami Terang
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Gunakan cahaya pagi/sore yang cukup dan tidak silau backlight.
              </Text>
            </View>
          </View>

          {/* Tip 3 */}
          <View className="flex-row mb-4">
            <View className="w-8 h-8 rounded-full bg-[#fee2e2] justify-center items-center mr-3 mt-1">
              <X color="#b91c1c" size={16} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#b91c1c] mb-0.5">
                Hindari Foto Goyang / Blur
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Tahan kamera dengan tenang atau tahan tangkai jika berangin.
              </Text>
            </View>
          </View>

          {/* Tip 4 */}
          <View className="flex-row">
            <View className="w-8 h-8 rounded-full bg-[#fee2e2] justify-center items-center mr-3 mt-1">
              <X color="#b91c1c" size={16} />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-bold text-[#b91c1c] mb-0.5">
                Hindari Daun Basah Kuyup
              </Text>
              <Text className="text-xs text-gray-500 leading-4">
                Pantulan butir air bisa menghalangi pola bercak patogen.
              </Text>
            </View>
          </View>
        </View>

        {/* OFFLINE MODE BANNER */}
        <View className="mx-5 mt-5 bg-[#e8f6ed] p-4 rounded-2xl flex-row items-center border border-[#d1fae5]">
          <View className="w-10 h-10 bg-[#166534] rounded-full justify-center items-center mr-3">
            <Zap color="#ffffff" size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#111827] mb-0.5">
              Mendukung Mode Offline
            </Text>
            <Text className="text-xs text-gray-600 leading-4">
              Bisa mendiagnosa langsung di ladang tanpa koneksi internet.
            </Text>
          </View>
        </View>

        {/* BUTTON & FOOTER TEXT */}
        <View className="px-5 mt-6 mb-4">
          <TouchableOpacity className="bg-[#1a472a] flex-row justify-center items-center py-4 rounded-full shadow-md">
            <Camera color="white" size={20} />
            <Text className="text-white text-base font-bold ml-3">
              Mulai Pindai Sekarang
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-[10px] text-gray-500 mb-8 font-medium">
          Disusun bersama Tim AI & Pakar Agronomi Lapangan
        </Text>
      </ScrollView>

      <BottomNavigationComponent />
    </SafeAreaView>
  );
};

export default PanduanApp;
