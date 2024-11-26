import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ offer, setCompleted, completed }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const response = await axios.post(
      `https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offer/payment`,
      {
        amount: offer.product_price * 100,
        currency: "eur",
        description: offer.product_description,
      }
    );

    const clientSecret = response.data.client_secret;

    const stripeResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "https://frontv1nted.netlify.app/", //"http://localhost:5173/"
      },
      redirect: "if_required",
    });

    if (stripeResponse.error) {
      setErrorMessage(stripeResponse.error.message);
      setIsLoading(!isLoading);
    }
    if (stripeResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }
    setIsLoading(!isLoading);
  };

  return completed ? (
    <div className="notConnectedOffer container">
      <h4 className="bigger">Paiement effectué avec succés !</h4>
    </div>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className="PaymentSubmit"
        type="submit"
        disabled={!stripe || !elements}
      >
        Payer !
      </button>

      {errorMessage && <p className="red">{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
