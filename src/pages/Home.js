// import des packages
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../componants/Hero";
import avatar from "../data/avatar.gif";
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div>
      <Hero />
      <h2 className="my-4 text-xl font-medium px-2 md:my-6 max-w-6xl mx-auto  bg-red ">
        Fil d'actu
      </h2>
      <div className=" flex flex-wrap max-w-6xl mx-auto  ">
        {data.offers.map((offer) => {
          console.log(offer);

          return (
            //card

            <Link
              className=" w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 2xl:w-1/4  "
              to={`/offer/${offer._id}`}
            >
              <div className="flex-col  mx-2  mb-6 h-96 " id={offer._id}>
                <div className="flex pb-1 ">
                  <img
                    className=" w-6 rounded-full mr-2 "
                    src={avatar}
                    alt=""
                  />
                  <p>
                    {offer.owner.account.username
                      .replace("_", " ")
                      .replace(".", " ")}
                  </p>
                </div>
                <img
                  className="w-full h-60 object-cover lg:h-80 xl:h-80 2xl:h-80 3xl:h-80 "
                  src={offer.product_image.url}
                  alt=""
                />
                <div>
                  <div className="flex justify-between items-center">
                    <p className="ml-2 mt-1">{offer.product_price} €</p>
                    <p className="ml-2">{offer.product_name}</p>
                    <i></i>
                  </div>
                  <div className="flex flex-col">
                    <span className="ml-2">
                      taille : {offer.product_details[1]["TAILLE"]}{" "}
                    </span>
                    <span className="ml-2">
                      {offer.product_details[0]["MARQUE"]}
                    </span>
                  </div>
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
