import React, { useCallback, useMemo, useState, useRef } from "react";
import * as XLSX from "xlsx";

const FiltroSelect = ({ filtro, cambiarFiltro }) => (
  <select
    id="filtro"
    className="form-select m-2"
    value={filtro}
    onChange={(e) => cambiarFiltro(e.target.value)}
  >
    <option value="todos">Todos</option>
    <option value="validos">Válidos</option>
    <option value="invalidos">Inválidos</option>
  </select>
);

const CuponRow = ({ cupon, onCambiarEstado, onEliminarCupon }) => (
  <tr>
    <td>{cupon.codigo}</td>
    <td>{cupon.descuento}</td>
    <td>{cupon.estado}</td>
    <td>{cupon.fechaCreacion}</td>
    <td>{cupon.validez}</td>
    <td>
      <button
        className={`btn ${
          cupon.estado === "válido" ? "btn-warning" : "btn-success"
        } me-2`}
        onClick={() => onCambiarEstado(cupon.codigo)}
      >
        {cupon.estado === "válido" ? "Invalidar" : "Validar"}
      </button>
      <button
        className="btn btn-danger"
        onClick={() => onEliminarCupon(cupon.codigo)}
      >
        Eliminar
      </button>
    </td>
  </tr>
);

const CuponList = ({ cupones, setCupones, filtro, cambiarFiltro }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const cuponesPorPagina = 10;

  const fileInputRef = useRef();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      // Transformar los datos a su formato de cupones y actualizar el estado
      const cuponesImportados = data.slice(1).map((row) => ({
        codigo: row[2],
        descuento: row[0],
        estado: row[3],
        validez: row[1],
        fechaCreacion: row[4],
      }));
      setCupones(cuponesImportados);
    };
    reader.readAsBinaryString(file);
  };

  const cuponesFiltrados = useMemo(() => {
    const filtradosPorEstado = Array.isArray(cupones)
      ? filtro === "todos"
        ? cupones
        : cupones.filter(
            (cupon) =>
              cupon.estado === (filtro === "validos" ? "válido" : "inválido")
          )
      : [];

    if (terminoBusqueda) {
      return filtradosPorEstado.filter((cupon) =>
        cupon.codigo.toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    }

    return filtradosPorEstado;
  }, [cupones, filtro, terminoBusqueda]);

  const totalPaginas = Math.ceil(cuponesFiltrados.length / cuponesPorPagina);
  const indiceInicio = (paginaActual - 1) * cuponesPorPagina;
  const cuponesPaginados = cuponesFiltrados.slice(
    indiceInicio,
    indiceInicio + cuponesPorPagina
  );

  const handleCambiarEstado = useCallback(
    (codigoCupon) => {
      setCupones(
        cupones.map((cupon) => {
          if (cupon.codigo === codigoCupon) {
            return {
              ...cupon,
              estado: cupon.estado === "válido" ? "inválido" : "válido",
            };
          }
          return cupon;
        })
      );
    },
    [cupones, setCupones]
  );

  const handleEliminarCupon = useCallback(
    (codigoCupon) => {
      setCupones(cupones.filter((cupon) => cupon.codigo !== codigoCupon));
    },
    [cupones, setCupones]
  );

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(cuponesFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cupones");
    XLSX.writeFile(wb, "lista_cupones.xlsx");
  };

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <div className="cupon-list container">
      <div className="row">
        <h2 className="col m-2">Lista de Cupones</h2>
        <div className="col d-flex justify-content-end">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="form-control"
            style={{ display: "none" }}
          />
          <button
            className="btn btn-cafe m-2"
            onClick={() => fileInputRef.current.click()}
          >
            Importar desde Excel
          </button>
          <button onClick={exportarExcel} className="btn btn-cafe m-2">
            Exportar a Excel
          </button>
        </div>
      </div>
      <input
        type="text"
        className="form-control m-2"
        placeholder="Buscar cupón por código..."
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
      />
      <FiltroSelect filtro={filtro} cambiarFiltro={cambiarFiltro} />
      <table className="table m-2">
        <thead>
          <tr>
            <th>Código</th>
            <th>Descuento</th>
            <th>Estado</th>
            <th>Fecha de creación</th>
            <th>Expiración</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuponesPaginados.map((cupon, index) => (
            <CuponRow
              key={index}
              cupon={cupon}
              onCambiarEstado={handleCambiarEstado}
              onEliminarCupon={handleEliminarCupon}
            />
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <div className="paginacion">
          {[...Array(totalPaginas).keys()].map((numero) => (
            <button
              key={numero}
              onClick={() => cambiarPagina(numero + 1)}
              className={`btn m-1 ${
                numero + 1 === paginaActual ? "btn-cafe" : "btn-secondary"
              }`}
            >
              {numero + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuponList;
