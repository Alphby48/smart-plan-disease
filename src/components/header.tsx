import { router } from "expo-router";
import { Bell, User } from "lucide-react-native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FeatureNotYetComponent from "./feature-not-yet";
const HeaderComponent = ({ navigation }: { navigation: string }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="flex-row justify-between items-center px-5 py-4 bg-white/50">
      <FeatureNotYetComponent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            source={require("@/assets/images/logo.png")}
            className="w-10 h-10 mr-3"
            resizeMode="contain"
            alt="logo"
          />
        </TouchableOpacity>
        <View>
          <Text className="text-base font-bold text-[#111827]">
            Smart Plant Disease
          </Text>
          <Text className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {navigation}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-5">
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Bell color="#374151" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="w-9 h-9 bg-[#1a472a] rounded-full justify-center items-center"
        >
          <User color="#ffffff" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderComponent;
