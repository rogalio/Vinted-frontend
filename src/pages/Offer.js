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
      } catch (error) {
        console.log(error.response);
      }
    };
    FetchData();
  }, [id]);

  return isLoading ? (
    <span>En cours de chargement</span>
  ) : (
    <div>
      <img src={data.product_image.secure_url} alt={data.product_name} />
      <div>
        <p>{data.product_price} €</p>
        <p>
          Notre Protection acheteurs est ajoutée, moyennant des frais, pour
          chaque transaction effectuée par le biais du bouton « Acheter ». Cette
          protection acheteurs comprend notre Politique de remboursement.
        </p>
        <ul>
          {data.product_details.map((elem, index) => {
            const keys = Object.keys(elem);
            return (
              <li key={index}>
                <span> {elem[keys[0]].toLowerCase()}</span>
              </li>
            );
          })}
        </ul>
        <div className="btn-card-offer">
          <button className="btn-ask">Envoyez un message</button>
          {token ? (
            <button
              className="btn-buy"
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
