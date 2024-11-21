import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const ModalLogin = ({ setLogin, setSignUp, setConnected }) => {
  //   const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userInfo.email && userInfo.password && submit) {
          const response = await axios.post(
            "https://site--vinted-backend-project--dm4qbjsg7dww.code.run/user/login",
            userInfo
          );

          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setData(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [!submit]);

  if (!isLoading && data.token) {
    Cookies.set("token", data.token, { expires: 30 });
    setConnected(true);
    setLogin(false);
  }

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
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
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

          {!isLoading && data.error && (
            <div className={`hide ${data.error ? "wrong" : ""}`}>
              <p>
                {data.error === "Wrong password" ||
                  (data.error === "Email address unknown" &&
                    "Mauvais mot de passe et/ou email")}
              </p>
            </div>
          )}
          <button
            type="submit"
            onClick={() => {
              setSubmit(!submit);
            }}
            className="Submit"
          >
            S'inscrire
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
