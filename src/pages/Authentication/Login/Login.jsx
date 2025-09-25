import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { getIdToken } from "firebase/auth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [firebaseError, setFirebaseError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    setFirebaseError(null);
    signIn(data.email, data.password)
      .then(async (result) => {
        const user = result.user;
        const idToken = await getIdToken(user);
        const res = await fetch(
          "https://homehunt-server-azure.vercel.app/jwt",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          }
        );

        const responseData = await res.json();
        localStorage.setItem("access-token", responseData.token);

        toast.success("Login successful");
        navigate(from);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setFirebaseError("No account found with this email.");
          toast.error("Email not found");
        } else if (err.code === "auth/wrong-password") {
          setFirebaseError("Incorrect password.");
          toast.error("Wrong password");
        } else {
          setFirebaseError("Login failed. Try again.");
          toast.error("Login failed");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Please Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register("email", { required: true })}
              className="peer w-full px-6 py-4 truncate border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4  text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-0 peer-focus:text-blue-500 peer-focus:text-sm">
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              {...register("password", { required: true, minLength: 6 })}
              className="peer w-full px-6 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label className="absolute left-4  text-gray-400 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-0 peer-focus:text-blue-500 peer-focus:text-sm">
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {errors.password?.type === "required" && (
              <p className="text-red-500 mt-1 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mt-1 text-sm">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {firebaseError && (
            <p className="text-red-600 text-center mt-2">{firebaseError}</p>
          )}

          <div className="text-right mb-2">
            <Link
              className="text-blue-500 hover:underline text-sm"
              to="/forgot-password"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          New to this site?{" "}
          <Link
            state={{ from }}
            to="/register"
            className="text-green-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
