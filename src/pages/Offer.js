// import des packages
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Offer = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // price fees
  const price = data.product_price;
  const protectionFees = (price / 10).toFixed(2);
  const shippingFees = (protectionFees * 2).toFixed(2);
  const total = Number(price) + Number(protectionFees) + Number(shippingFees);

  // params & navigate
  const { id } = useParams();
  const navigate = useNavigate();

  //requete axios vers API back "/offers"
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend75.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    FetchData();
  }, [id, data]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div className="mt-2  bg-grey h-screen md:flex md:h-auto md:pb-8  lg:flex lg:h-auto lg:pb-10 lg:max-h-hero  xl:flex xl:h-auto xl:pb-10">
      <img
        className="   max-w-xs  w-[90%] object-cover mx-auto pt-6 md:h-full md:max-h-full   "
        src={data.product_image.secure_url}
        alt={data.product_name}
      />
      <div className="mt-6  bg-white mx-auto w-[90%] flex flex-col md:w-72 lg:w-80  xl:w-96  ">
        <p className=" text-2xl p-3 font-medium justify-center mx-auto">
          {data.product_price} €
        </p>

        <ul>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <li className="flex w-full  justify-between px-6" key={index}>
                <span className="w-1/2">{keys[0]}</span>
                <span className="font-medium ">
                  {elem[keys[0]].toLowerCase()}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="   mb-4 px-4 mt-5 text-sm md:text-xs">
          Notre Protection acheteurs est ajoutée, moyennant des frais, pour
          chaque transaction effectuée par le biais du bouton « Acheter ». Cette
          protection acheteurs comprend notre Politique de remboursement.
        </p>
        <div className="flex justify-center  py-4">
          {token ? (
            <button
              className="bg-vintedgreen h-8 text-white px-32 md:w-3/4 md:mt-10 lg:w-3/4 lg:mt-10"
              onClick={() => {
                navigate("/payment", {
                  state: {
                    price: data.product_price,
                    productName: data.product_name,
                    totalPrice: total,
                    protectionFees: protectionFees,
                    shippingFees: shippingFees,
                  },
                });
              }}
            >
              Acheter
            </button>
          ) : (
            navigate("/login")
          )}
        </div>
      </div>
    </div>
  );
};

export default Offer;
