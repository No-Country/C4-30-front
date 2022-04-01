import React from "react";
import { Link } from "react-router-dom";
import "./Formularios.scss";
import Logo from "../../imagenes/Logo3-Largo.png";

function FormVerificarCuenta() {
  return (
    <section className="container">
      <div className="btnVolver">
        <Link to="/Inicio-Sesion">
          <button type="button">
            <i class="uil uil-arrow-left"></i>
          </button>
        </Link>
      </div>
      <div className="logoInicioOtros">
        <img src={Logo} alt="Veridé" />
      </div>
    </section>
  );
}

export default FormVerificarCuenta;
