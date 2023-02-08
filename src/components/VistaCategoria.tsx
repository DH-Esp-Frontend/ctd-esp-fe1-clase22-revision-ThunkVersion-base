import React from "react";
import ListadoItems from "./ListadoItems";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const VistaCategoria = () => {

    const { selectedCategory:category  } = useSelector((state:RootState) => state);

    return (
      <div id="vistaCategoria">
        <h3 className="titulo">Categoria: {category?.name}</h3>
        <ListadoItems />
      </div>
    );
};

export default VistaCategoria;
