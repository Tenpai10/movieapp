import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface SearchProps {
  placeholder: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: SearchProps) => {
  return (
    <View className='flex-row items-center gap-2 bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#68BAE4"></Image>
      <TextInput
        onPress={onPress}
        onChangeText={() => { }}
        placeholder={placeholder}
        placeholderTextColor="#68BAE4"
        value=""
        className='flex-1 text-light-300'
      >
      </TextInput>
    </View>
  )
}

export default SearchBar