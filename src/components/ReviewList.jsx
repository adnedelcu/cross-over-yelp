import { Review } from './Review.jsx';

export const ReviewList = ({reviews = [], users = {}}) => {
  return (
    <ul className="timeline timeline-snap-icon timeline-compact timeline-vertical">
      {reviews.map((review, index) => <Review key={review.id} index={index+1} review={review} user={users[review.user_id]} />)}
    </ul>
  )
}
