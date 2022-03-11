import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Inicio from "./components/Inicio"
import "./App.css";
import axios from "axios";

function App() {
  useEffect(()=>{
    login()
  })
  const login = async () => {
    const user = {
      username: "0922390042",
      password: "cecm56",
    };
    await axios
      .post("https://app.alesdap.com/api/V1/acceso/auth/login", user)
      .then((response) => {
        const token = response.data.authorization
        sessionStorage.setItem("token", token);
      });
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
