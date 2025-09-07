import SafeScreen from '@/components/ui/safe-screen';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { AppProvider } from '@/providers/app-provider';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Redirect, Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { auth } from '@/config/firebaseConfig';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const user = auth.currentUser;

  if (!user) {
    <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <AppProvider>
      <SafeScreen>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Slot screenOptions={{ headerShown: false }} />
          <PortalHost />
        </ThemeProvider>
      </SafeScreen>
    </AppProvider>
  );
}
