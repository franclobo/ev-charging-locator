import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Fontisto } from "@expo/vector-icons";

export default function Header() {
  const {user} = useUser();
  return (
    <View className="flex flex-row justify-between items-center">
      <Image
        source={{ uri: user?.imageUrl }}
        className="w-10 h-10 rounded-full"
      />
      <Image
        source={require("../../../assets/images/logo.png")}
        className="w-20 h-20"
      />
      <Fontisto name="filter" size={24} color="black" />
    </View>
  );
}
