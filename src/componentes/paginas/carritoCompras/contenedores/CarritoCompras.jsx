import { React, useEffect, useState } from "react";
import "./CarritoCompras.scss";
import "antd/dist/antd.min.css";
import NavBarHome from "../../../subComponentes/navBar/NavBarHome";
import SidebarLateral from "../componentes/SidebarLateral";
import Footer from "../../../subComponentes/footer/Footer";
import InformacionDeCompra from "../componentes/InformacionDeCompra";
import axios from "axios";

function CarritoCompras({ user }) {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    amount: 0,
    state: "Entregado",
    products: { list: [...data] },
  });

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.pathname = "/inicio-sesion";
    }
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://country-app-v3.herokuapp.com/orders/${localStorage.getItem(
          "id"
        )}`
      )
      .then(({ data }) => {
        setData(data);
        const new_data = data.map((item) => item.products);
        setState({ ...state, products: { list: [...new_data] } });
      });
  }, []);


  return (
    <section className="flex-contenedorConfigCuenta">
      <NavBarHome user={user} />
      <div className="contenedorConfigCuenta flexBox-CG contenedorCarritoCompras">
        <SidebarLateral setState={setState} state={state} />
        <InformacionDeCompra state={state} user={user} setState={setState} />
      </div>
      <Footer />
    </section>
  );
}

export default CarritoCompras;
