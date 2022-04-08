//import des packages
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//import des pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./componants/Header";
import Offer from "./pages/Offer";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [sortPrice, setSortPrice] = useState(false);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [search, setSearch] = useState("");

  //creation d'une variable User et assignation d'un cookie
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 10 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };

  return (
    <Router>
      <Header
        setUser={setUser}
        token={token}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="offer/:id" element={<Offer token={token} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
