import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ModalLogin = ({ setLogin, setSignUp, setConnected }) => {
  //   const navigate = useNavigate();
  const [data, setData] = useState();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData(null);
    try {
      const response = await axios.post(
        "https://site--vinted-backend-project--dm4qbjsg7dww.code.run/user/login",
        userInfo
      );
      Cookies.set("token", response.data.token, { expires: 30 });
      setConnected(true);
      setLogin(false);
    } catch (error) {
      if (
        error.response.data.error === "Wrong password" ||
        error.response.data.error === "Email address unknown"
      ) {
        setData("Mauvais mot de passe et/ou email");
      } else if (error.response.data.error === "Password needed") {
        setData("Veuillez entrer un mot de passe");
      } else if (error.response.data.error === "Email address needed") {
        setData("Veuillez entrer une adresse e-mail");
      } else {
        setData("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <div className="Login">
      <div>
        <button
          onClick={() => {
            setLogin(false);
          }}
          className="closeForm"
        >
          ╳
        </button>
        <form onSubmit={handleSubmit}>
          <h2>Se connecter</h2>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              const objUser = { ...userInfo, email: event.target.value };

              setUserInfo(objUser);
            }}
          />

          <input
            type="text"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              const objUser = { ...userInfo, password: event.target.value };

              setUserInfo(objUser);
            }}
          />

          {data && <p className="red">{data}</p>}

          <button type="submit" className="Submit">
            Se connecter
          </button>
          <p
            onClick={() => {
              setLogin(false);
              setSignUp(true);
            }}
            className="link"
          >
            Pas encore de compte ? Inscrit toi !
          </p>
        </form>
      </div>
    </div>
  );
};
export default ModalLogin;
