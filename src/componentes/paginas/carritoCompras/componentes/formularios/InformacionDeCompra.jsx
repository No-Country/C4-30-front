import React from 'react';
import Swal from 'sweetalert2';
import "antd/dist/antd.min.css";
import "../../contenedores/CarritoCompras.scss";
import tipo from "../../constantes/images";


function FormCuentaUser({user}) {

  const modalGuardarDatosUsuario = () => {
    Swal.fire({
      text: '¿Está seguro de confirmar su compra?',
      showCancelButton: true,
      confirmButtonColor: '#57a057',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: 'cerrar alerta',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Compra realizada con éxito!',
          text: 'La compra fue enviada a entrega con éxito',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const modalCancelarDatosUsuario = () => {
    Swal.fire({
      text: '¿Estás seguro de cancelar tu compra?',
      showCancelButton: true,
      confirmButtonColor: '#57a057',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: 'cerrar alerta',
    }).then((result) => {
      if (result.isConfirmed) {        
          Swal.fire({
            title: '¡Acción cancelada con éxito!',
            text: 'Sus datos volverán a la última actualización',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
      }
    });
  };

  return (
    <section className='boxPrincipalDetalleCompra'>
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
              <label >
                <p><span className="textDatos-CC">Nombres :</span> {user.name} </p>
                <p><span className="textDatos-CC">Apellidos :</span> {user.last_name}</p>
                <p><span className="textDatos-CC">Dirección :</span> {user.direction}</p>
                <label className="boxNumTarjeta textDatos-CC">
                  <p><span className="textDatos-CC">Número de Tarjeta :</span> **********5432</p>
                  <label className="e-btn" htmlFor="radioVisa">
                    <img src={tipo.visa} alt="Tarjeta" />
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
              <label >
                <p><span className="textDatos-CC">Fecha :</span> 20/02/2022 </p>
                <p><span className="textDatos-CC">Hora :</span> 15:02 hrs</p>
                <div className="boxProductosDetallesCarritoCompras">
                  <table class="contenedorTablaProductos">
                    <tr>
                      <th>Productos</th>
                      <th>Unds</th>
                      <th className='precio'>Precio($)</th>
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
              <button className="btnCancelar" name="" onClick={() => modalCancelarDatosUsuario()} >Cancelar</button>
              <button className="btnGuardar" name="" onClick={() => modalGuardarDatosUsuario()}>Comprar</button>
            </div>
          </div>
        </div>
    </section>
  )
}

export default FormCuentaUser