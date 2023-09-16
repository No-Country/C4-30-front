import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Alert, AlertTitle } from "@material-ui/core";
import axios from "axios";
import "./Formularios.scss";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../../../firebase";
import { Navigate, useNavigate } from "react-router-dom";

const Registro = ({ isSelectedRegistro }) => {
  const style = { fontSize: "3em" };
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navitage = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post(
    //     "https://country-app-v3.herokuapp.com/sign_up",
    //     JSON.stringify({ email, password, name })
    //   )
    //   .then((data) => {
    //     window.location.pathname = `/Verificar-Cuenta/Nuevo-Usuario/${data.data.id}`;
    //     localStorage.setItem("confirmation_email", data.data.email);
    //   })
    //   .catch((error) => {
    //     if (error.request) {
    //       setError(error.request.response);
    //     }
    //   });
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("userCredential",userCredential.user);
          // window.location.pathname =  `/Verificar-Cuenta/Nuevo-Usuario/${data.data.id}`;
          // Signed in 
          // navitage("/Productos")
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(error);
        });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    console.log("aqui estos", provider);
    

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log("useeer",user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("errores",errorCode ,errorMessage,email  );
      });
  }

  return (
    <>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error} — <strong>pruebe de nuevo</strong>
        </Alert>
      )}
      <section
        id="register"
        role="tabpanel"
        className={`single__tabs__panel tab-pane fade ${
          isSelectedRegistro ? "in active" : ""
        }`}
      >
        <form className="login" method="post" onSubmit={handleSubmit}>
          <div className="inputsBox">
          <label>
              <span className="textInput">Usuario</span>
              <input
                className="input"
                required="true"
                type="text"
                placeholder="Ingresa tu Nombre*"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
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
            <button name="" type="submit">Registrarse</button>
          </div>
        </form>

        <div className="RedesSocialesBox">
          <br />
          <h4>O registrate con</h4>
          <div className="RedesSocialesRegistro">
            <button onClick={handleGoogle}>
              <FcGoogle style={style} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registro;
