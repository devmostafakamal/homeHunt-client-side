import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const AdminProfile = () => {
  const { user } = useAuth();
  const { role, loading } = useRole();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user?.photoURL || "https://i.ibb.co/2yXqS3F/user.png"}
          alt="User"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
        <h2 className="text-2xl font-bold">{user?.displayName}</h2>
        <p className="text-gray-500">{user?.email}</p>

        {role !== "user" && (
          <span className="badge badge-success capitalize">Role: {role}</span>
        )}

        {/* Optional: Add more details if needed */}
        <div className="mt-4 text-sm text-gray-600">
          <p>UID: {user?.uid}</p>
          <p>Last login: {user?.metadata?.lastSignInTime}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
