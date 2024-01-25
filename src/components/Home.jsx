import React from "react";
import fondo from "../assets/fondo.jpg";

const Home = () => {
  return (
    <img
      src={fondo}
      alt="fondo san martin de loba tours fundacion"
      className="img-fluid"
      style={{ maxWidth: "100%" }}
    />
  );
};

export default Home;