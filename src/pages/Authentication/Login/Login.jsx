import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../socialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { getIdToken } from "firebase/auth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [firebaseError, setFirebaseError] = useState(null);

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
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email }),
          }
        );

        const responseData = await res.json();
        localStorage.setItem("access-token", responseData.token); // Save JWT

        toast.success("Login successful");
        navigate(from); // Navigate to desired route
      })
      .catch((err) => {
        console.log(err.code);
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
    <div className="text-center">
      <h1 className="text-5xl font-bold">Please Login</h1>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                {...register("email", { required: true })}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}

              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer
                </p>
              )}

              {firebaseError && (
                <p className="text-red-600 mt-2">{firebaseError}</p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button className="btn btn-primary text-black mt-4">Login</button>
            </fieldset>

            <p>
              New to this site?{" "}
              <Link
                state={{ from }}
                className="btn bg-green-400"
                to="/register"
              >
                Register
              </Link>
            </p>
          </form>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
}

export default Login;
