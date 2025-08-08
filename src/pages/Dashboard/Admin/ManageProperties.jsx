import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const ManageProperties = () => {
  const queryClient = useQueryClient();

  // Fetch all properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["manage-properties"],
    queryFn: async () => {
      const res = await axios.get(
        "https://homehunt-server-azure.vercel.app/properties"
      );
      return res.data.data;
    },
  });

  // Mutation for status update
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axios.patch(
        `https://homehunt-server-azure.vercel.app/properties/verify/${id}`,
        {
          status,
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["manage-properties"]);
      Swal.fire("Success!", "Property status updated.", "success");
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  const handleStatus = (id, status) => {
    Swal.fire({
      title: `Are you sure to mark this as ${status}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        statusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Properties</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Agent</th>
            <th>Email</th>
            <th>Price Range</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => (
            <tr key={p._id}>
              <td>{p.title}</td>
              <td>{p.location}</td>
              <td>{p.agentName}</td>
              <td>{p.agentEmail}</td>
              <td>{p.priceRange}</td>
              <td>
                {p.verificationStatus === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatus(p._id, "verified")}
                      className="btn btn-sm btn-success"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleStatus(p._id, "rejected")}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  </div>
                )}
                {p.verificationStatus === "verified" && (
                  <span className="badge badge-success">Verified</span>
                )}
                {p.verificationStatus === "rejected" && (
                  <span className="badge badge-error">Rejected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProperties;
