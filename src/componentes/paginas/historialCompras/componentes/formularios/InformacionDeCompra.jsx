import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import "../../contenedores/HistorialCompras.scss";
import tipo from "../../../configuracionCuenta/constantes/images";
import axios from "axios";
import Moment from "react-moment";
import { useParams } from "react-router-dom";

function FormCuentaUser({ buyData }) {
  const [state, setState] = useState();
  const [buy, setBuy] = useState();
  const params = useParams();

  useEffect(() => {
    if (params.buy_id) {
      axios
        .get(`https://country-app-v3.herokuapp.com/buy/show/${params.buy_id}`)
        .then(({ data }) => {
          setBuy(data);
        });
    } else if (buyData[0]?.id) {
      axios
        .get(`https://country-app-v3.herokuapp.com/buy/show/${buyData[0].id}`)
        .then(({ data }) => {
          setBuy(data);
        });
    }
  }, [buyData, params.buy_id]);

  useEffect(() => {
    axios
      .get(
        `https://country-app-v3.herokuapp.com/user/${localStorage.getItem(
          "id"
        )}`
      )
      .then(({ data }) => {
        setState({
          ...data,
        });
      });
  }, []);

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
                  <span className="textDatos-CC">Nombres :</span> {state?.name}{" "}
                </p>
                <p>
                  <span className="textDatos-CC">Apellidos :</span>{" "}
                  {state?.last_name}
                </p>
                <p>
                  <span className="textDatos-CC">Dirección :</span>{" "}
                  {state?.direction}
                </p>
                <label className="boxNumTarjeta textDatos-CC">
                  <p>
                    <span className="textDatos-CC">Número de Tarjeta :</span>{" "}
                    {state?.card_number}
                  </p>
                  {state?.card_type && (
                    <label className="e-btn" htmlFor="radioVisa">
                      <img
                        src={`${tipo[state.card_type]}`}
                        alt="Tarjeta-Visa"
                      />
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
                  <span className="textDatos-CC">Fecha : </span>
                  <Moment format="DD-MM-YYYY" locale="es">
                    {buy?.created_at}
                  </Moment>
                </p>
                <p>
                  <span className="textDatos-CC">Hora : </span>
                  <Moment format="hh:mm" locale="es">
                    {buy?.created_at}
                  </Moment>{" "}
                  hrs
                </p>
                <div className="boxProductosDetallesCarritoCompras">
                  <table className="contenedorTablaProductos">
                    <tr>
                      <th>Productos</th>
                      <th>Unds</th>
                      <th className="precio">Precio($)</th>
                    </tr>
                    {buy?.products.list.map((item, index) => (
                      <tr key={`${index}-${item?.id}`}>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>$ {item.price * item.count}</td>
                      </tr>
                    ))}
                  </table>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="btnsContainer">
          <div className="boxPrecioTotalCompra">
            <h3>Precio Total</h3>
            <h2>$ {buy?.amount}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormCuentaUser;
