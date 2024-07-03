import axios from 'axios';

const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";
const API_KEY = "AIzaSyBbWtNuo87QWGWKzDV4O5b74n_5zqcWYu4";

const config ={
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key':API_KEY,
        'X-Goog-FieldMask': [
          'places.displayName',
          'places.formattedAddress',
          'places.location',
          'places.evChargeOptions',
          'places.shortFormattedAddress',
          'places.photos',
          'places.id'
        ]
        }
}

const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);

export default {
  NewNearByPlace,
  API_KEY
}
