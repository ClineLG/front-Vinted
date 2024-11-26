import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { useNavigate } from "react-router-dom";
import DropPictures from "../../components/DropPictures";
import "./publish.css";
const Publish = () => {
  const token = Cookies.get("token");
  const [data, setData] = useState();
  const navigate = useNavigate();
  // const [preview, setPreview] = useState(null);

  const [offer, setOffer] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    city: "",
    brand: "",
    size: "",
    color: "",
    pictures: null,
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      const {
        title,
        description,
        price,
        condition,
        city,
        brand,
        size,
        color,
        pictures,
      } = offer;

      formData.append("title", title);

      formData.append("description", description);

      formData.append("price", Number(price));

      formData.append("condition", condition);
      formData.append("city", city);

      formData.append("brand", brand);

      formData.append("size", size);

      formData.append("color", color);

      if (pictures) {
        // setPreview(objectURL);
        formData.append("picture", pictures[0]);
        for (let i = 1; i < offer.pictures.length; i++) {
          formData.append("pictures", pictures[i]);
        }
      }

      const response = await axios.post(
        `https://site--vinted-backend-project--dm4qbjsg7dww.code.run/offer/publish`,
        formData,
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log(response.data._id);
      navigate(`/Offers/${response.data._id}`);
    } catch (error) {
      console.log("error", error.response.data.error);
      if (error.response.data.error === "Missing parameters") {
        setData(
          "Le titre, la description et le prix sont des champs obligatoires"
        );
      } else if (
        error.response.data.error ===
        "Need a description less than 500 characters"
      ) {
        setData(
          "Vous devez entrer une description de moins de 500 charactères"
        );
      } else if (
        error.response.data.error === "Need a title less than 50 characters"
      ) {
        setData("Vous devez entrer un titre de moins de 50 charactères");
      } else if (
        error.response.data.error === "Need a price less than 100000"
      ) {
        setData("Vous devez entrer un prix inférieur à 10000 euros");
      } else {
        setData("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return Cookies.get("token") ? (
    <div className="publish">
      <div className="container">
        <h1>Vends ton Article !</h1>
        <form onSubmit={handleSubmit} className="formOffer">
          <div>
            {" "}
            <DropPictures
              str={"Déposes tes photos ici !"}
              setState={setOffer}
              state={offer}
            />
            <div>
              <label htmlFor="titre">Titre</label>
              <input
                type="text"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.title = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.title}
                placeholder="ex : Jolies chaussettes propres"
              />
            </div>
            <div>
              <label htmlFor="description">Décris ton article</label>
              <textarea
                rows="5"
                cols="5"
                id="description"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.description = event.target.value;
                  setOffer(newOffer);
                }}
                placeholder="ex : Portées très souvent, très confortables ! "
                value={offer.description}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="marque">Marque</label>
              <input
                type="text"
                id="marque"
                placeholder="ex : Tati"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.brand = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.brand}
              />
            </div>

            <div>
              <label htmlFor="taille">Taille</label>

              <input
                type="text"
                id="taille"
                placeholder="ex : L / 44 / 10ans"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.size = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.size}
              />
            </div>

            <div>
              <label htmlFor="couleur">Couleur</label>

              <input
                type="text"
                id="couleur"
                placeholder="ex : Marron-bleu"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.color = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.color}
              />
            </div>
            <div>
              <label htmlFor="etat">Etat</label>

              <input
                type="text"
                id="etat"
                placeholder="ex : Parfait état !"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.condition = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.condition}
              />
            </div>

            <div>
              <label htmlFor="lieu">Lieu</label>

              <input
                type="text"
                id="lieu"
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.city = event.target.value;
                  setOffer(newOffer);
                }}
                placeholder="ex : Paris"
                value={offer.city}
              />
            </div>
          </div>
          {/* <div>
          <label htmlFor="photo"></label> */}
          {/* <input
            type="file"
            id="photo"
            onChange={(event) => {
              const newOffer = { ...offer };
              newOffer.picture = event.target.files[0];
              setOffer(newOffer);
            }}
          />
        </div> */}

          {console.log("offer", offer)}

          <div className="price">
            <label htmlFor="price">Prix</label>
            <div>
              <input
                type="text"
                id="price"
                placeholder="0,00 "
                onChange={(event) => {
                  const newOffer = { ...offer };
                  newOffer.price = event.target.value;
                  setOffer(newOffer);
                }}
                value={offer.price}
              />
              <span>€</span>
            </div>
          </div>
          {data && <p className="red">{data}</p>}
          <div className="submit">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="notConnectedOffer container">
      <h2>Vous devez être connecté pour accéder à ce contenue</h2>
    </div>
  );
};
export default Publish;
