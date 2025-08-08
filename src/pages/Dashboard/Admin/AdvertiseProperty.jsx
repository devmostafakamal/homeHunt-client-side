import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

function AdvertiseProperty() {
  const axiosSecure = useAxios();
  const { data: verifiedProperties = [], refetch } = useQuery({
    queryKey: ["verifiedProperties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties/verified"); // only where status: "verified"
      return res.data;
    },
  });
  const handleAdvertise = async (id) => {
    try {
      const res = await axiosSecure.patch(`/properties/advertise/${id}`);
      if (res.data.modifiedCount > 0) {
        toast.success("Property advertised successfully!");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to advertise");
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Agent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {verifiedProperties.map((property) => (
            <tr key={property._id}>
              <td>
                <img src={property.image} className="w-16 h-10 object-cover" />
              </td>
              <td>{property.title}</td>
              <td>{property.priceRange}</td>
              <td>{property.agentName}</td>
              <td>
                {property.isAdvertised ? (
                  <span className="text-green-500 font-medium">Advertised</span>
                ) : (
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleAdvertise(property._id)}
                  >
                    Advertise
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdvertiseProperty;
