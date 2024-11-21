import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import "./App.css";
import Offer from "./pages/Offer";
import ModalSignUp from "./components/ModalSignUp";
import ModalLogin from "./components/ModalLogin";
import { useState } from "react";
import Cookies from "js-cookie";
function App() {
  const [signUp, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [connected, setConnected] = useState(
    Cookies.get("token") ? true : false
  );
  return (
    <div className={`App ${signUp || login ? "AppOn" : ""}`}>
      <Router>
        <Header
          signUp={signUp}
          setSignUp={setSignUp}
          connected={connected}
          setConnected={setConnected}
          login={login}
          setLogin={setLogin}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Offers/:id" element={<Offer />} />
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
