import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import Swal from "sweetalert2";
import "antd/dist/antd.min.css";
import "../../contenedores/ConfiguracionCuenta.scss";
import axios from "axios";

function FormCuentaUser() {
  const [state, setState] = useState({ name: "", last_name: "", phone: "" });

  function onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  
  
  //only letters en "Names"
  const handleName = (event) => {
    //console.log(event);
    
    //filter only letters
    let letters = event.target.value.replace(/[^A-Za-z \t\r\n\f]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only letters
    event.target.value = letters;
    
    //update "state" with only letters
    setState({ ...state, name: event.target.value });
  }
  
  
  //only letters en "LastNames"
  const handleLastName = (event) => {
    //console.log(event);
    
    //filter only letters
    let letters = event.target.value.replace(/[^A-Za-z \t\r\n\f]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only letters
    event.target.value = letters;
    
    //update "state" with only letters
    setState({ ...state, last_name: event.target.value });
  }
  
  
  //only numbers en "Phone Number"
  const handlePhone = (event) => {
    //console.log(event);
    
    //filter only numbers
    let numb = event.target.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
    
    //input show only numbers
    event.target.value = numb;
    
    //update "state" with only numbers
    setState({ ...state, phone: event.target.value });
  }
  

  const modalGuardarDatosUsuario = () => {
    //console.log(state);
    
    // if every field is complete
    let inputs = state.name && state.last_name && state.phone;
    
    if (!inputs) {
      Swal.fire({
        title: '¡Data sin Actualizar!',
        text: 'Completar los campos vacíos',
        icon: 'warning',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    
    else if (state.phone.length !== 9) {
      console.log("phone wrong");
      
      Swal.fire({
        title: '¡Data sin Actualizar!',
        text: 'Número Telefónico debe tener 09 dígitos',
        icon: 'warning',
        showConfirmButton: false,
        timer: 3000,
      });
    }
    else{
    
    if(inputs){
  
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
          /* if (camposVacios() !== false) {
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
  }
  };

  const modalCancelarDatosUsuario = () => {
    Swal.fire({
      text: "¿Está seguro de cancelar la actualización de sus datos?",
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

  const modalCerrarSesionUsuario = () => {
    Swal.fire({
      text: "¿Está seguro que desea cerrar sesión?",
      showCancelButton: true,
      confirmButtonColor: "#57a057",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: false,
      stopKeydownPropagation: false,
      showCloseButton: true,
      closeButtonAriaLabel: "cerrar alerta",
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
    axios
      .get(
        `https://country-app-v3.herokuapp.com/user/${localStorage.getItem(
          "id"
        )}`
      )
      .then(({ data }) => {
        setState({
          name: data.name,
          phone: data.phone,
          last_name: data.last_name,
        });
      });
  };

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <div className="container-B">
      <div className="titleContainer">
        <h1>Cuenta</h1>
      </div>
        
      <div className="subtitleContainer">
        <h3>Información Personal</h3>
      </div>

      <div>
          <div className="flex-Inputs inputsContainer">
            <div>
              <label>
                <span className="textInput">Nombres</span>
                <input
                  className="inputCG"
                  required={true}
                  type="text"
                  defaultValue={state.name}
                  placeholder="Ingresa tu nombre*"
                  onChange={(event) => handleName(event)}
                />
              </label>
              <label>
                <span className="textInput">Número Telefónico</span>
                <input
                  className="inputCG"
                  required={true}
                  type="text"
                  placeholder="Ingresa tu número telefónico*"
                  defaultValue={state.phone}
                  maxLength="9"
                  onChange={(event) => handlePhone(event)}
                />
              </label>
            </div>
            <div>
              <label>
                <span className="textInput">Apellidos</span>
                <input
                  className="inputCG"
                  required={true}
                  type="text"
                  placeholder="Ingresa tus apellidos*"
                  defaultValue={state.last_name}
                  onChange={(event) => handleLastName(event)}
                />
              </label>
          </div>
        </div>
        <div className="btnsOptionalContainer">
          <div>
            <label>
              <span className="textInput">
                ¿Te gustaría recibir notificaciones sobre novedades a tu correo
                electrónico?
              </span>
              <Switch defaultChecked onChange={onChange} />
            </label>
          </div>
        </div>
        <div className="btnsContainer">
          <button
            className="btnCerrarSesion"
            onClick={() => modalCerrarSesionUsuario()}
            name=""
          >
            Cerrar Sesión
          </button>
          <div>
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
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCuentaUser;
