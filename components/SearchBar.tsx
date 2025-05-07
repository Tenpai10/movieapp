import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

type SearchProps = {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: SearchProps) => {

  return (
    <View className='flex-row items-center gap-2 bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode='contain' tintColor="#68BAE4"></Image>
      <TextInput
        onPress={onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#68BAE4"
        value={value}
        className='flex-1 text-light-300'
      >
      </TextInput>
    </View>
  )
}

export default SearchBar