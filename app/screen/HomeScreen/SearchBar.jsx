import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Entypo } from "@expo/vector-icons";


export default function SearchBar({searchedLocation}) {
  return (
    <View className="flex flex-row mt-15 px-5 bg-white rounded-lg">
      <Entypo name="location-pin" size={24} color="grey" style={{paddingTop: 10}} />
      <GooglePlacesAutocomplete
        placeholder="Buscar estaciones de carga"
        enablePoweredByContainer={false}
        fetchDetails={true}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          searchedLocation(details?.geometry?.location);
        }}
        query={{
          key: "AIzaSyBbWtNuo87QWGWKzDV4O5b74n_5zqcWYu4",
          language: "es",
        }}
      />
    </View>
  );
}
