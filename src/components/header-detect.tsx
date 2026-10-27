import { router } from "expo-router";
import { ArrowLeft, User } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FeatureNotYetComponent from "./feature-not-yet";
const HeaderDetectComponent = ({ text }: { text: string }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-row justify-between items-center px-5 py-4">
      <FeatureNotYetComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <TouchableOpacity onPress={() => router.back()}>
        <ArrowLeft color="#111827" size={24} />
      </TouchableOpacity>

      <View className="flex-row items-center">
        <Image
          source={require("@/assets/images/logo.png")}
          className="w-6 h-6 mr-2"
          resizeMode="contain"
        />
        <Text className="text-base font-bold text-[#111827]">{text}</Text>
      </View>

      <TouchableOpacity
        className="w-9 h-9 bg-[#1a472a] rounded-full justify-center items-center"
        onPress={() => setModalVisible(true)}
      >
        <User color="#ffffff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDetectComponent;
