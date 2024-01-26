import React from "react";
import fondo from "../assets/fondo2.jpg";

const Home = () => {
  return (
    <img
      src={fondo}
      alt="Casa y Salon de eventos Valle Encantado"
      className="img-fluid"
      style={{ maxWidth: "100%" }}
    />
  );
};

export default Home;