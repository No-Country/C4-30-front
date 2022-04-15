import React from "react";
import Footer from "../../subComponentes/footer/Footer";
import NavBarHome from "../../subComponentes/navBar/NavBarHome";

function CarritoCompras() {
  return (
    <section className="contenedorCarritoCompras">
      <NavBarHome />
      <div>CarritoCompras</div>
      <Footer/>
    </section>
  );
}

export default CarritoCompras;
