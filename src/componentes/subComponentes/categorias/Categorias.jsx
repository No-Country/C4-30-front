import {React, useState} from 'react'

import "./Categorias.scss";


export default function Categorias({ prod, setSelectedCategorias, selectedCategorias }) {

  // Filtrado por categoria
  const [isClick, setIsClick] = useState(false);

 

  const removeItem = (id) => {
    setSelectedCategorias(selectedCategorias.filter((c)=>(c !== id)));
  }
  const buttonClick = () => {
    setIsClick(current => !current)
    if (!isClick) {
      setSelectedCategorias(selectedCategorias.concat(prod.id));
      
    }
    else {
      removeItem(prod.id);
    }
  }

  return (
    <div>
      <div className={`contenedor ${isClick ? "click" : ""}`} onClick={buttonClick}>
        <img className="imgCat" src={prod.img} alt="imagen" />
        <p className='textCat'>{prod.name}</p>
      </div>
    </div>
  )
}
