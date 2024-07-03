import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/homescreen", {
          scheme: "ev-charging-station-app",
        }),
      });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
        await signIn();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View className="flex items-center justify-center">
      <Image
        source={require("./../../../assets/images/logo.png")}
        className="w-20 h-20"
      />
      <Image
        source={require("./../../../assets/images/ev-charger.png")}
        className="w-full h-100 object-cover"
      />
      <View className='p-2'>
        <Text className='font-outfitBold text-center text-lg'>
          Tu aplicación definitiva para estaciones de carga de vehículos
          eléctricos.
        </Text>
        <Text className='font-outfitRegular text-center text-xs'>Encuentra la estación más cercana, planifica tu ruta y mucho más en un solo click.</Text>
        <TouchableOpacity className='bg-primary rounded-full py-2 mt-10' onPress={onPress}>
          <Text className='text-white font-outfitRegular text-center text-lg'>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen
