import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingMovieCard = ({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`}>
      <View className='w-36'>
        <View className=''>
          <TouchableOpacity className='w-32 relative'>
            <Image source={{ uri: poster_url ?? 'https://placehold.co/600x400/1a1a1a/ffffff.png' }} className='relative w-full min-w-24 h-40 rounded-lg' resizeMode='cover' />
            <View className='absolute bottom-9 right-24'>
              <Text className='font-bold text-6xl text-white'>{index + 1}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text className='text-sm text-light-300 font-bold' numberOfLines={2}>{title}</Text>
      </View>

    </Link>
  )
}

export default TrendingMovieCard