import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { SearchContext } from "../../../../../../context/SearchContext";
import Categorias from "../../../../../subComponentes/categorias/Categorias";
import VPSV from "../../../../../subComponentes/vistaprodSobreVeride/VPSV/VPSV";
import { FiSearch } from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../../../firebase";

function ProductosComponentes() {
  console.log("in ProductosComponentes ");
  const [categorias, setCategorias] = useState([]);
  //Almacena el contenido del CONTEXT en una CONSTANTE
  const searchContext = useContext(SearchContext);
  console.log(searchContext.query); // para pruebas del CONTEXT

  const cargarCategorias = async() => {
    // axios
    //   .get("https://country-app-v3.herokuapp.com/categories")
    //   .then((data) => {
    //     //Data de Categorias al useState
    //     setCategorias(data.data);
    //   })
    //   .catch((error) => console.log(error));
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "categorias"));
      querySnapshot.forEach((doc) => {
        list.push({
          ...doc.data(),
          id: doc.id,
        })
      });
      //Data de Productos al useState
      setCategorias(list);
    }catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    // if (!localStorage.getItem("user")) {
    //   window.location.pathname = "/inicio-sesion";
    // }

    cargarCategorias();
  }, []);

  //mostrar PRODUCTOS y MAS VENDIDOS desde la API
  const [productos, setProductos] = useState([]);
  console.log("products in home",productos);

  const cargarProductos = async(e) => {
    // axios
    //   .get("https://country-app-v3.herokuapp.com/api/v1/products")
    //   .then((data) => {

    //     data = data.data;

    //     //Filtrado con el input del BUSCADOR
    //     const searchResult =
    //       data &&
    //       data.filter((item) => item.name.toLowerCase().includes(e.query));

    //     //Data de Productos al useState
    //     //setProductos(data.data);
    //     setProductos(searchResult);
    //   })
    //   .catch((error) => console.log(error));
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      querySnapshot.forEach((doc) => {

        list.push(doc.data())
      });
      //Filtrado con el input del BUSCADOR
      const searchResult = list && list.filter((item) => item.name.toLowerCase().includes(e.query));
      //Data de Productos al useState
      setProductos(searchResult);
      console.log("in productos",list);
    }catch(err){
      console.log(err);
    }

  };

  useEffect(() => {
    cargarProductos(searchContext); // Todos los Productos
  }, [searchContext]);

  // Filtrado por categoria
  const [selectedCategorias, setSelectedCategorias] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const searchQueryHandler = () => {
    searchContext.searchHandler(searchQuery);
  };

  /* Inicio de Busqueda al presionar ENTER en el INPUT BUSCADOR del NAVBAR */
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      searchQueryHandler();
    }
  };
  return (
    <section>
      <div className="form-inline-Search">
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
      <article className="article-categorias">
        <h2>Categorías</h2>
        <div className="container-categorias">
          {categorias.map((prod) => {
            return (
              <Categorias
                key={prod.id}
                prod={prod}
                setSelectedCategorias={setSelectedCategorias}
                selectedCategorias={selectedCategorias}
              />
            );
          })}
        </div>
      </article>

      <article className="article-productos">
        <h2>Todos los productos ({productos.length})</h2>
        <div className="todosProductos">
          {" "}
          {/* container-productos */}
          {/* Filtros activados => muestra solo la(s) categoria(s) elegida(s) */}
          {selectedCategorias.length > 0 &&
            productos
              .filter((p) =>
                selectedCategorias.some((c) => c === p.category_id)
              )
              .map((prod) => {
                return (
                  <VPSV key={prod.id} prod={prod} categorias={categorias} />
                );
              })}
          {/* Estado inicial => muestra todo */}
          {selectedCategorias.length === 0 &&
            productos.map((prod) => {
              return <VPSV key={prod.id} prod={prod} categorias={categorias} />;
            })}
        </div>
      </article>
    </section>
  );
}

export default ProductosComponentes;
