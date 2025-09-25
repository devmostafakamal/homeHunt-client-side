import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
// import useAxios from "../../../hooks/useAxios";

function SocialLogin() {
  const { signWithGoogle } = useAuth();
  // const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const handleGoogleSignIn = () => {
    signWithGoogle()
      .then(async (result) => {
        const user = result.user;
        console.log("Google signed-in user:", user);
        navigate(from);

        const userInfo = {
          email: user.email,
          role: "user", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // try {
        //   const res = await axiosInstance.post("/users", userInfo);
        //   console.log("user info updated:", res.data);

        //   navigate(from); // Redirect after saving user
        // } catch (error) {
        //   console.log("Error saving user:", error);
        // }
      })
      .catch((error) => {
        console.log("Google sign-in error:", error);
      });
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <div className="flex-1 h-px bg-gray-400"></div>
        <p className="mx-4 text-gray-600">OR</p>
        <div className="flex-1 h-px bg-gray-400"></div>
      </div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2  py-2 px-4 border rounded-lg bg-white text-black hover:bg-gray-100 transition-colors"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </>
  );
}

export default SocialLogin;
