import { useState } from "react";
import logo from "../assets/imgs/logo-Vinted.svg";
import { Link } from "react-router-dom";
const Header = () => {
  const [search, setSearch] = useState("");

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
          <input
            type="text"
            placeholder="Rechercher des articles"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </form>
        {/* Link signUp et Login */}
        <div className="headerUser">
          <button>S'inscrire</button>
          <button>Se connecter</button>
        </div>

        <button>Vends tes Articles</button>
      </div>
    </header>
  );
};
export default Header;
