import { Leaf } from "lucide-react-native";
import { Text, View } from "react-native";
const TitleCardComponent = ({ latin, title, accuracy }: any) => {
  return (
    <View className="bg-white mx-5 mt-2 p-4 rounded-2xl shadow-sm border border-gray-100 flex-row items-center">
      <View className="w-12 h-12 bg-[#d1fae5] rounded-xl justify-center items-center mr-4">
        <Leaf color="#166534" size={24} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center mb-1">
          <Text className="text-[11px] font-bold text-[#166534] italic mr-2">
            {latin}
          </Text>
          <View className="w-1 h-1 rounded-full bg-gray-300 mr-2" />
          <View className="bg-[#dcfce7] px-2 py-0.5 rounded-full">
            <Text className="text-[10px] font-bold text-[#166534]">
              {`Akurasi ${accuracy}%`}
            </Text>
          </View>
        </View>
        <Text className="text-[19px] font-bold text-[#111827]">{title}</Text>
      </View>
    </View>
  );
};

export default TitleCardComponent;
