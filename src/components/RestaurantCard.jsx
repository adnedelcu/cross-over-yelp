import { Link } from "react-router-dom"

export const RestaurantCard = ({ restaurant, noMore = false }) => {
  return (
    <>
      <div className="bg-white text-black rounded-lg overflow-hidden shadow-2xl">
        <img className="h-48 w-full object-cover object-end" src={restaurant.image_URL} alt="Home in Countryside" />
        <div className="p-6">
          <div className="flex items-baseline">
            {restaurant.tags?.map((tag, index) => <span key={index} className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">{tag}</span>)}
          </div>
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate">{restaurant?.name}</h4>
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
          {!noMore && <Link to={`/restaurants/${restaurant.id}`} className="btn btn-primary mt-2">Check more</Link>}
        </div>
      </div>
    </>
  );
}
