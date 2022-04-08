// import des packages
import React from "react";
import { useNavigate, Link } from "react-router-dom";

import logo from "../data/logo.png";
import "../App.css";

const header = ({ setUser, token, setSearch }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>

      <input
        className="search-bar"
        type="text"
        placeholder="Rechercher des articles"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="header-btn">
        <div className="connexion-btn">
          {token ? (
            <button
              className="disconectconnect-btn "
              onClick={() => {
                setUser(null);
              }}
            >
              Se deconnecter
            </button>
          ) : (
            <>
              <Link to="/signup">
                <button className="connect-btn ">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="connect-btn ">Se connecter</button>
              </Link>
            </>
          )}
        </div>
        <Link to="/publish">
          <button className="sell-btn">Vend tes articles</button>
        </Link>
      </div>
    </div>
  );
};

export default header;
