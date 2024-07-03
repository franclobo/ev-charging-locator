import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import MapView, { Marker } from "react-native-maps";
import MapViewStyle from '../../utils/MapViewStyle.json'
import { UserLocationContext } from '../../context/UserLocationContext';
import { FontAwesome6 } from "@expo/vector-icons";
import Markers from './Markers';

export default function AppMapView({placeList}) {
  const { location, setLocation } = useContext(UserLocationContext);

  return (
    location?.latitude && (
      <View classsName="flex-1">
        <MapView
          className="w-full h-full"
          provider={MapView.PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={{
            latitude: location?.latitude,
            longitude: location?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {location ? <Marker
            coordinate={{
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
          >
            <FontAwesome6 name="car-side" size={24} color="black" />
          </Marker> : null}
          {placeList &&
            placeList.map((item, index) => {
              return (
                <Markers key={index} index={index} place={item} />
              );
            }
          )}
        </MapView>
      </View>
    )
  );
}
