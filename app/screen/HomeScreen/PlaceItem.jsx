import { View, Text, Dimensions, Image, Pressable, ToastAndroid, Platform, Linking } from 'react-native'
import React, { useState } from 'react'
import GlobalAPI from '../../utils/GlobalAPI';
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { getFirestore, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { app } from '../../utils/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function PlaceItem({ place, isFavorite, markedFavorite }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  const onSetFavorite = async(place) => {
    await setDoc(doc(db, "favorites", (place.id).toString()),
      {
        place: place,
        email: user?.primaryEmailAddress.emailAddress
      }
    );
    markedFavorite();
    ToastAndroid.show("Agregado a favoritos", ToastAndroid.TOP);
  }

  const onRemoveFavorite = async(placeId) => {
    await deleteDoc(doc(db, "favorites", (placeId).toString()));
    ToastAndroid.show("Eliminado de favoritos", ToastAndroid.TOP);
    markedFavorite();
  };

  const onDirectionClick = () => {
    const url = Platform.select({
      ios:
        "maps:" +
        place?.location.latitude +
        "," +
        place?.location.longitude +
        "?q=" +
        place?.formattedAddress,
      android:
        "geo:" +
        place?.location.latitude +
        "," +
        place?.location.longitude +
        "?q=" +
        place?.formattedAddress,
    });
    Linking.openURL(url);
  }
  return (
    <View
      style={{
        width: Dimensions.get("window").width * 0.9,
      }}
      className="bg-white p-5 rounded-lg m-5"
    >
      <LinearGradient colors={["transparent", "#fff"]}>
        {!isFavorite
        ? <Pressable
          className="absolute z-10 right-0 m-2"
          onPress={() => onSetFavorite(place)}
        >
          <AntDesign name="hearto" size={30} color="white" />
        </Pressable>
        :<Pressable
          className="absolute z-10 right-0 m-2"
          onPress={() => onRemoveFavorite(place.id)}
        >
          <AntDesign name="heart" size={30} color="#0bc224" />
        </Pressable>}
        <Image
          source={
            place?.photos && place.photos.length > 0
              ? {
                  uri:
                    PLACE_PHOTO_BASE_URL +
                    place?.photos[0]?.name +
                    "/media?key=" +
                    GlobalAPI.API_KEY +
                    "&maxHeightPx=800&maxWidthPx=1200",
                }
              : require("../../../assets/images/ev-charger.png")
          }
          style={{ width: "100%", height: 150, borderRadius: 10, zIndex: -1 }}
        />
        <View>
          <Text className="font-outfitMedium text-lg">
            {place.displayName?.text}
          </Text>
          <Text className="font-outfitRegular text-sm text-gray">
            {place?.shortFormattedAddress}
          </Text>
          <View className="relative flex flex-row gap-1">
            <Text className="font-outfitRegular text-gray">Connectores:</Text>
            <Text className="font-outfitMedium  ">
              {place?.evChargeOptions?.connectorCount
                ? place.evChargeOptions.connectorCount
                : "No disponible"}
            </Text>
            <Pressable className="absolute right-0 bg-primary p-1 px-2 rounded-lg" onPress={()=>onDirectionClick()}>
              <FontAwesome name="location-arrow" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
