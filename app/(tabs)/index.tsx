import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";


export default function Index() {

  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  })
  )

  const testData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  console.log(`movies: ${movies}`)

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
        {
          moviesLoading ? <ActivityIndicator size='large' color='#3DA7DC' className="mt-10 self-center" />
            : moviesError ? <Text className="text-lg text-white font-bold mt-5 mb-3">Error: {moviesError?.message}</Text> :
              <View className="flex-1 mt-5">
                <SearchBar placeholder="Search for a movie" onPress={() => { router.push('/search') }} />
                <>
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                  <FlatList
                    ListEmptyComponent={<Text className="text-sm text-white">No Data</Text>}
                    data={movies?.results ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      flex: 1,
                      //justifyContent: 'flex-start',
                      gap: 10,
                      paddingRight: 5,
                      marginBottom: 10
                    }}
                    className="mt-2 pb-32"
                    scrollEnabled={false}
                    renderItem={
                      ({ item }) => {
                        return (
                          <MovieCard {...item} />
                        )
                      }
                    }
                  />
                </>
              </View>
        }
      </ScrollView >

    </View >
  );
}
