import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeOffer = () => {
  const { state: property } = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  // Extract price range (e.g., "$500 - $800" → 500, 800)
  const [minPrice, maxPrice] = property.priceRange
    .split("-")
    .map((p) => parseFloat(p.replace(/[^\d.]/g, "")));

  const onSubmit = async (data) => {
    const offerAmount = parseFloat(data.offerAmount);

    // ✅ Validate price range
    if (offerAmount < minPrice || offerAmount > maxPrice) {
      return Swal.fire(
        "Invalid Offer",
        `Offer must be between $${minPrice} and $${maxPrice}`,
        "error"
      );
    }
    // ✅ Prepare offer data
    const offerData = {
      propertyId: property._id,
      title: property.title,
      location: property.location,
      image: property.image,
      agentName: property.agentName,
      offerAmount,
      buyerEmail: user.email,
      buyerName: user.displayName,
      agentEmail: property.agentEmail,
      buyingDate: data.buyingDate,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/offers", offerData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Offer submitted successfully", "success");
        reset();
        navigate("/dashboard/property-bought");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Make an Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          defaultValue={property.title}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("location")}
          defaultValue={property.location}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("agentName")}
          defaultValue={property.agentName}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("buyerEmail")}
          defaultValue={user?.email}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("buyerName")}
          defaultValue={user?.displayName}
          readOnly
          className="input input-bordered w-full"
        />

        <input
          {...register("buyingDate")}
          type="date"
          required
          className="input input-bordered w-full"
        />

        <input
          {...register("offerAmount", { required: true })}
          type="number"
          step="0.01"
          placeholder={`Offer between $${minPrice} - $${maxPrice}`}
          className="input input-bordered w-full"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Send Offer
        </button>
      </form>
    </div>
  );
};

export default MakeOffer;
