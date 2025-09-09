import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Text } from '../ui/text';
import { useUser } from '@/services/authentication';
import { Link } from 'expo-router';

const NavBar = () => {
  const { data } = useUser();
  return (
    <View className="flex-row items-center justify-between gap-4 p-4">
      <Link href="/(tabs)/home">
        <Image
          source={require('@/assets/images/icon.png')}
          className="h-10 w-10 rounded-full"
          resizeMode="contain"
        />
      </Link>

      <View className="flex-row items-center">
        <Avatar className="h-10 w-10" alt="Zach Nugent's Avatar">
          <AvatarImage source={{ uri: data?.user?.avatar ?? undefined }} />
          <AvatarFallback className="h-10 w-10">
            <Text className="capitalize">{data?.user.name[0]}</Text>
          </AvatarFallback>
        </Avatar>
      </View>
    </View>
  );
};

export default NavBar;
