import { React, useState, useEffect } from "react";
import "./ConfiguracionCuenta.scss";
import "antd/dist/antd.min.css";
import SidebarLateral from "../componentes/SidebarLateral";
import Footer from "../../../subComponentes/footer/Footer";

import FormCuentaUser from "../componentes/formularios/FormCuentaUser";
import FormDireccionUser from "../componentes/formularios/FormDireccionUser";
import FormMetodoPagoUser from "../componentes/formularios/FormMetodoPagoUser";
import NavBarHome from "../../../subComponentes/navBar/NavBarHome";

function ConfiguracionCuenta({user}) {
  const [status, setStatus] = useState("informacionPersonal");
  let renderizado;

  if (status === "ubicacionEntrega") {
    renderizado = <FormDireccionUser />;
  } else if (status === "coneccionTarjetas") {
    renderizado = <FormMetodoPagoUser />;
  } else {
    renderizado = <FormCuentaUser />;
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      window.location.pathname = "/inicio-sesion";
    }
  }, []);

  return (
    <section className="flex-contenedorConfigCuenta">
      <NavBarHome user={user} />
      <div className="contenedorConfigCuenta flexBox-CG">
        <SidebarLateral setStatus={setStatus} />
        {renderizado}
      </div>
      <Footer />
    </section>
  );
}

export default ConfiguracionCuenta;
