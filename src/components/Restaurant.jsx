import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { getRestaurant } from '../utils/restaurants.js';
import { getUser } from '../utils/users.js';
import { Layout } from './Layout.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';
import { ReviewList } from './ReviewList.jsx';
import { randomCoordinates } from '../../config.js';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

import leafGreen from '../assets/leaf-green.png';
import leafShadow from '../assets/leaf-shadow.png';

import L from 'leaflet';

export const Restaurant = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [users, setUsers] = useState({});
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });

  const icon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafShadow,

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        getRestaurant(id)
          .then(restaurant => {
            for (let i = 0; i < restaurant.reviews.length; i++) {
              getUser(restaurant.reviews[i].user_id)
                .then(user => setUsers(prev => {
                  prev = {
                    ...prev,
                    [restaurant.reviews[i].user_id]: user,
                  }
                  return prev;
                }));
            }
            setCoordinates(randomCoordinates[Math.round(Math.random() * (randomCoordinates.length - 1))]);
            setRestaurant(restaurant);
          })
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-6 gap-3">
        <div className="col-start-1 col-end-3">
          {restaurant.id && <RestaurantCard restaurant={restaurant} noMore={true} />}
          {restaurant.reviews && <ReviewList reviews={restaurant.reviews} users={users}/>}
        </div>
        <div className="col-span-4">
          {coordinates.lat && coordinates.lng && (
            <MapContainer className="map" center={[coordinates.lat, coordinates.lng]} zoom={11}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {coordinates.lat && coordinates.lng && (
                <Marker icon={icon} position={[coordinates.lat, coordinates.lng]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    </Layout>
  );

}
