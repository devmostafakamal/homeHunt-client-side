import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../socialLogin/SocialLogin";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [profilePic, setProfilePic] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`,
      formData
    );
    setProfilePic(res.data.data.url);
  };

  const onSubmit = async (data) => {
    if (!profilePic) {
      toast.error("Please upload a profile picture first.");
      return;
    }
    try {
      const result = await createUser(data.email, data.password);
      const userInfo = {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        photoURL: profilePic,
        role: "user",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
      await axios.post("/users", userInfo);
      await updateUserProfile({ displayName: data.name, photoURL: profilePic });
      toast.success("Account created successfully!");
      navigate(from);
    } catch (error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6">
          Create an account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              {...register("name", { required: true })}
              className="peer w-full px-6 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label
              className="absolute left-4  text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:-top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Your Name
            </label>
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">Name is required</p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="relative">
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full px-6 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              placeholder=" "
              {...register("email", { required: true })}
              className="peer w-full px-6 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label
              className="absolute left-4  text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:-top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
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
              className="peer w-full px-6 py-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <label
              className="absolute left-4 text-gray-400 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
              peer-focus:-top-0 peer-focus:text-blue-500 peer-focus:text-sm"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
            {errors.password?.type === "required" && (
              <p className="text-red-500 mt-1 text-sm">Password required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 mt-1 text-sm">
                Password must be 6 characters or longer
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="mt-6 w-full">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
}

export default Register;
