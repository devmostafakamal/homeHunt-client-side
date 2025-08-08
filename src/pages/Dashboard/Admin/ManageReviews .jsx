import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews/all");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/reviews/${id}`);
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refetch();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to delete the review.", "error");
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage All Reviews</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow space-y-2"
          >
            <div className="flex items-center gap-3">
              <img
                src={review.reviewerImage || "/default-avatar.png"}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{review.reviewerName}</h4>
                <p className="text-sm text-gray-500">{review.reviewerEmail}</p>
              </div>
            </div>
            <p className="text-gray-700 mt-2">{review.description}</p>
            <button
              onClick={() => handleDelete(review._id)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
