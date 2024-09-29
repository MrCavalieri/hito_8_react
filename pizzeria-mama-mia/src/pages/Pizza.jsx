import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener la pizza");
        }
        const data = await response.json();
        setPizza(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

  if (loading) {
    return <p>Cargando pizza...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="pizza-details">
      {pizza && (
        <>
          <h1>{pizza.name}</h1>
          <img src={pizza.img} alt={pizza.name} />
          <p>
            <strong>Precio:</strong> ${pizza.price.toLocaleString()}
          </p>
          <p>
            <strong>Ingredientes:</strong>
          </p>
          <ul>
            {pizza.ingredients.map((ingrediente) => (
              <li key={ingrediente}>{ingrediente}</li>
            ))}
          </ul>
          <p>
            <strong>Descripción:</strong> {pizza.desc}
          </p>
        </>
      )}
    </div>
  );
};

export default Pizza;
