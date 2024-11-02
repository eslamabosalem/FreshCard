import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

export default function RatingStars({ rating }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-1">
        <Rating
          placeholderRating={rating}
          readonly
          emptySymbol={<FaStar className="text-gray-400 text-lg" />}
          placeholderSymbol={<FaStar className="text-yellow-400 text-lg" />}
          fractions={2}
        />

        <span className=" py-1 px-2 text-sm rounded bg-blue-300 dark:bg-blue-700/20 flex items-center">
          {rating}
        </span>
      </div>
    </>
  );
}
