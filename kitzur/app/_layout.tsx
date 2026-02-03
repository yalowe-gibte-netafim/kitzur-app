import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { I18nManager } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppProvider } from '@/contexts/AppContext';

// Enable RTL for Hebrew support
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#8B7BB8',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="chapter/[id]" 
            options={{ 
              headerShown: false,
              title: 'פרק',
            }} 
          />
          <Stack.Screen 
            name="section/[id]" 
            options={{ 
              headerShown: false,
              title: 'סעיף',
            }} 
          />
          <Stack.Screen 
            name="modal" 
            options={{ 
              presentation: 'modal', 
              title: 'הגדרות',
              headerStyle: {
                backgroundColor: '#8B7BB8',
              },
              headerTintColor: '#FFFFFF',
            }} 
          />
        </Stack>
        <StatusBar style="light" />
      </ThemeProvider>
    </AppProvider>
  );
}
