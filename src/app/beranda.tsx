import BottomNavigationComponent from "@/components/bottom-navigation";
import FeatureNotYetComponent from "@/components/feature-not-yet";
import HeaderComponent from "@/components/header";
import { useRouter } from "expo-router";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Sparkles,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PLANT_DATA } from "../../functions/data";

const App = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#f4fcf6]">
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <HeaderComponent navigation="Beranda" />
      <FeatureNotYetComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* GREETING SECTION */}
        <View className="px-5 pt-4 pb-2">
          <View className="flex-row items-center bg-[#e2f5e8] px-3 py-1.5 rounded-full self-start mb-3">
            <View className="w-2 h-2 rounded-full bg-[#22c55e] mr-2" />
            <Text className="text-xs font-bold text-[#166534]">
              AI Diagnostik Aktif • Akurasi 98.4%
            </Text>
          </View>
          <Text className="text-2xl font-extrabold text-[#111827] mb-1">
            Halo, Petani Cerdas! 🌱
          </Text>
          <Text className="text-sm text-gray-600 leading-5 pr-4">
            Pilih komoditas tanaman Anda untuk mulai mendeteksi gejala penyakit
            daun secara dini & tepat sasaran.
          </Text>
        </View>

        {/* BANNER INSTAN SCANNER */}
        <Pressable
          onPress={() => setModalVisible(true)}
          className="mx-5 my-4 bg-[#265e39] rounded-2xl p-5 relative overflow-hidden shadow-sm"
        >
          {/* Decorative shapes behind */}
          <View className="absolute -right-8 -bottom-10 w-40 h-40 bg-[#3a754b] rounded-full opacity-60" />

          <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full self-start mb-4">
            <Sparkles color="#ffffff" size={14} />
            <Text className="text-xs font-semibold text-white ml-2">
              Instan AI Scanner
            </Text>
          </View>

          <View className="w-2/3 z-10">
            <Text className="text-lg font-bold text-white mb-2">
              Deteksi Cepat 1-Klik
            </Text>
            <Text className="text-xs text-green-100 leading-4">
              Arahkan kamera tepat ke daun bergejala untuk hasil diagnosa
              patogen dalam 3 detik.
            </Text>
          </View>

          {/* Large Camera Button on Right */}
          <View className="absolute right-4 top-[25%] justify-center items-center z-20">
            <View className="w-16 h-16 bg-[#bbf7d0] rounded-full justify-center items-center shadow-lg">
              <Camera color="#1a472a" size={28} />
            </View>
          </View>
        </Pressable>

        {/* SECTION TITLE */}
        <View className="px-5 mt-2 mb-3">
          <Text className="text-lg font-bold text-[#111827]">
            Pilih Tanaman Anda
          </Text>
          <Text className="text-sm text-gray-500">
            Model kecerdasan buatan telah dioptimasi per spesies
          </Text>
        </View>

        {/* PLANT LIST */}
        <View className="px-5">
          {PLANT_DATA.map((item) => (
            <Pressable
              onPress={() => router.push(item.link as any)}
              key={item.id}
              className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Card Body */}
              <View className="p-4 flex-row">
                {/* Image */}
                <View className="relative">
                  <Image
                    source={item.image}
                    className="w-[84px] h-[84px] rounded-xl bg-gray-200"
                  />
                  {item.isPro && (
                    <View className="absolute top-1 left-1 bg-black/70 px-2 py-0.5 rounded text-white">
                      <Text className="text-[10px] font-bold text-white">
                        PRO
                      </Text>
                    </View>
                  )}
                </View>

                {/* Details */}
                <View className="ml-4 flex-1">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-base font-bold text-[#111827]">
                        {item.name}
                      </Text>
                      <Text className="text-xs text-gray-500 italic mb-2">
                        {item.scientific}
                      </Text>
                    </View>
                    {item.badge && (
                      <View className={`px-2 py-1 rounded-md ${item.badge.bg}`}>
                        <Text
                          className={`text-[10px] font-bold ${item.badge.textCol}`}
                        >
                          {item.badge.text}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Chips */}
                  <View className="flex-row flex-wrap mt-1">
                    {/* tampilkan chips tiga saja */}
                    {item.chips.slice(0, 3).map((chip, index) => (
                      <View
                        key={index}
                        className="bg-[#f3f4f6] px-2.5 py-1 rounded-md mr-2 mb-2"
                      >
                        <Text className="text-[10px] font-semibold text-gray-600">
                          {chip}
                        </Text>
                      </View>
                    ))}
                    <View className="bg-[#f3f4f6] px-2.5 py-1 rounded-md mr-2 mb-2">
                      <Text className="text-[10px] font-semibold text-gray-600">
                        ...
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Card Footer */}
              <View className="bg-[#f0fdf4] flex-row justify-between items-center px-4 py-3 border-t border-green-50">
                <View className="flex-row items-center">
                  {item.footerIcon && (
                    <CheckCircle2 color="#166534" size={14} />
                  )}
                  <Text className="text-xs font-semibold text-[#166534] ml-1.5">
                    {item.footerText}
                  </Text>
                </View>
                <ChevronRight color="#166534" size={16} />
              </View>
            </Pressable>
          ))}
        </View>

        {/* TIPS SECTION */}
        <View className="mx-5 mb-32 bg-[#e8f6ed] p-4 rounded-2xl flex-row items-start border border-[#d1fae5]">
          <View className="w-10 h-10 bg-[#166534] rounded-full justify-center items-center mr-3 mt-1">
            <Lightbulb color="#ffffff" size={20} />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-[#111827] mb-1">
              Tips Pindai Siang Hari
            </Text>
            <Text className="text-xs text-gray-600 leading-4">
              Gunakan bayangan tangan jika daun memantulkan cahaya matahari
              berlebih agar bercak jamur terbaca jelas oleh sensor AI.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* <View className="absolute bottom-0 w-full bg-[#f4fcf6] pt-2 pb-6 px-6 flex-row justify-between items-end shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-green-50">
        <TouchableOpacity className="items-center flex-1">
          <Home color="#166534" size={24} />
          <Text className="text-[10px] font-bold text-[#166534] mt-1">
            Beranda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center flex-1">
          <History color="#6b7280" size={24} />
          <Text className="text-[10px] font-medium text-gray-500 mt-1">
            Riwayat
          </Text>
        </TouchableOpacity>

        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            onPress={() => router.push("/chili_disease")}
            className="absolute bottom-4 w-16 h-16 bg-[#166534] rounded-full justify-center items-center shadow-lg border-4 border-[#f4fcf6]"
          >
            <Camera color="#ffffff" size={28} />
          </TouchableOpacity>
          <Text className="text-[10px] font-medium text-gray-500 mt-7">
            Pindai
          </Text>
        </View>

        <TouchableOpacity
          className="items-center flex-1"
          onPress={() => router.push("/panduan")}
        >
          <BookOpen color="#6b7280" size={24} />
          <Text className="text-[10px] font-medium text-gray-500 mt-1">
            Panduan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center flex-1">
          <User color="#6b7280" size={24} />
          <Text className="text-[10px] font-medium text-gray-500 mt-1">
            Profil
          </Text>
        </TouchableOpacity>
      </View> */}
      <BottomNavigationComponent />
    </SafeAreaView>
  );
};

export default App;
