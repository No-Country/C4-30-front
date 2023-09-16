import React from "react";
import "../contenedores/HistorialCompras.scss";
import "antd/dist/antd.min.css";
import Vistaprodcarrito from "../../../subComponentes/vistaprodhistorial/Vistaprodhistorial";

function SidebarLateral({ state, setState }) {
  return (
    <div className="container-A-carritoCompras">
      <div className="titleContainerLeft">
        <h1>Historial de Compras ({state.length})</h1>
      </div>
      <section className="btnsContainer-Configuration">
        <button
          id="toDo"
          className=" boxBtnCarritoCompras"
          to="/Configuracion-de-Cuenta"
          name=""
        >
          <Vistaprodcarrito state={state} setState={setState} />
        </button>
      </section>
    </div>
  );
}

export default SidebarLateral;
