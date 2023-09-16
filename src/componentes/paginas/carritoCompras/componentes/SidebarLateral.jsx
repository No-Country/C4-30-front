import React, { useState } from "react";
import "../contenedores/CarritoCompras.scss";
import "antd/dist/antd.min.css";
import Vistaprodcarrito from "../../../subComponentes/vistaprodcarrito/Vistaprodcarrito";
import axios from "axios";

function SidebarLateral({ setState , state}) {
  const [listOrders, setListOrders] = useState([]);

  const clearData = () => {
    axios
      .put(
        `https://country-app-v3.herokuapp.com/orders/clear/$${localStorage.getItem("id")}`,
        { list_ids: listOrders }
      )
      .then(() => setListOrders([]));
  };

  return (
    <div className="container-A-carritoCompras">
      <div className="titleContainerLeft">
        <h1>Carrito de Compra</h1>
      </div>
      <section className="btnsContainer-Configuration">
        <button
          id="toDo"
          className=" boxBtnCarritoCompras"
          to="/Configuracion-de-Cuenta"
          name=""
        >
          <Vistaprodcarrito
            listOrders={listOrders}
            setListOrders={setListOrders}
            setState={setState}
            state={state}
          />
        </button>
        <div className=" btnsContainerCarritoCompras">
          <div>
            <button
              className="btnCerrarSesion btnLimpiarCarrito"
              onClick={clearData}
              name=""
            >
              Limpiar Carrito
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SidebarLateral;
