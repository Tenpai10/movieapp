import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Index() {

  const router = useRouter();

  return (
    <View
      className="flex-1 bg-background"
    >
      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <View className="h-10 w-10 rounded-full bg-slate-500 mt-20 mb-5 mx-auto"></View>
        <View className="flex-1 mt-5">
          <SearchBar placeholder="Search for nigga" onPress={() => { router.push('/search') }}
          />

        </View>
      </ScrollView>

    </View>
  );
}
