// import packages
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  //Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Login fonctions
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  //// Requete axios vers API "/user/login"
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-backend75.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        // Sauvegarder le token dans un cookie
        setUser(response.data.token);
        // Rediriger le user vers "/"
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
    }
  };

  return (
    <div className=" flex flex-col mt-10 items-center  ">
      <h1 className=" text-2xl mb-6 ">Se connecter</h1>
      <form
        className="flex flex-col gap-4 w-3/4 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <input
          className=" border-b border-pink"
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className="border-b border-pink "
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className="bg-vintedgreen h-8 text-white mb-2"
          type="submit"
          value="Se connecter"
        />
        <span className="text-red">{errorMessage}</span>
      </form>
      <Link className="text-vintedgreen" to="/signup">
        Pas encore Inscrit ? Inscris toi !
      </Link>
    </div>
  );
};

export default Login;
