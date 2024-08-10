import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { getRestaurant } from '../utils/restaurants.js';
import { getUser } from '../utils/users.js';
import { Layout } from './Layout.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';

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
          {/* <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
            <img className="h-48 w-full object-cover object-end" src="https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80" alt="Home in Countryside" />
            <div className="p-6">
              <div className={`flex items-baseline ${!restaurant.tags ? 'skeleton' : ''}`}>
                {restaurant.tags?.map((tag, index) => <span key={index} className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">{tag}</span>) || <span>&nbsp;</span>}
              </div>
              <h4 className={`mt-2 font-semibold text-lg leading-tight truncate ${!restaurant.name ? 'skeleton' : ''}`}>{restaurant.name || <span>&nbsp;</span>}</h4>
              {restaurant.location && (
                <p className="py-6">
                  {restaurant.location.address}<br />
                  {restaurant.location.zip_code} {restaurant.location.city}, {restaurant.location.state}
                </p>
              )}
              <div className="mt-2 flex items-center">
                <span className="rating rating-half">
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-red-400" defaultChecked={restaurant.rating >= 0 && restaurant.rating <= 0.5} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-red-400" defaultChecked={restaurant.rating > 0.5 && restaurant.rating <= 1} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-orange-400" defaultChecked={restaurant.rating > 1 && restaurant.rating <= 1.5} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-orange-400" defaultChecked={restaurant.rating > 1.5 && restaurant.rating <= 2} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-yellow-400" defaultChecked={restaurant.rating > 2 && restaurant.rating <= 2.5} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-yellow-400" defaultChecked={restaurant.rating > 2.5 && restaurant.rating <= 3} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-lime-400" defaultChecked={restaurant.rating > 3 && restaurant.rating <= 3.5} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-lime-400" defaultChecked={restaurant.rating > 3.5 && restaurant.rating <= 4} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-green-400" defaultChecked={restaurant.rating > 4 && restaurant.rating <= 4.5} />
                  <input type="radio" name={`rating-${restaurant.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-green-400" defaultChecked={restaurant.rating > 4.5 && restaurant.rating <= 5} />
                </span>
                <span className="ml-2 text-gray-600 text-sm">{restaurant.reviews?.length} reviews</span>
              </div>
            </div>
          </div> */}
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

  return (
    <Layout>
      <div className="flex flex-col gap-3">
        <div class="antialiased text-gray-900 ">
          <div class="bg-gray-200 min-h-screen p-8 flex items-center justify-center">
            Restaurant {restaurant.name} #{id}
            {restaurant && restaurant.reviews?.map(review => (
              <div key={review.id} className="bg-gray-700 rounded-lg p-3 my-3">
                <p className="text-white">{review.text}</p>
                <span className="rating rating-half">
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-red-400" defaultChecked={review.rating >= 0 && review.rating <= 0.5} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-red-400" defaultChecked={review.rating > 0.5 && review.rating <= 1} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-orange-400" defaultChecked={review.rating > 1 && review.rating <= 1.5} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-orange-400" defaultChecked={review.rating > 1.5 && review.rating <= 2} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-yellow-400" defaultChecked={review.rating > 2 && review.rating <= 2.5} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-yellow-400" defaultChecked={review.rating > 2.5 && review.rating <= 3} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-lime-400" defaultChecked={review.rating > 3 && review.rating <= 3.5} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-lime-400" defaultChecked={review.rating > 3.5 && review.rating <= 4} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-1 bg-green-400" defaultChecked={review.rating > 4 && review.rating <= 4.5} />
                  <input type="radio" name={`rating-${review.id}`} disabled className="pointer-events-none mask mask-heart mask-half-2 bg-green-400" defaultChecked={review.rating > 4.5 && review.rating <= 5} />
                </span>
                <cite className={`block text-sm text-gray-500 dark:text-gray-400 ${!users[review.user_id] ? 'skeleton' : ''}`}>{(users && users[review.user_id]?.name) || <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}</cite>
              </div>
            ))}
            <Link to="/restaurants" className="btn btn-info">Go back to list</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
