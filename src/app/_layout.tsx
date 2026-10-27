import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* <AnimatedSplashOverlay /> */}

      {/* Stack Navigator Bawaan Expo Router */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="beranda" />
        <Stack.Screen name="panduan" />
        <Stack.Screen name="chili_disease" />
        <Stack.Screen name="detects/tomato_detect" />
        <Stack.Screen name="detects/chili_detect" />
      </Stack>
    </ThemeProvider>
  );
}
