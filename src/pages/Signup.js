// import des packages
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
  // Signup states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  //Signup fonctions
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  // Requete axios vers API "/user/signup"
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://vinted-backend75.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      if (response.data.token) {
        // Sauvegarder le token dans un cookie
        setUser(response.data.token);
        // Rediriger le user vers "/"
        navigate("/");
      }
    } catch (error) {
      console.log("Signup Error ===> ", error.message);
      console.log("Catch error ===> ", error.response);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte");
      }
    }
  };

  return (
    <div className="flex flex-col mt-10 items-center ">
      <h1 className=" text-2xl mb-6">S'inscrire</h1>
      <form
        className="flex flex-col gap-4 w-1/3 md:w-1/2"
        onSubmit={handleSubmit}
      >
        <input
          className=" border-b border-pink"
          placeholder="Nom d'utilisateur"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          className=" border-b border-pink"
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          className=" border-b border-pink"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input
          className="bg-vintedgreen h-8 text-white mb-2"
          type="submit"
          value="Submit"
        />
      </form>
      <Link className="text-vintedgreen" to="/login">
        Déja un compte ? Connecte-toi !
      </Link>
      <span className="text-red">{errorMessage}</span>
    </div>
  );
};

export default Signup;
