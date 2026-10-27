import { useRouter } from "expo-router";
import {
  Activity,
  ArrowRight,
  Camera,
  CheckCircle,
  CpuAi,
  Leaf,
  PlantPot,
} from "lucide-react-native";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#e6f5eb]">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-2.5">
        <View className="flex-row items-center bg-white px-3 py-1.5 rounded-full">
          <View className="w-2 h-2 rounded-full bg-[#4ade80] mr-2" />
          <Text className="text-xs font-semibold text-[#4b5563]">
            VISION ENGINE V4.0
          </Text>
        </View>
        <View className="flex-row gap-3">
          <Activity color="#1a472a" size={20} />
          <Leaf color="#1a472a" size={20} />
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 items-center justify-center px-5">
        {/* Logo Section */}
        <View className="relative mb-10 items-center justify-center">
          <View
            className="w-[120px] h-[120px] rounded-full bg-white items-center justify-center shadow-lg shadow-[#4ade80]/50"
            style={{ elevation: 10 }}
          >
            <Image
              source={require("@/assets/images/logo.png")} // Replace with actual path
              className="w-[130px] h-[130px]"
              resizeMode="contain"
            />
          </View>
          <View className="absolute -bottom-2.5 -right-5 w-[30px] h-[30px] rounded-full bg-[#1a472a] justify-center items-center">
            <CpuAi color="#ffffff" size={16} />
          </View>
        </View>

        {/* Title Section */}
        <View className="flex-row items-center bg-[#d1fae5] px-4 py-2 rounded-full mb-4">
          <Activity color="#1a472a" size={16} />
          <Text className="text-[#064e3b] font-semibold text-sm ml-2">
            AI-Powered Botanical Diagnostic
          </Text>
        </View>

        <Text className="text-[32px] font-bold text-[#111827] mb-3">
          Smart Plant Disease
        </Text>
        <Text className="text-base text-[#4b5563] text-center leading-6 mb-10">
          Plant disease detection application &{"\n"}foliar health telemetry
        </Text>

        {/* Stats Row */}
        <View className="flex-row justify-between w-full px-2.5">
          <View
            className="bg-white py-4 px-3 rounded-2xl items-center w-[30%] shadow-sm"
            style={{ elevation: 2 }}
          >
            <Activity color="#1a472a" size={24} />
            <Text className="text-sm font-bold text-[#111827] mt-2 mb-1">
              &lt; 0.4s
            </Text>
            <Text className="text-xs text-[#6b7280]">Diagnosa</Text>
          </View>
          <View
            className="bg-white py-4 px-3 rounded-2xl items-center w-[30%] shadow-sm"
            style={{ elevation: 2 }}
          >
            <CheckCircle color="#1a472a" size={24} />
            <Text className="text-sm font-bold text-[#111827] mt-2 mb-1">
              98.7%
            </Text>
            <Text className="text-xs text-[#6b7280]">Akurasi</Text>
          </View>
          <View
            className="bg-white py-4 px-3 rounded-2xl items-center w-[30%] shadow-sm"
            style={{ elevation: 2 }}
          >
            <PlantPot color="#1a472a" size={24} />
            <Text className="text-sm font-bold text-[#111827] mt-2 mb-1">
              300+
            </Text>
            <Text className="text-xs text-[#6b7280]">Spesies</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View className="px-5 pb-10">
        <TouchableOpacity
          className="bg-[#1a472a] flex-row items-center justify-center py-[18px] rounded-full mb-6"
          onPress={() => router.push("/beranda")}
        >
          <Camera color="white" size={20} />
          <Text className="text-white text-base font-bold mx-2.5">
            Mulai Deteksi Sekarang
          </Text>
          <ArrowRight color="white" size={20} />
        </TouchableOpacity>

        <Text className="text-center text-xs text-[#9ca3af] mb-4">
          AgriTech ML v2.8 • Offline Edge Mode Didukung
        </Text>
        <Text className="text-center text-xs text-[#1a1b1c]">
          Created By Aditya Ahfazh Firmansyah
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
