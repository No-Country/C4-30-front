import "./App.css";
import { useState, useEffect, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import axios from "axios";

import InicioSesion from "./componentes/paginas/registro-InicioSesion/contenedor/InicioSesion";
import VerificarCuentaUsuario from "./componentes/paginas/registro-InicioSesion/contenedor/VerificarCuenta-Usuario";
import VerificarCuentaNuevoUsuario from "./componentes/paginas/registro-InicioSesion/contenedor/VerificarCuenta-NuevoUsuario";
import RecuperarContrasena from "./componentes/paginas/registro-InicioSesion/contenedor/RecuperarContrasena";
import CambiarContrasena from "./componentes/paginas/registro-InicioSesion/contenedor/CambiarContrasena";
import SobreVeride from "./componentes/paginas/sobreVerede/SobreVerede";
import CarritoCompras from "./componentes/paginas/carritoCompras/contenedores/CarritoCompras";
import HistorialCompras from "./componentes/paginas/historialCompras/contenedores/HistorialCompras";
import Home from "./componentes/paginas/home/Home";
import ConfiguracionCuenta from "./componentes/paginas/configuracionCuenta/contenedores/ConfiguracionCuenta";
import ListaDeDeseos from "./componentes/paginas/listaDeDeseos/ListaDeDeseos";
import SobreVeredeUser from "./componentes/paginas/sobreVeredeUser/SobreVeredeUser";
import { AuthContext } from "./context/AuthContext";

function App() {
  //Información de usuario al useState
  const [user, setUser] = useState("");
  // const getDataUser = () => {
  //   axios
  //     .get(
  //       `https://country-app-v3.herokuapp.com/user/${localStorage.getItem(
  //         "id"
  //       )}`
  //     )
  //     .then(({ data }) => {
  //       setUser(data);
  //     });
  // };

  // useEffect(() => {
  //   getDataUser();
  // }, []);
  const {currentUser } = useContext(AuthContext)
  // const currentUser = true;

  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/Inicio-Sesion"/>
  }

  console.log(currentUser);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/Carrito-Compras"
          element={<CarritoCompras user={user} />}
        />
        <Route path="/Lista-De-Deseos" element={<ListaDeDeseos />} />
        <Route path="/Historial-De-Compras" element={<HistorialCompras user={user} />} />
        <Route
          path="/Historial-De-Compras/:buy_id"
          element={<HistorialCompras />}
        />

        <Route
          path="/Configuracion-de-Cuenta"
          element={<ConfiguracionCuenta user={user} />}
        />
        <Route
          path="/Cambiar-Contrasena/:token"
          element={<CambiarContrasena />}
        />
        <Route path="/Recuperar-Contrasena" element={<RecuperarContrasena />} />
        <Route path="/Verificar-Cuenta" element={<VerificarCuentaUsuario />} />
        <Route
          path="/Verificar-Cuenta/Nuevo-Usuario/:id"
          element={<VerificarCuentaNuevoUsuario />}
        />
        <Route path="/Inicio-Sesion" element={<InicioSesion />} />
        <Route path="/Sobre-Veride-Visitante" element={<SobreVeride />} />
        <Route path="/Sobre-Veride" element={<SobreVeredeUser />} />

        <Route path="/Productos" element={<RequireAuth><Home user={user}/></RequireAuth>} />
        <Route path="/" element={<SobreVeride />} />
      </Routes>
    </div>
  );
}

export default App;
