import React, { useState } from "react";
import Modal from "./Modal";

const CardPizza = ({
  nombre,
  precio,
  ingredientes,
  imagen,
  desc,
  addToCart,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="card">
      <img src={imagen} className="card-img-top" alt={nombre} />
      <div className="card-body">
        <h5 className="card-title">{capitalize(nombre)}</h5>
        <p className="card-text">Ingredientes:</p>
        <ul>
          {ingredientes.map((ingrediente) => (
            <li key={ingrediente}>{ingrediente}</li>
          ))}
        </ul>
        <p className="card-text">Precio: ${precio?.toLocaleString()}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-light text-dark" onClick={handleShowModal}>
            👀 Ver Más
          </button>
          <button
            className="btn btn-dark text-white ml-auto"
            onClick={() => {
              console.log("Añadiendo al carrito:", nombre);
              addToCart();
            }}
          >
            Añadir 🛒
          </button>
        </div>
      </div>

      <Modal
        show={showModal}
        handleClose={handleCloseModal}
        title={capitalize(nombre)}
      >
        <p>{desc}</p>
      </Modal>
    </div>
  );
};

export default CardPizza;
