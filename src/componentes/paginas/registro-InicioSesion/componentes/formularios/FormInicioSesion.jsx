import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./Formularios.scss";
import { Alert, AlertTitle } from "@material-ui/core";
import { AuthContext } from "../../../../../context/AuthContext";
import { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../../firebase";

// import axios from "axios";



const Inicio = ({ isSelectedInicio }) => {
  const style = { fontSize: "3em" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navitage = useNavigate()

  const {dispatch} = useContext(AuthContext)

  // authentification with Firebase
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post(
    //     "https://country-app-v3.herokuapp.com/sign_in",
    //     JSON.stringify({ email, password })
    //   )
    //   .then((data) => {
    //     window.location.pathname = "/Productos";
    //     localStorage.setItem("user", data.data.email);
    //     localStorage.setItem("id", data.data.id);
    //   })
    //   .catch((error) => {
    //     if (error.request) {
    //       setError(error.request.response);
    //     }
    //   });
    signInWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload: user})
        navitage("/Productos")
      })
      .catch((error) => {
        setError(true);
      })

  };

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     window.location.pathname = "/";
  //   }
  // }, []);

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>pruebe de nuevo</strong>
        </Alert>
      )}
      <section
        id="Inicio"
        role="tabpanel"
        className={`single__tabs__panel tab-pane fade ${
          isSelectedInicio ? "in active" : ""
        }`}
      >
        <form className="Inicio" onSubmit={handleSubmit}>
          <div className="inputsBox">
            <label>
              <span className="textInput">Correo</span>
              <input
                className="input"
                required="true"
                type="email"
                placeholder="nombre@ejemplo.com*"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <span className="textInput">Contraseña</span>
              <input
                className="input"
                required="true"
                type="password"
                placeholder="mín. 8 carácteres"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {/* <div className="tabsCheckbox">
            <label>
              <input type="checkbox" className="checkbox" />
              <span className="checkmark"> Mantenerme conectado</span>
            </label>
          </div> */}
          <div className="btnsIngresar">
            <button name="" type="submit">Ingresar</button>
          </div>
          <br />
          <div className="center">
            <span> ¿Olvidaste tu contraseña?</span>
            <span className="forget">
              <Link to="/Recuperar-Contrasena">Recuperala aquí</Link>
            </span>
          </div>
        </form>

        {/* <div className="RedesSocialesBox">
          <br />
          <h4>O inicia sesión con</h4>
          <div className="RedesSocialesInicio">
            <FcGoogle style={style} />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Inicio;
