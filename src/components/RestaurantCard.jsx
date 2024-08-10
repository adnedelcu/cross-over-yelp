import { Link } from "react-router-dom"

export const RestaurantCard = ({ restaurant }) => {
  return (
    <>
      <div className="bg-base-200">
        <div className="flex flex-row">
          <img src={restaurant.image_URL} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{restaurant.name}</h1>
            {restaurant.location && <p className="py-6">
              {restaurant.location.address}<br />
              {restaurant.location.zip_code} {restaurant.location.city}, {restaurant.location.state}
            </p>}
            <p>
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
              ({restaurant.reviews.length} reviews)
            </p>
            <Link to={`/restaurants/${restaurant.id}`} className="btn btn-primary" >View more</Link>
          </div>
        </div>
      </div>
    </>
  )
}
