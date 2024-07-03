import { View, Text, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from "@clerk/clerk-react";
import PlaceItem from '../HomeScreen/PlaceItem';


export default function FavoriteScreen() {
  const { user } = useUser();
  const db = getFirestore(app);
  const [favoriteList, setFavoriteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavorites = async () => {
    setLoading(true);
    setFavoriteList([]);
    const q = query(
      collection(db, "favorites"),
      where("email", "==", user?.primaryEmailAddress.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavoriteList((favoriteList) => [...favoriteList, doc.data()]);
      setLoading(false);
    });
  };

  useEffect(() => {
    user && getFavorites();
  }, [user]);

  return (
    <View className='flex-1'>
      <Text className="font-outfitBold text-2xl text-center mt-5">
        Mis lugares {" "}
        <Text className="font-outfitBold text-2xl text-center mt-5 text-primary">
          Favoritos
        </Text>
      </Text>

      {!favoriteList ? (
        <View className="h-full flex items-center justify-center">
          <ActivityIndicator size="large" color="#0bc224" />
          <Text className="font-outfitRegular mt-5">Cargando...</Text>
        </View>
      ) : null}
      <FlatList
        data={favoriteList}
        onRefresh={() => getFavorites()}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <PlaceItem place={item.place} isFavorite={true} />
        )}
      />
    </View>
  );
}
