import { useUser } from '@/services/authentication';
import { Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabsLayout = () => {
  const { isLoading } = useUser();

  return (
    <React.Fragment>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <Tabs
          screenOptions={{
            headerShown: false,
            // tabBarActiveTintColor: COLORS.primary,
            // tabBarInactiveTintColor: COLORS.textLight,
            tabBarStyle: {
              // backgroundColor: COLORS.white,
              // borderTopColor: COLORS.border,
              borderWidth: 1,
              paddingBottom: 7,
              paddingTop: 7,
              height: 70,
            },
          }}>
          <Tabs.Screen
            options={{
              title: 'Explore',
              tabBarIcon: ({ focused, size, color }) => (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              ),
            }}
            name="home"
          />
        </Tabs>
      )}
    </React.Fragment>
  );
};

export default TabsLayout;
