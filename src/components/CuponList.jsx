import React from "react";
import * as XLSX from 'xlsx';

const CuponList = ({ cupones, setCupones, filtro, cambiarFiltro }) => {
  const handleFiltroChange = (e) => {
    cambiarFiltro(e.target.value);
  };

  const cuponesFiltrados = React.useMemo(() => {
    if (!Array.isArray(cupones)) {
      return [];
    }

    return filtro === "todos"
      ? cupones
      : cupones.filter((cupon) => {
          return filtro === "validos"
            ? cupon.estado === "válido"
            : cupon.estado === "inválido";
        });
  }, [cupones, filtro]);

  const handleCambiarEstado = (codigoCupon) => {
    const cuponesActualizados = cupones.map((cupon) => {
      if (cupon.codigo === codigoCupon) {
        return {
          ...cupon,
          estado: cupon.estado === "válido" ? "inválido" : "válido",
        };
      }
      return cupon;
    });
    setCupones(cuponesActualizados);
  };

  const handleEliminarCupon = (codigoCupon) => {
    const cuponesActualizados = cupones.filter((cupon) => cupon.codigo !== codigoCupon);
    setCupones(cuponesActualizados);
  };

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cuponesFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cupones");
    XLSX.writeFile(wb, "lista_cupones.xlsx");
  };

  return (
    <div className="cupon-list">
      <h2 className="m-2">Lista de Cupones</h2>
      <label className="m-2" htmlFor="filtro">Filtrar por Estado:</label>
      <select
        id="filtro"
        className="form-select m-2"
        value={filtro}
        onChange={handleFiltroChange}
      >
        <option value="todos">Todos</option>
        <option value="validos">Válidos</option>
        <option value="invalidos">Inválidos</option>
      </select>
      <button onClick={exportarExcel} className="btn btn-primary m-2">Exportar a Excel</button>
      <table className="table m-2">
        <thead className="m-2">
          <tr>
            <th>Código</th>
            <th>Estado</th>
            <th>Expiración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="m-2">
          {cuponesFiltrados.map((cupon, index) => (
            <tr key={index}>
              <td>{cupon.codigo}</td>
              <td>{cupon.estado}</td>
              <td>{cupon.validez}</td>
              <td>
                {cupon.estado === "válido" ? (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleCambiarEstado(cupon.codigo)}
                  >
                    Invalidar
                  </button>
                ) : (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleCambiarEstado(cupon.codigo)}
                  >
                    Validar
                  </button>
                )}
                <button
                  className="btn btn-danger"
                  onClick={() => handleEliminarCupon(cupon.codigo)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuponList;
