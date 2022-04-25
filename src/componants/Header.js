// import des packages
import React from "react";
import { Link } from "react-router-dom";

import logo from "../data/logo.png";
import "../App.css";

const header = ({ setUser, token, setSearch }) => {
  return (
    <div className="  flex  flex-wrap items-center pl-2 pt-2 md:flex-nowrap justify-around max-w-5xl mx-auto  ">
      <Link to="/">
        <img className=" w-24   " src={logo} alt="" />
      </Link>

      <input
        className="  bg-grey h-8 w-60 px-2 lg:w-72 "
        type="text"
        placeholder="Rechercher des articles"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="header-btn flex h-11 mt-3  gap-4 ">
        <div className="connexion-btn">
          {token ? (
            <button
              className="bg-red text-white h-8 px-2 "
              onClick={() => {
                setUser(null);
              }}
            >
              Se deconnecter
            </button>
          ) : (
            <div className="border-2 border-vintedgreen gap-3 flex px-2 h-8 items-center  ">
              <Link to="/signup">
                <button className=" text-vintedgreen  ">S'inscrire </button>
              </Link>
              <span>/</span>
              <Link to="/login">
                <button className="text-vintedgreen "> Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <Link to="/publish">
          <button className="bg-vintedgreen text-white h-8 px-2">
            Vend tes articles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default header;
