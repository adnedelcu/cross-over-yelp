import { useEffect, useState } from 'react';
import { Layout } from './Layout.jsx';
import { RestaurantCard } from './RestaurantCard.jsx';
import { RestaurantCardSkeleton } from './RestaurantCardSkeleton.jsx';

import { getRestaurants } from '../utils/restaurants.js';

export const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      try {
        getRestaurants()
          .then(restaurants => {
            setRestaurants(restaurants);
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

  return (
    <Layout>
      <div className="flex flex-row gap-4 flex-wrap">
        {isLoading ? (
          <>
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
            <RestaurantCardSkeleton />
          </>
        ) : (
          restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
        )}
      </div>
    </Layout>
  )
}
