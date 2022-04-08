// import des packages
import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ProductSummary from "../componants/ProductSummary";
import CheckoutForm from "../componants/CheckoutForm";

const Payment = () => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51KUWUJIkpSnYhQP37VpswUt8GxghBBwq8Cg1fyHbOQApI4H81eivhxWIt4yXHhCNzow6LGIErEwXBOAgjNxbEktj00ILyZKUpP"
  );
  const { productName, totalPrice, protectionFees, shippingFees, price } =
    location.state;

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <ProductSummary
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
        />
        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'un étape pour vous offrir
            <span className="bold"> {productName}</span>. Vous allez payer{" "}
            <span className="bold">{totalPrice} €</span> (frais de protection et
            frais de port inclus).
            <div className="divider" />
            <Elements stripe={stripePromise}>
              <CheckoutForm productName={productName} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
