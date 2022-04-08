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
    <div>
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <Link to="/login">Déja un compte ? Connecte-toi !</Link>
      <span>{errorMessage}</span>
    </div>
  );
};

export default Signup;
