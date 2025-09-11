import SafeScreen from '@/components/ui/safe-screen';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { AppProvider } from '@/providers/app-provider';
import { AuthProvider, useAuth } from '@/providers/auth-provider';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

export { ErrorBoundary } from 'expo-router';

function AuthGate() {
  const { user, authChecked } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authChecked) return; // wait for auth to resolve
    if (user) router.replace('/(tabs)/home');
    else router.replace('/(auth)/sign-in');
  }, [user, authChecked]);

  if (!authChecked) return <ActivityIndicator size="large" />;

  return <Slot />;
}

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AppProvider>
      <AuthProvider>
        <SafeScreen>
          <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <AuthGate />
            <PortalHost />
          </ThemeProvider>
        </SafeScreen>
      </AuthProvider>
    </AppProvider>
  );
}
