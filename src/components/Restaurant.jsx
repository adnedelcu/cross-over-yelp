import { Link, useParams } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { useEffect, useState } from 'react';
import { getRestaurant } from '../utils/restaurants.js';
import { getUser } from '../utils/users.js';

export const Restaurant = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [users, setUsers] = useState({});

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
    <>
      <Navbar></Navbar>
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
    </>
  )
}
