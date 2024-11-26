import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Payment from "./pages/Payment/Payment";
import "./App.css";

import Home from "./pages/Home/Home";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";

import Header from "./components/Header/Header";
import Offer from "./pages/Offer/Offer";
import Publish from "./pages/Publish/Publish";

function App() {
  const [search, setSearch] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [connected, setConnected] = useState(
    Cookies.get("token") ? true : false
  );

  return (
    <div className={signUp || login ? "AppOn" : ""}>
      <Router>
        <Header
          setSearch={setSearch}
          signUp={signUp}
          setSignUp={setSignUp}
          connected={connected}
          setConnected={setConnected}
          login={login}
          setLogin={setLogin}
        />
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/Offers/:id" element={<Offer setLogin={setLogin} />} />
          <Route
            path="/publish"
            element={<Publish login={login} setLogin={setLogin} />}
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
        {signUp && (
          <ModalSignUp
            setLogin={setLogin}
            setSignUp={setSignUp}
            setConnected={setConnected}
          />
        )}
        {login && (
          <ModalLogin
            setLogin={setLogin}
            setSignUp={setSignUp}
            setConnected={setConnected}
          />
        )}
      </Router>
    </div>
  );
}
export default App;
