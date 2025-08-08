import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyAddedProperties = () => {
  const { user } = useContext(AuthContext);

  const {
    data: properties = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-properties", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://homehunt-server-azure.vercel.app/properties/agent?email=${user.email}`
      );
      return res.data.data;
    },
    enabled: !!user?.email, // only fetch when email exists
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await axios.delete(
        `https://homehunt-server-azure.vercel.app/properties/verify/${id}`
      );
      refetch();
      Swal.fire("Deleted!", "Property has been removed.", "success");
    }
  };

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }
  // console.log(properties);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {properties.map((p) => (
        <div key={p._id} className="card bg-base-100 shadow-xl p-4 space-y-3">
          <img
            src={p.image}
            className="rounded-lg h-48 w-full object-cover"
            alt="Property"
          />
          <h2 className="text-xl font-bold">{p.title}</h2>
          <p>
            <strong>Location:</strong> {p.location}
          </p>
          <p>
            <strong>Price Range:</strong> {p.priceRange}
          </p>
          <p>
            <strong>Agent:</strong> {p.agentName}
          </p>
          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 badge ${
                p.verificationStatus === "verified"
                  ? "badge-success"
                  : p.verificationStatus === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              }`}
            >
              {p.verificationStatus || "pending"}
            </span>
          </p>

          <div className="flex justify-between">
            {p.verificationStatus !== "rejected" && (
              <Link
                to={`/dashboard/update-property/${p._id}`}
                className="btn btn-sm btn-info"
              >
                Update
              </Link>
            )}
            <button
              onClick={() => handleDelete(p._id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAddedProperties;
