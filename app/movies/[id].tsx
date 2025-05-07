import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

type MovieInfoProps = { label: string, content: string | number | null }

const MovieInfo = ({ label, content }: MovieInfoProps) => (
  <View className='flex-1 gap-2 mt-4'>
    <Text className='text-gray-500 w-full' numberOfLines={1}>{label ?? 'No Title Available'}</Text>
    <Text className='text-light-200 font-semibold w-full text-justify'>{content ?? 'No Data Available'}</Text>
  </View>
)

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))

  return (
    <View className='flex-1 bg-background'>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80
        }}
      >{
          loading ?? (<ActivityIndicator size='large' color='#3DA7DC' className="mt-10 self-center" />)
        }
        <Image
          source={{ uri: movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png' }}
          className='w-full h-[500px]'
          resizeMode='stretch'
        />
        <View className='flex-1 gap-2 px-4 mt-4'>
          <Text className='text-light-300 font-bold text-xl'>{movie?.title}</Text>
          <Text className='text-gray-500 text-lg'>{movie?.release_date?.split('-')[0]} - {movie?.runtime}m</Text>
          <View className='flex flex-row px-4 py-2 rounded-2xl bg-slate-800 w-52'>
            <Text className='text-gray-500'>Rating: </Text>
            <Text className='text-light-300 font-semibold'>{Math.round(movie?.vote_average ?? 0)}</Text>
            <Text className='text-gray-500'>/10 ({movie?.vote_count ?? 0} votes)</Text>
          </View>
          <MovieInfo label='Overview' content={movie?.overview ?? null} />
          <MovieInfo label='Genres' content={movie?.genres.map(genre => genre.name).join(' - ') ?? null} />

        </View>

      </ScrollView>
      <TouchableOpacity onPress={router.back}
        className='absolute bottom-9 left-0 right-0 mx-5 bg-light-100 rounded-xl py-3.5 flex flex-row items-center justify-center z-50'>
        <Image source={icons.arrow} className='size-5 mr-1 mt-0.5 rotate-180' />
        <Text className='text-gray-800 font-semibold text-base'>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default MovieDetails