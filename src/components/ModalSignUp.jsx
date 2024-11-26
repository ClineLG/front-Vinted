import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DropPicture from "./DropPicture";
const ModalSignUp = ({ setSignUp, setConnected, setLogin }) => {
  const [data, setData] = useState();
  const [userInfo, setUserInfo] = useState({
    newsletter: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData(null);
    try {
      const formData = new FormData();
      formData.append("username", userInfo.username);
      formData.append("email", userInfo.email);
      formData.append("password", userInfo.password);
      formData.append("newsletter", userInfo.newsletter);
      formData.append("picture", userInfo.picture);
      const response = await axios.post(
        `https://site--vinted-backend-project--dm4qbjsg7dww.code.run/user/signup`,
        formData,
        {
          "Content-Type": "multipart/form-data",
        }
      );

      Cookies.set("token", response.data.token, { expires: 30 });
      setConnected(true);
      setSignUp(false);
    } catch (error) {
      console.log(error);

      if (error.response.data.error === "Parameters missing") {
        setData("Veuillez remplir tous les champs");
      } else if (error.response.data.error === "email allready used") {
        setData("Cette adresse email est déjà enregistrée");
      } else {
        setData("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <div className="SignUp">
      <div>
        <button
          onClick={() => {
            setSignUp(false);
          }}
          className="closeForm"
        >
          ╳
        </button>
        <form onSubmit={handleSubmit}>
          <h2>S'inscrire</h2>
          <DropPicture
            str={"Ajoute un avatar en faisant glisser une image ici !"}
            setState={setUserInfo}
            state={userInfo}
          />
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              const objUser = { ...userInfo, username: event.target.value };

              setUserInfo(objUser);
            }}
          />
          {/* {submit && userInfo.username === "" && <span>username missing</span>} */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              const objUser = { ...userInfo, email: event.target.value };

              setUserInfo(objUser);
            }}
          />
          {/* {submit && userInfo.email === "" && <span>email missing</span>} */}
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              const objUser = { ...userInfo, password: event.target.value };

              setUserInfo(objUser);
            }}
          />

          {/* {submit && userInfo.password === "" && <span>password missing</span>} */}
          <div className="checkbox">
            <input
              type="checkbox"
              onChange={() => {
                const objUser = {
                  ...userInfo,
                  newsletter: !userInfo.newsletter,
                };
                setUserInfo(objUser);
              }}
            />

            <p>S'inscrire à la newsletter</p>
          </div>
          <p className="descripcheck">
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit" className="Submit">
            S'inscrire
          </button>
          {data && <p className="red">{data}</p>}
          <p
            className="link"
            onClick={() => {
              setLogin(true);
              setSignUp(false);
            }}
          >
            Déja Inscrit ? Connecte-toi !
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalSignUp;
