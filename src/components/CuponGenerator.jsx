import React, { useState } from "react";

const CuponGenerator = ({ agregarCupon }) => {
  const [cuponGenerado, setCuponGenerado] = useState(null);
  const [cuponData, setCuponData] = useState({
    descuento: 0,
    validez: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCuponData({
      ...cuponData,
      [name]: value,
    });
  };

  const generarCupon = () => {
    // Validación de datos
    if (
      cuponData.descuento <= 0 ||
      cuponData.descuento > 100 ||
      new Date(cuponData.validez) <= new Date()
    ) {
      alert(
        "Por favor, ingresa un descuento válido y una fecha de validez futura."
      );
      return;
    }

    const codigoCupon = generarCodigoUnico();
    const cupon = {
      ...cuponData,
      codigo: codigoCupon,
      estado: "válido",
    };

    agregarCupon(cupon);
    setCuponData({ descuento: 0, validez: "" });
    setCuponGenerado(cupon);
  };

  const generarCodigoUnico = () => {
    return Math.random().toString(36).substring(7);
  };

  return (
    <div className="cupon-generator">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center">Generador de Cupones</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="descuento" className="form-label">
                Descuento (%):
              </label>
              <input
                type="number"
                className="form-control"
                id="descuento"
                name="descuento"
                value={cuponData.descuento}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="validez" className="form-label">
                Validez (Fecha):
              </label>
              <input
                type="date"
                className="form-control"
                id="validez"
                name="validez"
                value={cuponData.validez}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-cafe"
                onClick={generarCupon}
              >
                Generar Cupón
              </button>
            </div>
          </form>
          {cuponGenerado && (
            <div className="alert alert-success mt-4">
              <h3>Cupón Generado Exitosamente!</h3>
              <p>
                <strong>Código:</strong> {cuponGenerado.codigo}
              </p>
              <p>
                <strong>Descuento:</strong> {cuponGenerado.descuento}%
              </p>
              <p>
                <strong>Validez:</strong> {cuponGenerado.validez}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuponGenerator;
