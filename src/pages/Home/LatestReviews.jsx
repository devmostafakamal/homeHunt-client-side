import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const LatestReviews = () => {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["latestReviews"],
    queryFn: async () => {
      const res = await axios.get(
        "https://homehunt-server-azure.vercel.app/reviews/latest"
      );
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading reviews...</p>;

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1500" // duration in milliseconds
      data-aos-delay="300"
    >
      <div className="my-10 mt-20 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          📝 Latest User Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={review.reviewerImage}
                  alt={review.reviewerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.propertyTitle}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-gray-700">{review.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestReviews;
