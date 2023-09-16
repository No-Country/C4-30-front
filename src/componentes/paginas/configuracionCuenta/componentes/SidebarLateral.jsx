import React from "react";
import "../contenedores/ConfiguracionCuenta.scss";
import "antd/dist/antd.min.css";
import { Link } from "react-router-dom";
import { FiUser, FiMapPin, FiCreditCard } from "react-icons/fi";
import { useState } from "react";

function SidebarLateral({setStatus}) {

  const [estadoOrdenes, setEstado] = useState('informacionPersonal');

  const informacionPersonal = () => {
    setEstado('informacionPersonal')
    setStatus('informacionPersonal');
  };

  const ubicacionEntrega = () => {
    setEstado('ubicacionEntrega');
    setStatus('ubicacionEntrega');
  };

  const coneccionTarjetas = () => {
    setEstado('coneccionTarjetas');
    setStatus('coneccionTarjetas');
  };
  
  
  return (
    <div className="container-A">
      <div className="titleContainerLeft">
        <h1>Configuración</h1>
      </div>
      <section className="btnsContainer-Configuration">
        <button onClick={informacionPersonal} name="" id="toDo" className={(estadoOrdenes === 'informacionPersonal') ? 'clicked' : 'btnLeft-CG'} to="/Configuracion-de-Cuenta">
            <label className="iconbtn-CG">
              <FiUser className="icon-React" />
            </label>
            <aside>
              <h3>Cuenta</h3>
              <p>Información Personal</p>
            </aside>
        </button>
        <button onClick={ubicacionEntrega} name="" id="toDo" className={(estadoOrdenes === 'ubicacionEntrega') ? 'btnLeft-CG clicked ' : 'btnLeft-CG'} to="/Configuracion-de-Cuenta">
            <label className="iconbtn-CG">
              <FiMapPin className="icon-React" />
            </label>
            <aside>
              <h3>Dirección</h3>
              <p>Ubicación de entrega</p>
            </aside>
        </button>
        <button onClick={coneccionTarjetas} name="" id="toDo" className={(estadoOrdenes === 'coneccionTarjetas') ? 'btnLeft-CG clicked ' : 'btnLeft-CG'} to="/Configuracion-de-Cuenta">
            <label>
              <FiCreditCard className="icon-React" />
            </label>
            <aside>
              <h3>Método de Pago</h3>
              <p>Conección con Tarjetas</p>
            </aside>
        </button>
      </section>
    </div>
  );
}

export default SidebarLateral;
