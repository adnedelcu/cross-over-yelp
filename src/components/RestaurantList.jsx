import { useEffect, useState } from 'react';
import { Layout } from './Layout.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';
import { RestaurantCardSkeleton } from './RestaurantCardSkeleton.jsx';

import { getRestaurants } from '../utils/restaurants.js';

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  // States for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        getRestaurants()
          .then(restaurants => {
            setRestaurants(restaurants);
            setFilteredRestaurants(restaurants); // to show initial restaurants
          })
          .finally(() => setIsLoading(false))
      } catch (e) {
        console.error(e);
      }
    }

    return () => {
      ignore = true;
    };
  }, []);

  // Filter Logic
  useEffect(() => {
    let filtered = restaurants;

    if (searchTerm || selectedCity || selectedTag) {
      if (searchTerm) {
        filtered = filtered.filter(restaurant => 
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCity) {
        filtered = filtered.filter(restaurant => 
          restaurant.location.city.toLowerCase() === selectedCity.toLowerCase()
        );
      }

      if (selectedTag) {
        filtered = filtered.filter(restaurant => 
          restaurant.tags.includes(selectedTag)
        );
      }
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedCity, selectedTag, restaurants]);

  return (
    <Layout>
      {/* Search and Filter Bar */}
      <div className="flex flex-col items-center w-full max-w-2xl mt-5">
        <div className="flex justify-between items-center my-5 p-4 bg-gray-800 rounded-lg w-full">
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            list="restaurant-names"
            className="p-2 mr-3 border border-gray-400 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <datalist id="restaurant-names">
            {restaurants
              .filter(restaurant => 
                restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(restaurant => (
                <option key={restaurant.id} value={restaurant.name} />
              ))
            }
          </datalist>

          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 mr-3 border border-gray-400 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Select City</option>
            {[...new Set(restaurants.map(r => r.location.city))].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <select 
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="p-2 border border-gray-400 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Select Tag</option>
            {[...new Set(restaurants.flatMap(r => r.tags))].map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtered Restaurant List */}
      <div className="flex flex-row gap-4 flex-wrap">
        {isLoading ? (
          <>
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
          </>
        ) : (
          filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        )}
      </div>
    </Layout>
  )
}
