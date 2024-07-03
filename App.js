import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import LoginScreen from './app/screen/LoginScreen/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './app/navigations/TabNavigations';
import { UserLocationContext } from './app/context/UserLocationContext';
import * as Location from "expo-location";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    "Outfit-Black": require("./assets/fonts/Outfit/static/Outfit-Black.ttf"),
    "Outfit-Bold": require("./assets/fonts/Outfit/static/Outfit-Bold.ttf"),
    "Outfit-ExtraBold": require("./assets/fonts/Outfit/static/Outfit-ExtraBold.ttf"),
    "Outfit-ExtraLight": require("./assets/fonts/Outfit/static/Outfit-ExtraLight.ttf"),
    "Outfit-Light": require("./assets/fonts/Outfit/static/Outfit-Light.ttf"),
    "Outfit-Medium": require("./assets/fonts/Outfit/static/Outfit-Medium.ttf"),
    "Outfit-Regular": require("./assets/fonts/Outfit/static/Outfit-Regular.ttf"),
    "Outfit-SemiBold": require("./assets/fonts/Outfit/static/Outfit-SemiBold.ttf"),
    "Outfit-Thin": require("./assets/fonts/Outfit/static/Outfit-Thin.ttf"),
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
  }

  return (
    <ClerkProvider tokenCache={tokenCache}  publishableKey={publishableKey}>
      <UserLocationContext.Provider value={{location, setLocation}}>
        <View className="mt-10 h-full">
          <SignedIn>
            <NavigationContainer>
              <TabNavigations />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
          <StatusBar style="auto" />
        </View>
      </UserLocationContext.Provider>
    </ClerkProvider>
  );
}
