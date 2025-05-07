import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingMovieCard from "@/components/TrendingMovieCard";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";


export default function Index() {

  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  })
  )

  return (
    <View
      className="flex-1 bg-background"
    >
      <ScrollView
        className='flex-1 px-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
      >
        <View className="h-10 w-10 rounded-full bg-slate-500 mt-20 mb-5 mx-auto" />
        {
          moviesLoading || trendingLoading ? <ActivityIndicator size='large' color='#3DA7DC' className="mt-10 self-center" />
            : moviesError || trendingError ? <Text className="text-lg text-white font-bold mt-5 mb-3">Error: {moviesError?.message || trendingError?.message}</Text> :
              <View className="flex-1 mt-5">
                <SearchBar placeholder="Search for a movie" onPress={() => { router.push('/search') }} />
                <View className="w-full">
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Popular Movies</Text>
                  <FlatList
                    ListEmptyComponent={<Text className="text-sm text-gray-500 text-center">No Data</Text>}
                    data={trendingMovies ?? []}
                    keyExtractor={(item) => item.movie_id.toString()}
                    horizontal
                    className="my-4 mt-3"
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4"></View>}
                    renderItem={
                      ({ item, index }) => {
                        return (
                          <TrendingMovieCard movie={item} index={index} />
                        )
                      }
                    }
                  />
                  <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
                  <FlatList
                    ListEmptyComponent={<Text className="text-sm text-gray-500 text-center">No Data</Text>}
                    data={movies?.results ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      gap: 10,
                      paddingRight: 5,
                      marginBottom: 10
                    }}
                    className="mt-2 pb-32 md:flex md:items-center"
                    scrollEnabled={false}
                    renderItem={
                      ({ item }) => {
                        return (
                          <MovieCard {...item} />
                        )
                      }
                    }
                  />
                </View>
              </View>
        }
      </ScrollView >

    </View >
  );
}
