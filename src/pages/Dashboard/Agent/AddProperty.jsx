import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_image_upload_key
}`;

const AddProperty = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axios.post(imageUploadUrl, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        const propertyData = {
          title: data.title,
          location: data.location,
          image: imageUrl,
          agentName: user?.displayName || "Unknown",
          agentEmail: user?.email || "Unknown",
          agentImage: user?.photoURL || "",
          priceRange: data.priceRange,
        };
        // console.log(propertyData);

        await axios.post(
          "https://homehunt-server-azure.vercel.app/properties",
          propertyData
        );

        Swal.fire({
          icon: "success",
          title: "Property Added!",
          text: "Your property has been successfully added.",
        });

        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add property.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Property Title"
          {...register("title", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.title && <p className="text-red-500">Title is required</p>}

        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.location && (
          <p className="text-red-500">Location is required</p>
        )}

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="file-input file-input-bordered w-full"
        />
        {errors.image && <p className="text-red-500">Image is required</p>}

        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />

        <input
          type="text"
          placeholder="Price Range (e.g. $5000 - $7000)"
          {...register("priceRange", { required: true })}
          className="input input-bordered w-full"
        />
        {errors.priceRange && (
          <p className="text-red-500">Price range is required</p>
        )}

        <button type="submit" className="btn btn-primary w-full">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
