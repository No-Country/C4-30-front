import React, { useState, useContext } from "react";
import logo from "../../../imagenes/LogoVeride/LogosSinFondo/Logo3-Largo.png";
import "./NavBar.scss";
import {
  FiHeart,
  FiShoppingBag,
  FiSearch,
  FiMenu,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";

import { SearchContext } from "../../../context/SearchContext";

/* const isLoggedIn = false; */
const isLoggedIn = true;

export default function NavBarHome({ user }) {
  const [searchQuery, setSearchQuery] = useState("");
  const searchContext = useContext(SearchContext);

  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
  };

  /* Inicio de Busqueda al presionar ENTER en el INPUT BUSCADOR del NAVBAR */
  const handleEnter = (e) => {
    console.log("is in handleEnter",e);
    if (e.key === "Enter") {
      searchQueryHandler();
    }
  };
  /*  */

  return (
    <nav className="navHome">
      <div className="navbar-left">
        <img src={logo} alt="Veride" />
        <a className="productos" href="/Productos">
          Productos
        </a>
        <a className="sobre-veride" href="/Sobre-Veride">
          Sobre Veridē
        </a>
      </div>
      <div className="navbar-right">
        <div className="form-inline">
          <input
            type="text"
            placeholder="Buscar Producto..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => handleEnter(e)}
            value={searchQuery}
          />
          <button
            type="button"
            className="boton-buscar"
            onClick={searchQueryHandler}
            name=""
          >
            <FiSearch />
          </button>
        </div>
        <a className="deseos" href="/Lista-De-Deseos">
          <FiHeart />
        </a>
        <a className="carrito" href="/Carrito-Compras">
          <FiShoppingBag />
        </a>
        {isLoggedIn ? (
          <div className="dropdown">
            <div className="logged-dropdown-mobile">
              <FiMenu />
              <div className="logged-mobile-dropdown-content">
                <p className="link-usuario">{user?.name}</p>
                <a className="productos" href="/Productos">
                  Productos
                </a>
                <a className="sobre-veride" href="/Sobre-Veride">
                  Sobre Veridē
                </a>
                <a href="/Configuracion-de-Cuenta">Configuración de Cuenta</a>
                <a href="historial-de-compras">Historial de Compras</a>
                <a
                  href="/inicio-sesion"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("id");
                  }}
                >
                  Cerrar Sesión
                  <FiLogOut />
                </a>
              </div>
            </div>
            <div className="logged-dropdown-desktop">
              <p className="cuenta">
                {user?.name}
                <FiChevronDown />
              </p>
              <div className="logged-desktop-dropdown-content">
                <a href="/Configuracion-de-Cuenta">Configuración de Cuenta</a>
                <a href="historial-de-compras">Historial de Compras</a>
                <a href="/Sobre-Veride" onClick={() => localStorage.clear()}>
                  Cerrar Sesión
                  <FiLogOut />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="ingreso-container">
            <a className="inicio-sesion" href="/inicio-sesion">
              <span>Ingresa aquí</span>
            </a>
            <div className="unlogged-dropdown">
              <FiMenu />
              <div className="unlogged-dropdown-content">
                <a href="/inicio-sesion">Ingresa aquí</a>
                <a href="/Productos">Productos</a>
                <a href="/Sobre-Veride">Sobre Veridē</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
