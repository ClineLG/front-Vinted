import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import "./App.css";
import Offers from "./pages/Offer";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Offer/:id" element={<Offers />} />
      </Routes>
    </Router>
  );
}
export default App;
