import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { offerId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: offerInfo = {} } = useQuery({
    queryKey: ["offer", offerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${offerId}`);
      return res.data;
    },
  });
  console.log(offerInfo);
  if (isPending) return <p className="text-center">Loading payment info...</p>;

  const priceRange = offerInfo?.offerAmount;
  // console.log(priceRange);
  const amount = offerInfo?.offerAmount || 0;

  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    // Step 1: Create payment method
    const { error: methodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "noemail@example.com",
        },
      });

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    }

    setError("");

    // Step 2: Create payment intent
    const intentRes = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      offerId,
    });

    const clientSecret = intentRes.data.clientSecret;

    // Step 3: Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: confirmError.message,
      });
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Step 4: Save payment to DB
      await axiosSecure.post("/payments", {
        offerId,
        transactionId: paymentIntent.id,
        amount: amountInCents / 100,
        email: user.email,
        userName: user.displayName,
        status: "bought", // marking as bought
      });

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        html: `
          <p><strong>Transaction ID:</strong> ${paymentIntent.id}</p>
          <p><strong>Amount:</strong> $${(amountInCents / 100).toFixed(2)}</p>
        `,
        confirmButtonText: "Go to My Parcels",
      });

      // navigate("/dashboard/myParcels");
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-[720px] mx-auto mt-10 bg-white p-6 rounded shadow-2xl">
      <h2 className="text-2xl font-bold mb-4">Pay ${amount}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="btn btn-primary w-full"
        >
          {isProcessing ? "Processing..." : `Pay $${amount}`}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}

export default PaymentForm;
