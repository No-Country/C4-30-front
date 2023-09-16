import React, { useState, useEffect } from "react";
import "./HistorialCompras.scss";
import "antd/dist/antd.min.css";
import NavBarHome from "../../../subComponentes/navBar/NavBarHome";
import SidebarLateral from "../componentes/SidebarLateral";
import Footer from "../../../subComponentes/footer/Footer";
import InformacionDeCompra from "../componentes/formularios/InformacionDeCompra";
import axios from "axios";

function HistorialCompras({ user }) {
  const [state, setState] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://country-app-v3.herokuapp.com/buy/${localStorage.getItem("id")}`
      )
      .then(({ data }) => {
        setState(data);
      });
  }, []);

  return (
    <section className="flex-contenedorConfigCuenta">
      <NavBarHome user={user} />
      <div className="contenedorConfigCuenta flexBox-CG contenedorHistorialCompras">
        <SidebarLateral state={state} setState={setState} />
        <InformacionDeCompra buyData={state} />
      </div>
      <Footer />
    </section>
  );
}

export default HistorialCompras;
