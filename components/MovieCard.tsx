import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'


const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <View>
      <Link href={`/movies/${id.toString()}`} asChild>
        <TouchableOpacity className='w-32 m-1 overflow-hidden'>
          <Image source={{
            uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
          }} className='w-full min-w-32 h-48 rounded-lg'
            resizeMode="contain"
          />
          <Text className='text-sm text-white font-medium' numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <View className=''>
            <Text className='text-white text-xs'>Rating: {Math.round(vote_average) / 2}</Text>
            <View className='flex flex-row justify-between items-center w-full mt-2'>
              <Text className='text-white text-xs opacity-50'>{release_date?.split('-')[0]}</Text>
              <Text className='text-white text-xs opacity-50'>Movie</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>

    </View>
  )
}

export default MovieCard