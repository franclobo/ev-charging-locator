import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import PlaceItem from './PlaceItem'
import { SelectMarkerContext } from '../../context/SelectMarkerContext'
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import { app } from "../../utils/FirebaseConfig";
import { useUser } from '@clerk/clerk-react';

export default function PlaceListView({placeList}) {
  const flatListRef = React.useRef(null)
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);
  const { user } = useUser();
  const [favoriteList, setFavoriteList] = useState([]);

useEffect(() => {
  selectedMarker && scrollToIndex(selectedMarker)
}, [selectedMarker]);

  const scrollToIndex = (index) => {
    flatListRef.current?.scrollToIndex({animated:true, index})
  }

  const getItemLayout = (_, index) => ({
    length: Dimensions.get("window").width,
    offset: Dimensions.get("window").width * index,
    index
  })

  // Get data from Firestore

  const db = getFirestore(app);
  useEffect(() => {
    user && getFavorites();
  }, [user]);

  const getFavorites = async () => {
    setFavoriteList([])
    const q = query(collection(db, "favorites"), where("email", "==", user?.primaryEmailAddress.emailAddress));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavoriteList(favoriteList => [...favoriteList, doc.data()]);
    });
  };

  const isFavorite = (place) => {
    const result = favoriteList.find((item) => item.place.id === place.id);
    console.log(result);
    return result ? true : false;
  }


  return (
    <View>
      <FlatList
        data={placeList}
        horizontal
        pagingEnabled
        ref={flatListRef}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View key={index}>
            <PlaceItem place={item}
              isFavorite={isFavorite(item)}
              markedFavorite={() => getFavorites()}
            />
          </View>
        )}
      />
    </View>
  )
}
