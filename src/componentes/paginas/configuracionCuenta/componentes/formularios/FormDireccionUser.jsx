import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import Swal from 'sweetalert2';
import "antd/dist/antd.min.css";
import "../../contenedores/ConfiguracionCuenta.scss";
import axios from "axios"

function FormDireccionUser() {
  const [state, setState] = useState({ district: "", direction: "", house_number: "", reference_house: "" })

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  //only letters en "Distrito"
  const handleDistrito = (event) => {
    //console.log(event);
    
    //filter only letters
    let letters = event.target.value.replace(/[^A-Za-z \t\r\n\f]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only letters
    event.target.value = letters;
    
    //update "state" with only letters
    setState({ ...state, district: event.target.value });
  }
  
  
  const modalGuardarDatosUsuario = () => {
  
    // if every field is complete
    let inputs = state.district && state.direction && state.house_number && state.reference_house;
    
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
        district: data.district,
        direction: data.direction,
        house_number: data.house_number,
        reference_house: data.reference_house
      })
    })
  }

  useEffect(() => {
    getDataUser()
  }, [])

  return (
    <div className="container-B">
      <div className="titleContainer">
        <h1>Dirección</h1>
      </div>

      <div className="subtitleContainer">
        <h3>Ubicación de entrega</h3>
      </div>

      <div>
        <div className="flex-Inputs inputsContainer">
          <div>
            <label>
              <span className="textInput">Distrito </span>
              <input
                className="inputCG"
                required={true}
                type="text"
                defaultValue={state.district}
                onChange={(event) => handleDistrito(event)}
                placeholder="Ingresa tu distrito*"
              />
            </label>
            <label>
              <span className="textInput">N° Casa/Dpto</span>
              <input
                className="inputCG"
                required={true}
                type="text"
                defaultValue={state.house_number}
                onChange={(event) => setState({ ...state, house_number: event.target.value })}
                placeholder="Ingresa tu n° de casa o dpto.*"
              />
            </label>
          </div>
          <div>
            <label>
              <span className="textInput">Dirección</span>
              <input
                className="inputCG"
                required={true}
                type="text"
                defaultValue={state.direction}
                onChange={(event) => setState({ ...state, direction: event.target.value })}
                placeholder="Ingresa tu dirección*"
              />
            </label>

            <label>
              <span className="textInput">Referencia </span>
              <input
                className="inputCG"
                required={false}
                type="text"
                defaultValue={state.reference_house}
                onChange={(event) => setState({ ...state, reference_house: event.target.value })}
                placeholder="Ingresa un lugar de referencia*"
              />
            </label>
          </div>
        </div>
        <div className="btnsOptionalContainer">
          <div>
            <label>
              <span className="textInput">
                ¿Te gustaría que toquen el timbre al llegar su pedido?
              </span>
              <Switch defaultChecked onChange={onChange} />
            </label>
            <label>
              <span className="textInput">
                ¿Te gustaría que le escribamos al llegar su pedido?
              </span>
              <Switch defaultChecked onChange={onChange} />
            </label>
            <label>
              <span className="textInput">
                ¿Te gustaría que le llamemos al llegar su pedido?
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

export default FormDireccionUser;
