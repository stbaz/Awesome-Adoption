import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home/Home";
import NavigationBar from "./components/layout/NavigationBar";
import axios from "axios";
import "./App.css";
import Pets from "./components/pets/Pets";
import PetType from "./components/pets/PetType";
import PetInfo from "./components/pets/PetInfo";
import Footer from "./components/layout/Footer";
import About from "./components/about/About";

function fetchFunction() {
  axios
    .post(
      "https://api.petfinder.com/v2/oauth2/token",
      `grant_type=client_credentials&client_id=${process.env.REACT_APP_PETFINDER_KEY}`
    )
    .then((response) => {
      localStorage.setItem("token", response.data.access_token);
    })
    .catch((error) => {
      console.log(error);
    });
}

if (!localStorage.getItem("token")) {
  fetchFunction();
}

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      fetchFunction();
    }
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <Fragment>
      <Router>
        <NavigationBar token={token} />
        <Container className="pawhub">
          <Switch>
            {" "}
            <Route path="/animal/:id">
              {token && <PetInfo token={token} />}
            </Route>
            <Route path="/pets/:type">
              {token && <PetType token={token} />}
            </Route>
            <Route path="/pets">{token && <Pets token={token} />}</Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </Router>
    </Fragment>
  );
}
