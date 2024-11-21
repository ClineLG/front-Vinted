import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ModalSignUp = ({ setSignUp, setConnected, setLogin }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    newsletter: false,
    username: "",
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.email && userInfo.username && userInfo.password) {
          const response = await axios.post(
            "https://site--vinted-backend-project--dm4qbjsg7dww.code.run/user/signup",
            userInfo
          );
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setData(error.response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [!submit]);
  if (!isLoading && data.token) {
    Cookies.set("token", data.token, { expires: 30 });
    setConnected(true);
    setSignUp(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userInfo);  //
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
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              const objUser = { ...userInfo, username: event.target.value };

              setUserInfo(objUser);
            }}
          />{" "}
          {submit && userInfo.username === "" && <span>username missing</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              const objUser = { ...userInfo, email: event.target.value };

              setUserInfo(objUser);
            }}
          />
          {submit && userInfo.email === "" && <span>email missing</span>}
          <input
            type="text"
            name="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              const objUser = { ...userInfo, password: event.target.value };

              setUserInfo(objUser);
            }}
          />
          {submit && userInfo.password === "" && <span>password missing</span>}
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
          <button
            type="submit"
            onClick={() => {
              setSubmit(!submit);
            }}
            className="Submit"
          >
            S'inscrire
          </button>
          {!isLoading && data.error && (
            <div className={`hide ${data.error ? "wrong" : ""}`}>
              {data.error === "email allready used" && (
                <p>Email déjà utilisé</p>
              )}
            </div>
          )}
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

        {/* {!isLoading && !data.token && console.log(data)} */}
        {/* 
      !isLoading && !data.token && setparamMiss(true);
      //   console.log(data);
     */}
      </div>
    </div>
  );
};

export default ModalSignUp;
