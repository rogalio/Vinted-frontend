//import des packages
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ productName, totalPrice }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // fonction qui permet d'effectuer le paiement
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          amount: totalPrice,
          title: productName,
          token: stripeResponse.token.id,
        }
      );
      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return isPaid ? (
    <p className="text-xl font-medium  mt-10">Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement className="bg-white h-8 items-center pt-2" />
      <button
        className="bg-vintedgreen text-white h-8  mt-4 justify-center w-full "
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
