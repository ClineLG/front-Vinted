import "./header.css";
import logo from "/src/assets/imgs/logo-Vinted.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CiSearch } from "react-icons/ci";
const Header = ({
  signUp,
  setSearch,
  setSignUp,
  connected,
  setConnected,
  login,
  setLogin,
}) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="logo-Vinted" />
        </Link>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div className="search none">
            <CiSearch className="searchIcon" />
            <input
              type="text"
              placeholder={"Rechercher des articles"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </form>

        {connected ? (
          <button
            onClick={() => {
              Cookies.remove("token");
              setConnected(false);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <div className="headerUser">
            <button
              onClick={() => {
                setSignUp(!signUp);
                setLogin(false);
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setLogin(!login);
                setSignUp(false);
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button
          onClick={() => {
            navigate("/publish");
            if (!Cookies.get("token")) {
              setLogin(!login);
            }
          }}
          className="vendre"
        >
          Vends tes Articles !
        </button>
      </div>
    </header>
  );
};
export default Header;
