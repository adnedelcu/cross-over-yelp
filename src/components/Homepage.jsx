import { Navbar } from './Navbar.jsx'
import { useState, useEffect } from 'react';
import mockData from '../assets/mockupData.json';
import logoGif from '../assets/logo.gif'; // Import the GIF


export const Homepage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    // Load the JSON data
    setRestaurants(mockData);
  }, []);

  useEffect(() => {
    // Only display filtered results when a filter is applied
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
    } else {
      filtered = []; // Clear the list when no filters are applied
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedCity, selectedTag, restaurants]);

  return (
    <>
      <div className="flex flex-col items-start justify-center min-h-screen">
        <Navbar />
        <div className="flex flex-row items-center justify-start w-full max-w-5xl mt-5 ml-20">
          {/* GIF on the left */}
          <img src={logoGif} alt="Logo" className="h-[17.5rem] w-[17.5rem] mr-16 rounded-lg object-cover" />

          <div className="flex flex-col items-center w-full max-w-2xl">
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
                {/* Generate autocomplete options */}
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
                {/* Map through unique cities for dropdown options */}
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
                {/* Map through unique tags for dropdown options */}
                {[...new Set(restaurants.flatMap(r => r.tags))].map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="mt-5 w-full">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-gray-800 p-4 mb-4 rounded-lg text-white">
                    <h3 className="text-lg font-bold text-teal-400">{restaurant.name}</h3>
                    <p className="text-sm text-gray-300">{restaurant.location.city}, {restaurant.location.state}</p>
                    <p className="text-sm text-gray-300">Tags: {restaurant.tags.join(', ')}</p>
                  </div>
                ))
              ) : (
                searchTerm || selectedCity || selectedTag ? 
                <p className="text-gray-400 text-center">No restaurants found matching your criteria.</p> : 
                <p className="text-gray-400 text-center">Please use the dropdowns above to search for a restaurant.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};