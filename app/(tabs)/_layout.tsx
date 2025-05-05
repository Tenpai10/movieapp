import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TabIcon = ({ focused, icon, title }: { focused: boolean, icon: any, title: string }) => {
  return focused ? (
    <View className="bg-dark-300 gap-2 flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden">
      <Image source={icon} tintColor="#151312" className="size-5" />
      <Text className='text-fontcolor-lightmode text-base font-semibold'>{title}</Text>
    </View>
  ) : (<View className='mt-4 size-10 justify-center items-center'>
    <Image source={icon} tintColor="#A8B5DB" className='size-5'></Image>
  </View>)
}

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#111C22',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#111C22'
        }
      }}
    >
      <Tabs.Screen name='index' options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.home}
            title="Home" />
        )
      }} />
      <Tabs.Screen name='search' options={{
        title: 'Search',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.search}
            title="Search" />
        )
      }} />
      <Tabs.Screen name='saved' options={{
        title: 'Saved',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.save}
            title="Saved" />
        )
      }} />

      <Tabs.Screen name='profile' options={{
        title: 'Profile',
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.person}
            title="Profile" />
        )
      }} />
    </Tabs>
  )
}

export default _Layout