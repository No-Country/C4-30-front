import React, { useState, useEffect } from "react";
import { Switch } from "antd";
import Swal from 'sweetalert2';
import tipo from "../../constantes/images";
import "antd/dist/antd.min.css";
import "../../contenedores/ConfiguracionCuenta.scss";
import axios from "axios";

function FormMetodoPagoUser() {
  const [state, setState] = useState({ card_number: "", card_type: "", cvv: "", expiration: "" })

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  
  //only numbers en "Card Number"
  const handleCardNumber = (event) => {
    //console.log(event);
    
    //filter only numbers
    let numb = event.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only numbers
    event.target.value = numb;
    
    //update "state" with only numbers
    setState({ ...state, card_number: event.target.value });
  }
  
  
  //only numbers en "Expiration"
  const handleExpiration = (event) => {
    //console.log(event);
    
    //filter only numbers
    let numb = event.target.value.replace(/[^0-9/]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only numbers
    event.target.value = numb;
    
    if (event.target.value.length === 2 && event.target.value[1] !== "/") {
      event.target.value = event.target.value + "/";
    }
    
    else if (event.target.value.length === 2 &&event.target.value[1] === "/") {
      event.target.value = event.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    }
    
    //update "state" with only numbers
    setState({ ...state, expiration: event.target.value });
  }
  
  
  //only numbers en "CVV"
  const handleCVV = (event) => {
    //console.log(event);
    
    //filter only numbers
    let numb = event.target.value.replace(/[^0-9/]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only numbers
    event.target.value = numb;
    
    //update "state" with only numbers
    setState({ ...state, cvv: event.target.value });
  }
  
  
  const modalGuardarDatosUsuario = () => {
    
    // if every field is complete
    let inputs = state.card_type && state.card_number && state.cvv && state.expiration;
    
    if (!inputs) {
      Swal.fire({
        title: '¡Data sin Actualizar!',
        text: 'Completar los campos vacíos',
        icon: 'warning',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    
    else if (inputs) {
      Swal.fire({
        text: '¿Está seguro que desea actualizar sus datos?',
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
        
          axios.put(`https://country-app-v3.herokuapp.com/user/${localStorage.getItem("id")}`, { user: { ...state } })
        
          Swal.fire({
            title: '¡Datos Actualizados con éxito!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
  /*         if (camposVacios() !== false) {
            Swal.fire({
              title: '¡Datos Actualizados con éxito!',
              text: 'El pedido fue enviado a cocina con éxito',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          } */ /* else if (camposVacios() === false) {
            Swal.fire({
              title: '¡Data sin Actualizar!',
              text: 'No se pudo completar la actualización por falta de datos',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
            });
          } */
        }
      });
    }
    
    

    
  };

  const modalCancelarDatosUsuario = () => {
    Swal.fire({
      text: '¿Está seguro de cancelar la actualización de sus datos?',
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

  const modalCerrarSesionUsuario = () => {
    Swal.fire({
      text: '¿Está seguro que desea cerrar sesión?',
      showCancelButton: true,
      confirmButtonColor: '#57a057',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: 'cerrar alerta',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¡La Sesión fue finalizada con éxito!",
          text: "Vuelva pronto a Veridé",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("user");
        setTimeout(() => {
          window.location.pathname = "/";
        }, 500);
      }
    });
  };

  const getDataUser = () => {
    axios.get(`https://country-app-v3.herokuapp.com/user/${localStorage.getItem("id")}`).then(({ data }) => {
      setState({
        card_type: data.card_type,
        card_number: data.card_number,
        cvv: data.cvv,
        expiration: data.expiration
      })
    })
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <div className="container-B">
      <div className="titleContainer">
        <h1>Método de Pago</h1>
      </div>

      <div className="subtitleContainer">
        <h3>Conección con Tarjetas</h3>
      </div>

      <div>
      <section className="tipoTarjetas">
              <span className="textInput">Tipo de Tarjeta</span>
              <section className="e-btn-group">
                <div className="flex-TP">
                  <div>
                    <input
                      type="radio"
                      id="radioVisa"
                      name="align"
                      value="visa"
                      checked={state.card_type === "visa"}
                      onChange={() => setState({ ...state, card_type: "visa" }) }
                    />
                    <label className="e-btn" htmlFor="radioVisa">
                      <img src={tipo.visa} alt="Tarjeta" />
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="radioDiners"
                      name="align"
                      value="diners"
                      checked={state.card_type === "diners"}
                      onChange={() => setState({ ...state, card_type: "diners" }) }
                    />
                    <label className="e-btn" htmlFor="radioDiners">
                      <img src={tipo.diners} alt="Tarjeta" />
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="radioMaster"
                      name="align"
                      value="right"
                      checked={state.card_type === "master"}
                      onChange={() => setState({ ...state, card_type: "master" }) }
                    />
                    <label className="e-btn" htmlFor="radioMaster">
                      <img src={tipo.master} alt="Tarjeta" />
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="radioAmerican"
                      name="align"
                      value="american"
                      checked={state.card_type === "american"}
                      onChange={() => setState({ ...state, card_type: "american" }) }
                    />
                    <label className="e-btn" htmlFor="radioAmerican">
                      <img src={tipo.american} alt="Tarjeta" />
                    </label>
                  </div>
                </div>
              </section>
            </section>
        <div className="flex-Inputs inputsContainer">
          <div>
            <label>
              <span className="textInput">N° de la tarjeta</span>
              <input
                className="inputCG"
                required={true}
                type="text"
                defaultValue={state.card_number}
                onChange={(event) => handleCardNumber(event) }
                placeholder="Ingrese n° de la tarjeta*"
              />
            </label>

          </div>
          <div>
          <section className="flex-CG--MP">
              <label className="label-CG-MP">
                <span className="textInput">Expiración</span>
                <input
                  className="inputCG"
                  required={true}
                  type="email"
                  defaultValue={state.expiration}
                  maxLength="5"
                  onChange={(event) => handleExpiration(event) }
                  placeholder="Mes/Año*"
                />
              </label>
              <label className="label-CG-MP">
                <span className="textInput">CVV</span>
                <input
                  className="inputCG"
                  required={true}
                  type="email"
                  defaultValue={state.cvv}
                  maxLength="3"
                  onChange={(event) => handleCVV(event) }
                  placeholder="CVV*"
                />
              </label>
            </section>
          </div>
        </div>

        <div className="btnsOptionalContainer">
          <div>
            <label>
              <span className="textInput">
                ¿Desea incluir el 10% de propina?
              </span>
              <Switch defaultChecked onChange={onChange} />
            </label>
            <label>
              <span className="textInput">
                ¿Desea brindar propina en efectivo?
              </span>
              <Switch defaultChecked onChange={onChange} />
            </label>
          </div>
        </div>
        <div className="btnsContainer">
        <button className="btnCerrarSesion" name="" onClick={() => modalCerrarSesionUsuario()}>Cerrar Sesión</button>
            <div>
              <button className="btnCancelar" name="" onClick={() => modalCancelarDatosUsuario()} >Cancelar</button>
              <button className="btnGuardar" name="" onClick={() => modalGuardarDatosUsuario()}>Guardar</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default FormMetodoPagoUser;
