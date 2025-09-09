import { NAV_THEME } from '@/lib/theme';
import { useUser } from '@/services/authentication';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NavBar from '../navbar/nav-bar';

const SafeScreen = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const { isPending } = useUser();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: NAV_THEME[colorScheme ?? 'light'].colors.background,
        flex: 1,
      }}>
      {!isPending ? (
        <>
          <NavBar />
          {children}
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SafeScreen;
