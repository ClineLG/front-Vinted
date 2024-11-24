// import { useState } from "react";
import logo from "../assets/imgs/logo-Vinted.svg";
import { Link } from "react-router-dom";
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
          <div className="search">
            <CiSearch className="searchIcon" />
            <input
              type="text"
              placeholder={"Rechercher des articles"}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />{" "}
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
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setLogin(!login);
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button>Vends tes Articles</button>
      </div>
    </header>
  );
};
export default Header;
