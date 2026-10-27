import { Wrench } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
const FeatureNotYetComponent = ({ modalVisible, setModalVisible }: any) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-6">
        <View className="bg-white rounded-[24px] p-6 w-full max-w-sm items-center shadow-xl">
          {/* Ikon Modal */}
          <View className="w-16 h-16 bg-[#fffbeb] rounded-full justify-center items-center mb-4">
            <Wrench color="#d97706" size={32} />
          </View>

          {/* Teks Peringatan */}
          <Text className="text-xl font-bold text-[#111827] text-center mb-2">
            Fitur Belum Tersedia
          </Text>
          <Text className="text-sm text-gray-500 text-center mb-6 leading-5 px-2">
            Maaf Fitur Ini Belum Tersedia. Masih dalam Tahap Pengembangan.
          </Text>

          {/* Tombol Aksi */}
          <TouchableOpacity
            className="w-full bg-[#166534] py-3.5 rounded-full items-center shadow-sm"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white font-bold text-base">
              Saya Mengerti
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeatureNotYetComponent;
