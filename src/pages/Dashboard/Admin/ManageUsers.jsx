import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = async (email, role) => {
    try {
      await axiosSecure.patch(`/users/make-${role}/${email}`);
      toast.success(`Made ${role}`);
      refetch();
    } catch (err) {
      toast.error("Failed to change role");
    }
  };

  const handleFraud = async (email) => {
    try {
      await axiosSecure.patch(`/users/mark-fraud/${email}`);
      toast.success("Marked as fraud");
      refetch();
    } catch (err) {
      toast.error("Failed to mark fraud");
    }
  };

  const handleDelete = async (email) => {
    try {
      await axiosSecure.delete(`/users/${email}`);
      toast.success("User deleted");
      refetch();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
              <th>Make Agent</th>
              <th>Fraud</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={u._id}>
                <td>{idx + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button
                      onClick={() => handleRoleChange(u.email, "admin")}
                      className="btn btn-xs btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  {u.role !== "agent" && u.role !== "fraud" && (
                    <button
                      onClick={() => handleRoleChange(u.email, "agent")}
                      className="btn btn-xs btn-info"
                    >
                      Make Agent
                    </button>
                  )}
                </td>
                <td>
                  {u.role === "agent" && (
                    <button
                      onClick={() => handleFraud(u.email)}
                      className="btn btn-xs btn-warning"
                    >
                      Mark Fraud
                    </button>
                  )}
                  {u.role === "fraud" && (
                    <span className="badge badge-error">Fraud</span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(u.email)}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <p>Loading users...</p>}
      </div>
    </div>
  );
};

export default ManageUsers;
