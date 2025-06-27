import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      // Log para debug
      console.log("Cart items loaded:", parsedCart);

      setCartItems(parsedCart);
      const sum = parsedCart.reduce(
        (acc, item) => acc + (Number(item.finalPrice) || 0),
        0
      );
      setTotal(sum);
    }
  }, []);

  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    const sum = updatedCart.reduce(
      (acc, item) => acc + (Number(item.finalPrice) || 0),
      0
    );
    setTotal(sum);
  }

  async function handleConfirmPurchase() {
    if (cartItems.length === 0) {
      Swal.fire(
        "Carrinho vazio",
        "Adicione itens ao carrinho antes de comprar.",
        "warning"
      );
      return;
    }

    setLoading(true);

    try {
      const bodyData = {
        invoiceId: `INV-${Date.now()}`,
        orderId: `ORD-${Date.now()}`,
        paymentType: "credit_card",
        source: "My Store",
        total: total,
        transactionItems: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          publisherName: item.publisher,
          productValue: Number(item.value) || 0,
          discount: Number(item.discount) || 0,
          finalPrice: Number(item.finalPrice) || 0,
        })),
      };

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao criar transação");
      }

      await res.json();

      Swal.fire("Sucesso", "Compra realizada com sucesso!", "success");
      setCartItems([]);
      setTotal(0);
      localStorage.removeItem("cart");
    } catch (err) {
      Swal.fire("Erro", err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cart-container">
      <h1>Meu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={`http://localhost:3000/images/${
                    item.id
                  }/${item.banner || "banner.jpg"}`}
                  alt={item.name}
                  width={120}
                  height={60}
                />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Publisher: {item.publisher}</p>
                  <p>Preço: R$ {(item.finalPrice ?? 0).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h2>Total: R$ {total.toFixed(2)}</h2>
            <button
              onClick={handleConfirmPurchase}
              disabled={loading}
              className="confirm-btn"
            >
              {loading ? "Processando..." : "Confirmar Compra"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
