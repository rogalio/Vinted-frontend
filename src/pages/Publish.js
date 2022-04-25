//import des packages
import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Publish = ({ token }) => {
  const [file, setFile] = useState({});
  const [preview, setPreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedWearRate, setSelectedWearRate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  // publication d'une offre
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("picture", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", selectedSize);
      formData.append("color", color);
      formData.append("condition", selectedWearRate);
      formData.append("city", city);
      formData.append("brand", selectedBrand);

      const response = await axios.post(
        "https://vinted-backend75.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data._id) {
        // redirectoin vers l'offre
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue, veuillez réssayer");
      }
    } catch (error) {
      alert(error.response);
    }
  };

  return token ? (
    <div className="publish-main bg-grey h-screen md:flex justify-center lg:flex lg:justify-center xl:flex 2xl:justify-center 2xl:flex">
      <div className="publish-container  px-4 py-4 md:w-3/4 lg:w-3/4 xl:w-3/4 2xl:w-1/2 ">
        <h2 className=" text-xl my-2 font-medium">Vends ton article</h2>

        <form onSubmit={handleSubmit}>
          <div className="file-select bg-white ">
            {preview ? (
              <div className="dashed-preview-image ">
                <img src={preview} alt="pré-visualisation" />
                <div
                  className="remove-img-button"
                  onClick={() => {
                    setPreview("");
                  }}
                >
                  X
                </div>
              </div>
            ) : (
              <div className="dashed-preview-without">
                <div className="input-design-default h-12 px-2  flex items-center ">
                  <label htmlFor="file" className="label-file  "></label>
                  <input
                    id="file"
                    type="file"
                    className="input-file  "
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                      setPreview(URL.createObjectURL(event.target.files[0]));
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Titre</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                type="text"
                id="title"
                name="title"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Décris ton article</h4>
              <textarea
                className=" h-12 px-2  flex items-center w-full pt-2"
                name="description"
                id="description"
                rows="5"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  const value = event.target.value;
                  setDescription(value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Marque</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                type="text"
                id="selectedBrand"
                name="selectedBrand"
                placeholder="ex: Zara"
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedBrand(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Taille</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                type="text"
                id="selectedSize"
                name="selectedSize"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedSize(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Couleur</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                type="text"
                id="color"
                name="color"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  const value = event.target.value;
                  setColor(value);
                }}
              />
            </div>
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Etat</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                name="wearRate"
                id="wearRate"
                placeholder="Neuf avec étiquette"
                onChange={(event) => setSelectedWearRate(event.target.value)}
              />
            </div>
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Lieu</h4>
              <input
                className=" h-12 px-2  flex items-center w-full"
                name="city"
                id="city"
                placeholder="ex: Paris"
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>
          <div className="text-input-section">
            <div className="text-input">
              <h4 className=" text-lg font-medium my-2">Prix</h4>
              <div className="checkbox-section">
                <input
                  className=" h-12 px-2  flex items-center w-full"
                  type="text"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  onChange={(event) => {
                    const value = event.target.value;
                    setPrice(value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-button-div">
            <button
              type="submit"
              className=" bg-vintedgreen h-8 w-full text-white mt-6"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromPublish: true }} />
  );
};

export default Publish;
