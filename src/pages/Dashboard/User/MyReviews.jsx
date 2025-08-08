import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["my-reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(
          `/reviews/${id}?email=${user.email}`
        );
        if (res.data?.deletedCount > 0) {
          Swal.fire("Deleted!", "Review has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete review", "error");
      }
    }
  };

  return (
    <>
      {reviews.length === 0 ? (
        "You dont add no review yet"
      ) : (
        <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded shadow">
              <h2 className="text-lg font-bold">{review.propertyTitle}</h2>
              <p>
                <strong>Agent:</strong> {review.agentName}
              </p>
              <p>
                <strong>Reviewed At:</strong>{" "}
                {new Date(review.createdAt).toLocaleString()}
              </p>
              <p className="my-2 text-gray-700">{review.description}</p>
              <button
                onClick={() => handleDelete(review._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyReviews;
