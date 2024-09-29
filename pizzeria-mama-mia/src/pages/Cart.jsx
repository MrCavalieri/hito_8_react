import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { useUser } from "../components/UserContext";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
  } = useCart();
  const { token } = useUser();
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const manejarPago = async () => {
    if (!cartItems || cartItems.length === 0) {
      setMensajeError("Oops! Tu carrito está vacío");
      return;
    }
    try {
      const respuesta = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ carrito: cartItems }),
      });
      if (respuesta.ok) {
        setMensajeExito("Compra realizada con éxito.");
        setMensajeError("");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <div className="productos">
      <h2>Carrito de Compras</h2>
      {cartItems && cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.img} alt={item.nombre} className="cart-item-img" />
              <div className="cart-item-details">
                <h5>{item.nombre}</h5>
                <p>Descripción: {item.desc}</p>
                <p>Precio: ${(item.price || 0).toLocaleString()}</p>
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button
                  className="btn btn-light"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${(total || 0).toLocaleString()}</h3>
      <button className="btn btn-dark" onClick={manejarPago} disabled={!token}>
        Pagar
      </button>

      {!token && <p>Inicia sesión para poder realizar el pago.</p>}
      {mensajeError && <p className="error-message">{mensajeError}</p>}
      {mensajeExito && <p className="success-message">{mensajeExito}</p>}
    </div>
  );
};

export default Cart;
