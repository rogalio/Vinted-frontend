// import des packages
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../componants/Hero";

const Home = ({ search }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //requete axios vers API back "/offers"
  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend75.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };
    FetchData();
  }, [search]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <Hero />
      <div>
        {data.offers.map((offer) => {
          console.log(offer);
          return (
            //card
            <Link to={`/offer/${offer._id}`}>
              <div id={offer._id}>
                <div>
                  <img src={offer.owner.account.avatar?.url} alt="" />
                  <p>
                    {offer.owner.account.username
                      .replace("_", " ")
                      .replace(".", " ")}
                  </p>
                </div>
                <img src={offer.product_image.url} alt="" />
                <div>
                  <div>
                    <p>{offer.product_price}</p>
                    <p>{offer.product_name}</p>
                    <i></i>
                  </div>
                  <span>{offer.product_details[1]["TAILLE"]}</span>
                  <span>{offer.product_details[0]["MARQUE"]}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
