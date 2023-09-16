import React, { useState, useEffect } from "react";

import "./estilos/VPC.scss";

import imagen from "../imagenes/img.svg";
import plus from "../imagenes/plus.svg";
import minus from "../imagenes/minus.svg";
import down from "../imagenes/down.svg";
import clock from "../imagenes/clock.svg";
import burger from "../imagenes/burger.svg";
import pizza from "../imagenes/pizza.svg";
import axios from "axios";

export default function VPC({
  products,
  id,
  setState,
  state,
  productosCarrito,
  setProductosCarrito,
}) {
  const [isPM, setIsPM] = useState(products.count);
  const [categoria, setCategoria] = useState([]);

  const cargarCategorias = () => {
    axios
      .get("https://country-app-v3.herokuapp.com/categories")
      .then(({ data }) => {
        //Data de Categorias al useState
        const new_category = data.find((e) => e.id === products.category_id);
        setCategoria(new_category);
      })
      .catch((error) => console.log(error));
  };

  const buttonMinus = () => {
    //setIsMinus(current => !current)
    setIsPM((current) => (current === 0 ? 0 : current - 1));
    if (isPM === 0) return;

    axios
      .post(`https://country-app-v3.herokuapp.com/orders/${id}/minus`, {
        count: isPM,
        product_id: products.id,
        user_id: localStorage.getItem("id"),
      })
      .then(({ data }) => {
        const new_data = data.map((item) => item.products);
        setState({ ...state, products: { list: new_data } });
      });
  };

  const buttonPlus = () => {
    setIsPM((current) => current + 1);
    axios
      .post(`https://country-app-v3.herokuapp.com/orders/${id}/aument`, {
        count: isPM,
        product_id: products.id,
        user_id: localStorage.getItem("id"),
      })
      .then(({ data }) => {
        const new_data = data.map((item) => item.products);

        setState({ ...state, products: { list: new_data } });
      });
  };

  const [isImg, setIsImg] = useState(false);
  const buttonImg = () => {
    setIsImg((current) => !current);
  };

  const handleDelete = () => {
    axios
      .delete(`https://country-app-v3.herokuapp.com/orders/${id}`)
      .then((data) => {
        setProductosCarrito(productosCarrito.filter((p) => p.id !== id));
        setState({ ...state })
      });

    //Actualiza el estado del carrito y limpia el producto eliminado
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  console.log(categoria);

  return (
    <div className="contenedorVPC">
      <div className="contenedorImagen">
        <img src={products.img} alt="imagen" onClick={buttonImg} />
        {/* <h3 className={`postexto ${isImg ? "hidden" : ""}`}>AGOTADO</h3> */}
      </div>

      <div>
        <p className="equis" onClick={handleDelete}>
          x
        </p>
        <div className="contenedorTexto">
          <div className="flex1">
            <div>
              <h1>{products.name}</h1>
            </div>
            <div className="flex1">
              <img className="iconclock" src={clock} alt="clock" />
              <h2>{products.preparation}</h2>
            </div>
          </div>

          <p>{products.description}</p>

                    <div className="flex4">
            <h5>Read more</h5>
            <img className="icondown" src={down} alt="down" />
          </div>

          <div className="flex2">
            <div className="flex3">
              <img className="icon" src={categoria.img} alt="burger" />
              <h4>{categoria.name}</h4>
            </div>
          </div>

          <div className="contenedorPM">
            <div className="flex1">
              <h6>$ {products.price}.00</h6>
              <div className="flex2">
                <img
                  className="iconpm"
                  src={minus}
                  alt="minus"
                  onClick={buttonMinus}
                />
                <h1 className="textopm"> {isPM} </h1>
                <img
                  className="iconpm"
                  src={plus}
                  alt="plus"
                  onClick={buttonPlus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
