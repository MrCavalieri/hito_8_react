import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { useCart } from "../components/CartContext";

const Home = () => {
  const { addToCart } = useCart();
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/pizzas");
        if (!response.ok) {
          throw new Error("Error al obtener las pizzas");
        }
        const data = await response.json();
        setPizzas(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  if (loading) {
    return <p>Cargando pizzas...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Header />
      <main className="productos">
        <div className="tarjeta">
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              nombre={pizza.name}
              precio={pizza.price}
              ingredientes={pizza.ingredients}
              imagen={pizza.img}
              desc={pizza.desc}
              addToCart={() => addToCart(pizza)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
