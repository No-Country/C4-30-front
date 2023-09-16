import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "antd/dist/antd.min.css";
import "../contenedores/CarritoCompras.scss";
import tipo from "../../configuracionCuenta/constantes/images";
// import axios from "axios";

function FormCuentaUser({ state, user, setState }) {
  const [productos, setProductos] = useState([]);

  let precio;
  if (productos.length !== 0) {
    precio = productos
      .map((p) => p.products.price * p.products.count)
      .reduce((prev, curr) => prev + curr);
  }

  const navigate = useNavigate();

  const modalGuardarDatosUsuario = () => {
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

        // axios
        //   .post(
        //     `https://country-app-v3.herokuapp.com/buy/${localStorage.getItem(
        //       "id"
        //     )}`,
        //     {
        //       ...state,
        //       amount: precio,
        //     }
        //   )
        //   .then(({ data }) => {
        //     navigate(`/historial-de-compras/${data.id}`);
        //   });

        // axios.put(
        //   `https://country-app-v3.herokuapp.com/orders/clear/$${localStorage.getItem(
        //     "id"
        //   )}`
        // );
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

  //Fecha para "Detalles del Pedido"
  const date = new Date();
  const [day, month, year, hour, minute] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
    date.getHours(),
    date.getMinutes()
  ];

  //Get de los productos del carrito actual
  useEffect(() => {
    // axios
    //   .get(
    //     `https://country-app-v3.herokuapp.com/orders/${localStorage.getItem(
    //       "id"
    //     )}`
    //   )
    //   .then(({ data }) => {
    //     setProductos(data);
    //   });
  }, [state]);

  useEffect(() => {
    setState({ ...state, amount: precio });
  }, [precio, productos]);

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
                  <span className="textDatos-CC">Apellidos :</span>
                  {user.last_name}
                </p>
                <p>
                  <span className="textDatos-CC">Dirección :</span>{" "}
                  {user.direction}
                </p>
                <label className="boxNumTarjeta textDatos-CC">
                  <p>
                    <span className="textDatos-CC">Número de Tarjeta :</span>
                    {user.card_number}
                  </p>
                  {user.card_type && (
                    <label className="e-btn" htmlFor="radioVisa">
                      <img src={`${tipo[user.card_type]}`} alt="Tarjeta" />
                    </label>
                  )}
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
                  <span className="textDatos-CC">Fecha :</span> {day}/{month}/
                  {year}
                </p>
                <p>
                  <span className="textDatos-CC">Hora :</span> {hour}:
                  {minute < 10 ? "0" + minute : minute} hs
                </p>
                <div className="boxProductosDetallesCarritoCompras">
                  <table className="contenedorTablaProductos">
                    <tbody>
                      <tr>
                        <th>Productos</th>
                        <th>Unidades</th>
                        <th className="precio">Precio($)</th>
                      </tr>
                      {productos &&
                        productos.map((item, index) => (
                          <tr key={`${index}-${item?.id}`}>
                            <td>{item.products.name}</td>
                            <td>{item.products.count}</td>
                            <td>
                              {item.products.price * item.products.count}.00
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="btnsContainer">
          <div className="boxPrecioTotalCompra">
            <h3>Precio Total</h3>
            <h2>$ {precio ? precio + ".00" : "0.00"}</h2>
          </div>
          <div className="btnsCarritoCompras">
            <button
              className="btnCancelar"
              onClick={() => modalCancelarDatosUsuario()}
              name=""
            >
              Cancelar
            </button>
            <button
              className="btnGuardar"
              onClick={() => modalGuardarDatosUsuario()}
              name=""
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
