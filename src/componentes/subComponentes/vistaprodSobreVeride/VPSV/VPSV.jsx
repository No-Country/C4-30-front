import React from "react";
import "./estilos/VPSV.scss";
import "./estilos/InfoModal.scss";
import info from "../imagenes/info.svg";
import Swal from "sweetalert2";
import clock from "../imagenes/clock.svg";

export default function VPSV({ prod, categorias }) {
  console.log("i am in VPSV testing its prod",prod);

  let categoria;
  if (categorias) {
    categoria = categorias.find((e) => e.id === prod.category_id);
  }

  return (
    <div className="contenedorVPSV">
      <img src={prod.img} alt="imagen" />
      <h4 className={`postexto ${prod.state === "disponible" ? "hidden" : ""}`}>
        AGOTADO
      </h4>

      <div className="contenedorTexto">
        <div className="flex1">
          <div className="flex2">
            <h1>{prod.name} </h1>

            <button
              className="btnInfo"
              name=""
              onClick={() =>
                Swal.fire({
                  html: `<article class="modalDescripcion">
                    <section class="tittleInfo">
                      <h3>DESTALLES DEL PRODUCTO</h3>
                    </section>
                    <section class="imgInfo">
                      <img src=${prod.img} alt="producto" />
                    </section>

                    <section class="nameInfo">
                      <h5>${prod.name.toUpperCase()}</h5>
                    </section>

                    <section class="detailsInfo">
                      <p> <strong> Descripción: </strong> ${
                        prod.description
                      } </p>
                      <p> <strong> Categoría: </strong> ${
                        categoria && categoria.name
                      } </p>
                      <p> <strong> Tiempo de preparación: </strong> ${prod.preparation} </p>
                      <p> <strong> Estado: </strong> ${prod.state} </p>
                    </section>
                    <section class="precioInfo">
                    <h6>S/. ${prod.price}.00</h6>
                  </section>
                  </article>`,
                  allowOutsideClick: false,
                  stopKeydownPropagation: false,
                  showCloseButton: true,
                  showConfirmButton: false,
                  closeButtonAriaLabel: "cerrar alerta",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                })
              }
              type="button"
            >
              <img className="iconinfo" src={info} alt="info" />
            </button>
          </div>
        </div>

        <div className="flex2">
          <img className="iconclock" src={clock} alt="clock" />
          <h2>{prod.time_preparation}</h2>
          <h2>$ {prod.price}.00</h2>
          <div className="flex2">
          <div className="flex3">
            <img
              className="icon"
              src={categoria && categoria.image}
              alt=""
            />
            <h3>{categoria && categoria.name}</h3>
          </div>
        </div>
        </div>


      </div>
    </div>
  );
}
