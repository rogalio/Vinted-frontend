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
    <div className="payment-wrapper h-screen ">
      <div className="payment-container bg-grey h-screen md:pt-1 lg:pt-10 xl:pt-10">
        <ProductSummary
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
        />
        <div className="payment-card  ">
          <div className="content mx-4 mt-4 md:justify-center  md:mx-auto md:w-3/4 lg:justify-center lg:mx-auto lg:w-3/4 xl:mx-auto xl:justify-center xl:w-3/4 ">
            <span>Il ne vous reste plus qu'un étape pour vous offrir </span>
            <span className="font-medium text-vintedgreen">{productName} </span>
            <span>. Vous allez payer </span>
            <span className="font-medium text-vintedgreen">
              {totalPrice} €{" "}
            </span>
            <span>(frais de protection et frais de port inclus).</span>

            <div className="mb-4" />
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
