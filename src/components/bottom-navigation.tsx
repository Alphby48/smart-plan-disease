import { router } from "expo-router";
import { BookOpen, Camera, History, Home, User } from "lucide-react-native";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FeatureNotYetComponent from "./feature-not-yet";

const BottomNavigationComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
          <Home color="#166534" size={24} />
          <Text className="text-[10px] font-bold text-[#166534] mt-1">
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

        {/* FLOATING ACTION BUTTON */}
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
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
