import React, { useState, useEffect } from "react";
import "./buy.css";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../utils/cart";

function Buy({ isOpen, onClose, game }) {
  const navigate = useNavigate();

  const [itemsToBuy, setItemsToBuy] = useState([]);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCcv, setCardCcv] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cart = getCart();
      const isCartEmpty = !game && cart.length === 0;

      if (isCartEmpty) {
        alert("Não há produtos no carrinho para comprar.");
        onClose();
      }
    }
  }, [isOpen, game]);

  useEffect(() => {
    if (game) {
      setItemsToBuy([
        {
          productId: game.id,
          productName: game.name,
          publisherName: game.publisher?.name || "",
          productValue: Number(game.value),
          discount: Number(game.discount) || 0,
          finalPrice: Number(game.value) - (Number(game.discount) || 0),
          banner: game.photos?.find((p) => p.type === "banner")?.photo || "",
        },
      ]);
    } else {
      setItemsToBuy(getCart());
    }
  }, [game]);

  if (!isOpen) return null;

  function handleCardNumberChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formattedValue);
  }

  function handleCardExpiryChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setCardExpiry(value);
  }

  function handleCardCcvChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCardCcv(value);
  }

  async function handleConfirmPurchase(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        paymentType: "credit_card",
        transactionItems: itemsToBuy.map((item) => ({
          productId: item.productId,
        })),
      };

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/transaction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create transaction");
      }

      alert("Compra realizada com sucesso!");
      if (!game) localStorage.removeItem("cart");
      navigate("/");
      onClose();
    } catch (err) {
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="buy-modal-overlay" onClick={onClose}>
      <div className="buy-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="buy-modal-close" onClick={onClose}>
          ×
        </button>

        {itemsToBuy.length > 0 && (
          <div
            className="buy-modal-banner"
            style={{
              backgroundImage: `url(http://localhost:3000/images/${itemsToBuy[0].productId}/${itemsToBuy[0].banner})`,
            }}
          />
        )}

        <div className="buy-modal-info">
          <div className="buy-item-list">
            {itemsToBuy.map((item) => (
              <div className="buy-item" key={item.productId}>
                <img
                  src={`http://localhost:3000/images/${item.productId}/${item.banner}`}
                  alt={item.productName}
                  className="buy-item-banner"
                />
                <div className="buy-item-info">
                  <h3>{item.productName}</h3>
                  <p>R$ {item.finalPrice.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="buy-total">
            Total: R${" "}
            {itemsToBuy.reduce((acc, item) => acc + item.finalPrice, 0).toFixed(2)}
          </p>

          <form className="buy-form" onSubmit={handleConfirmPurchase}>
            <div className="form-group">
              <label htmlFor="card-name">Name on Card</label>
              <input
                type="text"
                id="card-name"
                placeholder="Full name as on card"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="card-number">Credit Card Number</label>
              <input
                type="text"
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group small">
                <label htmlFor="card-expiry">Expiry Date</label>
                <input
                  type="text"
                  id="card-expiry"
                  placeholder="MM/YY"
                  value={cardExpiry}
                  onChange={handleCardExpiryChange}
                  maxLength={5}
                  required
                />
              </div>

              <div className="form-group small">
                <label htmlFor="card-ccv">CCV</label>
                <input
                  type="text"
                  id="card-ccv"
                  placeholder="123"
                  value={cardCcv}
                  onChange={handleCardCcvChange}
                  maxLength={3}
                  required
                />
              </div>
            </div>

            <button type="submit" className="buy-confirm-btn" disabled={loading}>
              {loading ? "Processing..." : "Confirm Purchase"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Buy;
