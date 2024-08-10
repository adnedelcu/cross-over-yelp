export const RestaurantCardSkeleton = ({ restaurant }) => {
  return (
    <>
      <div className="rounded-lg overflow-hidden shadow-2xl xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2">
        <div className="h-48 w-full object-cover object-end skeleton"></div>
        <div className="p-6">
          <div className="flex items-baseline skeleton h-4 w-20">
            <span className="inline-block py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide skeleton h-4 w-20"></span>
            <span className="inline-block py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide skeleton h-4 w-20"></span>
          </div>
          <h4 className="mt-2 font-semibold text-lg leading-tight truncate skeleton h-4 w-40"></h4>

          <div className="mt-2 flex items-center">
            <span className="rating rating-half skeleton h-4 w-20"></span>
            <span className="ml-2 text-gray-600 text-sm skeleton h-4 w-20"></span>
          </div>
          <div className="mt-2 skeleton h-8 w-20"></div>
          {/* <Link to={`/restaurants/${restaurant.id}`} className="btn btn-primary mt-2">Check more</Link> */}
        </div>
      </div>
    </>
  );
}
