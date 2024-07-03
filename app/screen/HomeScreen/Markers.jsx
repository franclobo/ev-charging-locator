import { View, Text, Image } from 'react-native'
import React, {useContext} from 'react'
import MapView, { Marker } from "react-native-maps";
import { SelectMarkerContext } from '../../context/SelectMarkerContext';

export default function Markers({index, place}) {
  const {selectedMarker, setSelectedMarker} = useContext(SelectMarkerContext);
  return (
    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}
      onPress={() => setSelectedMarker(index)}
    >
      <Image source={require("../../../assets/images/ev-marker.png")} style={{ width: 50, height: 50 }} />
    </Marker>
  );
}
