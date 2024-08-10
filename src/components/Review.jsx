import  dayjs  from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export const Review = ({ review, user, index }) => {
  const createdAt = dayjs().subtract(Math.round(Math.random() * index * 2), 'day');
  return (
    <li>
      <div className="timeline-middle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="timeline-start mb-10 md:text-end">
        <time className="font-mono italic">{createdAt.fromNow()}</time>
        <div className="text-lg font-black">{user?.name}</div>
        <p>{review?.text}</p>
        <div className="rating rating-half">
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
        </div>
      </div>
      <hr />
    </li>
  )
}
