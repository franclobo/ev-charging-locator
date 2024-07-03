import { View, Text } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import AppMapView from './AppMapView'
import Header from './Header'
import SearchBar from './SearchBar';
import { UserLocationContext } from '../../context/UserLocationContext';
import GlobalAPI from '../../utils/GlobalAPI';
import PlaceListView from './PlaceListView';
import { SelectMarkerContext } from '../../context/SelectMarkerContext';

export default function HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext)
  const [placeList, setPlaceList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([])

  useEffect(() => {
    location && GetNearByPlace();
  }, [location])

  const GetNearByPlace = () => {
    const data = {
      "includedTypes": ["electric_vehicle_charging_station"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": location?.latitude,
            "longitude": location?.longitude,
          },
          "radius": 50000.0,
        },
      },
    };
    GlobalAPI.NewNearByPlace(data).then((res) => {
      console.log(JSON.stringify(res.data));
      setPlaceList(res.data?.places)
    })
  }
  return (
    <SelectMarkerContext.Provider value={{ selectedMarker, setSelectedMarker }}>
      <View>
        <View className="absolute z-10 py-3 px-5 w-full bg-white-transparent">
          <Header />
          <SearchBar searchedLocation={(location) => setLocation({
            latitude: location.lat,
            longitude: location.lng
          })} />
        </View>
        {placeList.length > 0 && <AppMapView placeList={placeList} />}
        <View className="absolute bottom-0 z-10 w-full">
          {placeList.length > 0 && <PlaceListView placeList={placeList} />}
        </View>
      </View>
    </SelectMarkerContext.Provider>
  );
}
