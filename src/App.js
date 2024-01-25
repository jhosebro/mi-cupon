import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CuponGenerator from "./components/CuponGenerator.jsx";
import NavigationBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import CuponList from "./components/CuponList.jsx";
import NotFound from "./components/NotFound.jsx"; // Asegúrate de tener este componente

function AppRouter() {
  const [cupones, setCupones] = useState(() => {
    const cuponesGuardados = localStorage.getItem("cupones");
    try {
      const parsedCupones = JSON.parse(cuponesGuardados);
      return Array.isArray(parsedCupones) ? parsedCupones : [];
    } catch (error) {
      console.error("Error al leer cupones de localStorage:", error);
      return [];
    }
  });

  const [filtro, setFiltro] = useState("todos");

  const cambiarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  useEffect(() => {
    localStorage.setItem("cupones", JSON.stringify(cupones));
  }, [cupones]);

  const agregarCupon = (cupon) => {
    setCupones([...cupones, cupon]);
  };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/generator"
          element={<CuponGenerator agregarCupon={agregarCupon} />}
        />
        <Route
          path="/list"
          element={
            <CuponList
              cupones={cupones}
              setCupones={setCupones}
              filtro={filtro}
              cambiarFiltro={cambiarFiltro}
            />
          }
        />
        <Route path="*" element={<NotFound />} /> {/* Ruta para manejar URLs no encontradas */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
