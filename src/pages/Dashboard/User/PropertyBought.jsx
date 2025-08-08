import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";

const PropertyBought = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: offers = [] } = useQuery({
    queryKey: ["property-bought", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?buyerEmail=${user.email}`);
      return res.data;
    },
  });

  const handlePay = (offer) => {
    navigate(`/dashboard/payment/${offer._id}`, { state: offer });
  };

  return (
    <div className="p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {offers.length === 0 && (
        <p className="text-center text-gray-500">You have no offers yet.</p>
      )}

      {offers.map((offer) => (
        <div
          key={offer._id}
          className="border rounded shadow p-4 flex flex-col"
        >
          <img
            src={offer.image || "/placeholder.png"}
            alt={offer.title}
            className="w-full h-48 object-cover rounded"
          />

          <h2 className="mt-3 font-semibold text-xl">{offer.title}</h2>

          <p>
            <strong>Location:</strong> {offer.location}
          </p>

          <p>
            <strong>Agent:</strong> {offer.agentName}
          </p>

          <p>
            <strong>Offered Amount:</strong> $
            {offer.offerAmount.toLocaleString()}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                offer.status === "accepted"
                  ? "text-green-600 font-semibold"
                  : offer.status === "pending"
                  ? "text-yellow-600 font-semibold"
                  : offer.status === "bought"
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 font-semibold"
              }
            >
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </span>
          </p>

          {/* স্ট্যাটাস accepted হলে পে বাটন দেখাবে */}
          {offer.status === "accepted" && !offer.transactionId && (
            <button
              onClick={() => handlePay(offer)}
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Pay
            </button>
          )}

          {/* যদি পেমেন্ট হয়ে থাকে, তাহলে ট্রানজেকশন আইডি দেখাবে */}
          {offer.status === "bought" && offer.transactionId && (
            <p className="mt-auto text-green-700 font-semibold">
              Transaction ID: {offer.transactionId}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyBought;
