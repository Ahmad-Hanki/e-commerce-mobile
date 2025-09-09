import SafeScreen from '@/components/ui/safe-screen';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { AppProvider } from '@/providers/app-provider';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <AppProvider>
      <SafeScreen>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Slot />
          <PortalHost />
        </ThemeProvider>
      </SafeScreen>
    </AppProvider>
  );
}
