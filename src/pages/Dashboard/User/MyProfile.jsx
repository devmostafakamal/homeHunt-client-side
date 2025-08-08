import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

function MyProfile() {
  const { user } = useAuth();
  const { role, loading } = useRole();

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <img
          src={user?.photoURL || "https://i.ibb.co/2yXqS3F/user.png"}
          alt="User"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>

        {role !== "user" && (
          <p className="text-blue-600 font-medium capitalize mt-2">
            Role: {role}
          </p>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
