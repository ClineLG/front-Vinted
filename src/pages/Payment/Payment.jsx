import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import "./payment.css";

import CheckoutForm from "../../components/CheckoutForm";
const StripePromise = loadStripe(
  "pk_test_51QPNXsRvlPi6YdIftGlwCboNtL1rl96qXgNEKhCaBooPnAOr3Z9zly1Kiu7fFq7my38I78PTokiJYG955mL3dS3X00KUQy53Rb"
);

const Payment = () => {
  const [completed, setCompleted] = useState(false);

  const location = useLocation();
  const { offer } = location.state;

  const options = {
    mode: "payment",
    amount: Number(offer.product_price * 100),
    currency: "eur",
  };

  return Cookies.get("token") ? (
    <section className="sectionPay">
      <div className="container">
        <div>
          <div className={`paymentForm ${completed && "inverseForm"}`}>
            <div>
              <h3>Résumé de la commande</h3>
              <div>
                <p>
                  <span>Commande</span> <span>{offer.product_price} €</span>
                </p>
                <p>
                  <span>Frais protection acheteur</span> <span>0.40 €</span>
                </p>
                <p>
                  <span>Frais de port</span> <span>0.80 €</span>
                </p>
              </div>
              <div className="black">
                <h2>
                  <span>Total</span>
                  <span>
                    {Number(offer.product_price + 0.4 + 0.8).toFixed(2) + "€"}
                  </span>
                </h2>
              </div>

              {!completed && (
                <p className="special">
                  Il ne vous reste plus qu'une étape pour vous offrir
                  <span>
                    {!offer.product_name
                      ? "cet article"
                      : " " + offer.product_name}
                  </span>
                  . Vous allez payer
                  <span>
                    {" " + (offer.product_price + 0.4 + 0.8).toFixed(2)}
                  </span>
                  € (frais de protection et frais de port inclus).
                </p>
              )}
            </div>
            <Elements stripe={StripePromise} options={options}>
              <CheckoutForm
                offer={offer}
                setCompleted={setCompleted}
                completed={completed}
              />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="notConnectedOffer container">
      <h2>Vous devez être connecté pour accéder à ce contenue</h2>
    </div>
  );
};
export default Payment;
