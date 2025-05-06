import MovieCard from '@/components/MovieCard';
import SearchBar from '@/components/SearchBar';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading: loading,
    error: error,
    refetch: loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQuery
  }), false
  )



  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery) {
        await loadMovies();
      } else {
        reset()
      }
    })

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (



    <View className='flex-1 bg-background'>
      <View className="h-10 w-10 rounded-full bg-slate-500 mt-20 mb-5 mx-auto" />
      <FlatList
        ListEmptyComponent={<Text className="text-sm text-white">Start typing to search for a movie</Text>}
        data={movies?.results ?? []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          flex: 1,
          gap: 10,
          paddingRight: 5,
          marginBottom: 10
        }}
        className="mt-2 pb-32 mx-2"
        scrollEnabled={false}
        renderItem={
          ({ item }) => {
            return (
              <MovieCard {...item} />
            )
          }
        }
        ListHeaderComponent={
          <View className=''>
            <SearchBar placeholder="Search for a movie" value={searchQuery} onChangeText={(text: string) => setSearchQuery(text)} />
            {loading && (<ActivityIndicator size='large' color='#3DA7DC' className="mt-10 self-center" />)}
            {error && (
              <Text className='text-red-500 px-5 my-4'>Error: {error.message}</Text>
            )}
            {!loading && !error && searchQuery?.trim() && movies?.results.length > 0 && (
              <Text className='text-white text-lg my-4'>Search results for:
                <Text className='font-bold text-primary'> {searchQuery}</Text>
              </Text>
            )}


          </View>
        }
      />
    </View>
  )
}

export default Search