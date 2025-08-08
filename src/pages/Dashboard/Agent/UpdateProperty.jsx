import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);

  // Fetch property data by ID from backend
  useEffect(() => {
    axios
      .get(`https://homehunt-server-azure.vercel.app/properties/${id}`)
      .then((res) => {
        setProperty(res.data);
        reset(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const { _id, ...updateData } = data;
      await axios.put(
        `https://homehunt-server-azure.vercel.app/properties/${id}`,
        updateData
      );
      Swal.fire("Updated!", "Your property has been updated.", "success");
      navigate(`/dashboard/update-property/${property._id}`);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update property.", "error");
    }
  };

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Property</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          className="input input-bordered w-full"
          placeholder="Title"
        />
        <input
          {...register("location")}
          className="input input-bordered w-full"
          placeholder="Location"
        />
        <input
          {...register("image")}
          className="input input-bordered w-full"
          placeholder="Image URL"
        />
        <input
          {...register("priceRange")}
          className="input input-bordered w-full"
          placeholder="Price Range"
        />
        <input
          value={property?.agentName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <input
          value={property?.agentEmail}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default UpdateProperty;
