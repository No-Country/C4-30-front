import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import "antd/dist/antd.css";
import "../contenedores/CarritoCompras.scss";
import tipo from "../constantes/images";
import axios from "axios";

function FormCuentaUser({ state, props, user }) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/historial-de-compras/${localStorage.getItem("id")}`);
  };
  const modalGuardarDatosUsuario = () => {
    axios.post(`https://country-app-v3.herokuapp.com/buy/${localStorage.getItem("id")}`, {
      ...state,
    });

    Swal.fire({
      text: "¿Está seguro de confirmar su compra?",
      showCancelButton: true,
      confirmButtonColor: "#57a057",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: "cerrar alerta",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Compra realizada con éxito!",
          text: "Su compra estará próxima a entrega",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClick(props);
      }
    });
  };

  const modalCancelarDatosUsuario = () => {
    Swal.fire({
      text: "¿Estás seguro de cancelar tu compra?",
      showCancelButton: true,
      confirmButtonColor: "#57a057",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: "cerrar alerta",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡Acción cancelada con éxito!",
          text: "Sus datos volverán a la última actualización",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <section className="boxPrincipalDetalleCompra">
      <div className="container-B container-B-CarritoCompra">
        <div className="titleContainer">
          <h1>Información de la Compra</h1>
        </div>

        <div className="subtitleContainer">
          <h3>Detalles del Cliente</h3>
        </div>

        <div>
          <div className="flex-Inputs inputsContainer container-detallesProducto-CC">
            <div>
              <label>
                <p>
                  <span className="textDatos-CC">Nombres :</span> {user.name}
                </p>
                <p>
                  <span className="textDatos-CC">Apellidos :</span>{user.last_name}
                </p>
                <p>
                  <span className="textDatos-CC">Dirección :</span> {user.direction}
                </p>
                <label className="boxNumTarjeta textDatos-CC">
                  <p>
                    <span className="textDatos-CC">Número de Tarjeta :</span>{user.card_number}
                  </p>
                  <label className="e-btn" htmlFor="radioVisa">
                    <img src={tipo.visa} alt="Tarjeta-Visa" />
                  </label>
                </label>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="container-B container-B-CarritoCompra">
        <div className="subtitleContainer">
          <h3>Detalles del Pedido</h3>
        </div>

        <div>
          <div className="flex-Inputs inputsContainer container-detallesProducto-CC container-parte-B">
            <div>
              <label>
                <p>
                  <span className="textDatos-CC">Fecha :</span> 20/02/2022
                </p>
                <p>
                  <span className="textDatos-CC">Hora :</span> 15:02 hrs
                </p>
                <div className="boxProductosDetallesCarritoCompras">
                  <table className="contenedorTablaProductos">
                    <tr>
                      <th>Productos</th>
                      <th>Unds</th>
                      <th className="precio">Precio($)</th>
                    </tr>
                    <tr>
                      <td>Item 1</td>
                      <td>4</td>
                      <td>15.80</td>
                    </tr>
                    <tr>
                      <td>Item 1</td>
                      <td>4</td>
                      <td>15.80</td>
                    </tr>
                    <tr>
                      <td>Item 1</td>
                      <td>4</td>
                      <td>15.80</td>
                    </tr>
                  </table>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="btnsContainer">
          <div className="boxPrecioTotalCompra">
            <h3>Precio Total</h3>
            <h2>$16.80 </h2>
          </div>
          <div className="btnsCarritoCompras">
            <button
              className="btnCancelar"
              onClick={() => modalCancelarDatosUsuario()}
            >
              Cancelar
            </button>
            <button
              className="btnGuardar"
              onClick={() => modalGuardarDatosUsuario()}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormCuentaUser;