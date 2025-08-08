import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Wishlist = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: wishlist = [], refetch } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleRemove = async (id) => {
    const res = await axiosSecure.delete(`/wishlist/${id}`);
    if (res.data?.deletedCount > 0) {
      Swal.fire("Removed", "Property removed from wishlist", "success");
      refetch();
    }
  };
  const handleMakeOffer = (property) => {
    navigate(`/dashboard/make-offer/${property._id}`, { state: property });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
      {wishlist.map((property) => (
        <div key={property._id} className="border p-4 rounded-lg shadow">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-xl font-semibold mt-2">{property.title}</h2>
          <p>
            <strong>Location:</strong> {property.location}
          </p>
          <p>
            <strong>Agent:</strong> {property.agentName}
          </p>
          <img
            src={property.agentImage}
            alt="Agent"
            className="w-10 h-10 rounded-full mt-1"
          />
          <p>
            <strong>Status:</strong> {property.status}
          </p>
          <p>
            <strong>Price:</strong> {property.priceRange}
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleMakeOffer(property)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Make an Offer
            </button>
            <button
              onClick={() => handleRemove(property._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
