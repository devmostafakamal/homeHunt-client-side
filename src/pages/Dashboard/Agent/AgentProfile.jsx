import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

export default function AgentProfile() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (authLoading || roleLoading || !user) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="w-[720px] mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl">
      <div className="flex flex-col items-center gap-4">
        <img
          src={user.photoURL || "/default-avatar.png"}
          alt="User"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-lg"
        />
        <h2 className="text-2xl font-bold">
          {user.displayName || "Unnamed User"}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        {role !== "user" && (
          <span className="badge badge-secondary text-sm px-4 py-1 rounded-full">
            Role: {role}
          </span>
        )}
      </div>
    </div>
  );
}
