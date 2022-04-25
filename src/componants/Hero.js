// import des packages
import React from "react";
import { useNavigate } from "react-router-dom";
import hero from "../data/hero.jpg";
const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className=" md:relative  mx-auto flex flex-col  items-center lg:relative xl:relative ">
      <img
        className=" h-52 w-full md:h-80  object-cover lg:h-96  xl:h-hero 2xl:h-hero2 "
        src={hero}
        alt=""
      />
      <div className="mt-4 flex  flex-col text-center   items-center md:absolute   top-10 left-10  bg-white  py-4  lg:absolute  xl:absolute 2xl:absolute 2xl:top-32    ">
        <h2 className=" text-xl font-medium md:w-64 md:pb-4 lg:text-3xl px-10  lg:w-80 mb-2  xl:w-80 xl:mb-4 xl:text-4xl 2xl:w-96 2xl:text-3xl">
          Prêts à faire du tri dans vos placards ?
        </h2>
        <button
          className=" bg-vintedgreen w-3/4 h-8 text-white mt-2 "
          onClick={() => {
            navigate("/publish");
          }}
        >
          Vend maintenant
        </button>
      </div>
    </div>
  );
};

export default Hero;
