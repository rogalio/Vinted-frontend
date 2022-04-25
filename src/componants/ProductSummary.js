import React from "react";

const ProductSummary = ({
  price,
  protectionFees,
  shippingFees,
  totalPrice,
}) => {
  return (
    <div className="payment-card summary bg-white mx-4 pt-2 md:mt-10 md:w-3/4 md:justify-center md:mx-auto  lg:w-3/4 lg:justify-center lg:mx-auto xl:justify-center xl:mx-auto xl:w-3/4  ">
      <div className="title text-xl y pt-4 mb-4 px-4  ">
        Résumé de la commande
      </div>
      <div className="content  ">
        <ul className="flex flex-col gap-1 px-4 ">
          <li className="flex  justify-between">
            <span>Commande </span>
            <span>{price} €</span>
          </li>
          <li className="flex  justify-between">
            <span> Frais protection acheteurs </span>
            <span>{protectionFees} €</span>
          </li>
          <li className="flex  justify-between mb-2">
            <span>Frais de port</span>
            <span>{shippingFees} €</span>
          </li>
        </ul>
      </div>
      <div className="divider" />
      <div className="content">
        <ul className="px-4 font-medium py-2 text-lg border-t-2 border-grey ">
          <li className="flex  justify-between border-t-grey">
            Total <span>{totalPrice} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSummary;
