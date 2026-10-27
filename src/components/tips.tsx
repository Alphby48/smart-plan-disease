import { Lightbulb } from "lucide-react-native";
import { Text, View } from "react-native";
const TipsComponent = () => {
  return (
    <View className="mx-5 bg-[#e2f5e8] py-3 px-4 rounded-xl flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Lightbulb color="#166534" size={16} className="mr-1" />
        <Text className="text-xs font-bold text-[#166534]">
          Tips{"\n"}Foto:
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="w-1 h-1 rounded-full bg-[#166534] mr-1.5" />
        <Text className="text-xs font-bold text-gray-600">
          Fokus 1{"\n"}Daun
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="w-1 h-1 rounded-full bg-[#166534] mr-1.5" />
        <Text className="text-xs font-bold text-gray-600">
          Cahaya{"\n"}Cukup
        </Text>
      </View>

      <View className="flex-row items-center">
        <View className="w-1 h-1 rounded-full bg-[#166534] mr-1.5" />
        <Text className="text-xs font-bold text-gray-600">
          Tidak{"\n"}Goyang
        </Text>
      </View>
    </View>
  );
};

export default TipsComponent;
