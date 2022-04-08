// import des packages
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div>
      <img src="" alt="" />
      <div>
        <h2>Prêts à faire du tri dans vos placards ?</h2>
        <button
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
