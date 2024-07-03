import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const onMessage = () => {
    Linking.openURL(
      `mailto:${user.primaryEmailAddress.emailAddress}?subject=Contacto&body=`
    );
  };

  const onSignOut = () => {
    signOut();
  };

  const profileMenu = [
    {
      id: 1,
      name: "Inicio",
      icon: "home",
      onPress: () => navigation.navigate("Home"),
    },
    {
      id: 2,
      name: "Mis Favoritos",
      icon: "calendar",
      onPress: () => navigation.navigate("Favorites"),
    },
    {
      id: 3,
      name: "Cerrar sesión",
      icon: "log-out",
      onPress: onSignOut,
    },
  ];
  return (
    <View className="h-full">
      <View className="bg-primary flex justify-center items-center gap-2 p-4">
        <Text className="font-outfitExtraBold text-xl capitalize text-white">
          Mi perfil
        </Text>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100 }}
          className="rounded-full"
        />
        <Text className="font-outfitExtraBold text-xl capitalize text-white">
          {user.fullName}
        </Text>
        <Text className="text-white">
          {user.primaryEmailAddress.emailAddress}
        </Text>
      </View>
      <View>
        <FlatList
          data={profileMenu}
          className="m-5"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row items-center gap-2 p-2"
              onPress={item.onPress}
            >
              <Entypo name={item.icon} size={24} color="#0bc224" />
              <Text className="font-outfitRegular text-lg">{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
