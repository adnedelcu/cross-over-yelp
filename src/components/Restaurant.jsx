import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { getRestaurant } from '../utils/restaurants.js';
import { getUser } from '../utils/users.js';
import { Layout } from './Layout.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';
import { ReviewList } from './ReviewList.jsx';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

export const Restaurant = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [users, setUsers] = useState({});
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
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
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${restaurant.location.address},${restaurant.location.zip_code}+${restaurant.location.city},${restaurant.location.state}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`)
              .then(response => response.json())
              .then(data => {
                console.log(data)
                setCoordinates(data.results[0]?.geometry)
                console.log(coordinates)
                console.log(data.results[0]?.geometry)
              })
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
                <Marker position={[coordinates.lat, coordinates.lng]}>
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
