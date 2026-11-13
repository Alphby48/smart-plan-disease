import { router, usePathname } from "expo-router";
import { BookOpen, Camera, History, Home, User } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FeatureNotYetComponent from "./feature-not-yet";

const BottomNavigationComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();

  const isBeranda = pathname === "/beranda" || pathname === "/";
  const isPanduan = pathname === "/panduan";
  const isPindai = pathname === "/pindai_cepat";

  return (
    <>
      {/* MODAL BOX PERINGATAN */}
      <FeatureNotYetComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      {/* BOTTOM NAVIGATION */}
      <View className="absolute bottom-0 w-full bg-[#f4fcf6] pt-2 pb-6 px-6 flex-row justify-between items-end shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-green-50">
        <TouchableOpacity
          className="items-center flex-1"
          onPress={() => router.push("/beranda")}
        >
          <Home color={isBeranda ? "#166534" : "#6b7280"} size={24} />
          <Text
            className={`text-[10px] mt-1 ${
              isBeranda ? "font-bold text-[#166534]" : "font-medium text-gray-500"
            }`}
          >
            Beranda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center flex-1"
          onPress={() => setModalVisible(true)} // Memicu Modal
        >
          <History color="#6b7280" size={24} />
          <Text className="text-[10px] font-medium text-gray-500 mt-1">
            Riwayat
          </Text>
        </TouchableOpacity>

        {/* FLOATING ACTION BUTTON - PINDAI CEPAT */}
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            onPress={() => router.push("/pindai_cepat" as any)}
            activeOpacity={0.85}
            className={`absolute bottom-3 w-16 h-16 rounded-full justify-center items-center shadow-xl border-4 ${
              isPindai
                ? "bg-[#15803d] border-[#bbf7d0]"
                : "bg-[#166534] border-[#f4fcf6]"
            }`}
            style={{
              elevation: 8,
              shadowColor: "#166534",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.35,
              shadowRadius: 8,
            }}
          >
            <Camera color="#ffffff" size={28} strokeWidth={2.4} />
          </TouchableOpacity>
          <Text
            className={`text-[10px] mt-8 ${
              isPindai
                ? "font-extrabold text-[#166534]"
                : "font-semibold text-gray-600"
            }`}
          >
            Pindai Cepat
          </Text>
        </View>

        <TouchableOpacity
          className="items-center flex-1"
          onPress={() => router.push("/panduan")}
        >
          <BookOpen color={isPanduan ? "#166534" : "#6b7280"} size={24} />
          <Text
            className={`text-[10px] mt-1 ${
              isPanduan ? "font-bold text-[#166534]" : "font-medium text-gray-500"
            }`}
          >
            Panduan
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center flex-1"
          onPress={() => setModalVisible(true)} // Memicu Modal
        >
          <User color="#6b7280" size={24} />
          <Text className="text-[10px] font-medium text-gray-500 mt-1">
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default BottomNavigationComponent;
