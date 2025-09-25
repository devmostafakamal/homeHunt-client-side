import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { role } = useRole();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    if (role !== "user") {
      return Swal.fire(
        "Access Denied",
        "Only regular users can add to wishlist.",
        "error"
      );
    }

    try {
      const wishData = {
        propertyId: property._id,
        userEmail: user.email,
        title: property.title,
        image: property.image,
        agentImage: property.agentImage,
        priceRange: property.priceRange,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        location: property.location,
        verificationStatus: property.verificationStatus || "pending",
      };

      await axiosSecure.post("/wishlist", wishData);
      Swal.fire("Added!", "Property added to wishlist.", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Could not add to wishlist.", "error");
    }
  };

  const handleAddReview = async () => {
    if (role !== "user") {
      return Swal.fire("Access Denied", "Only users can add review.", "error");
    }
    try {
      const reviewData = {
        propertyId: property._id,
        propertyTitle: property.title,
        agentName: property.agentName,
        reviewerEmail: user.email,
        reviewerName: user.displayName,
        reviewerImage: user.photoURL,
        description: reviewText,
        createdAt: new Date(),
      };

      await axiosSecure.post("/reviews", reviewData);
      setReviewText("");
      setShowModal(false);
      Swal.fire("Success!", "Review submitted.", "success");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to submit review.", "error");
    }
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-30">
      <img
        src={property.image}
        className="w-full h-96 object-cover rounded-lg"
        alt=""
      />
      <h2 className="text-3xl font-bold mt-4">{property.title}</h2>
      <p className="text-gray-600 my-2">{property.description}</p>
      <p>
        <strong>Location:</strong> {property.location}
      </p>
      <p>
        <strong>Price Range:</strong> {property.priceRange}
      </p>
      <p>
        <strong>Agent:</strong> {property.agentName}
      </p>

      <button onClick={handleAddToWishlist} className="btn btn-primary mt-4">
        Add to Wishlist
      </button>

      <hr className="my-6" />

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowModal(true)}
        >
          Add a Review
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="border p-3 rounded-md bg-gray-100">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-sm text-gray-600">
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p>{review.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Write your review here..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleAddReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
