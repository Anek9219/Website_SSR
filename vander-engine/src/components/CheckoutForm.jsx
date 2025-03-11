import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    try {
      const response = await fetch("http://localhost:4000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        alert(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === "succeeded") {
        alert("Payment successful!");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn btn-primary mt-3"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
}
