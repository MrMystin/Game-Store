import React, { useState } from "react";
import "./buy.css";
import { Link, useNavigate } from "react-router-dom";

function Buy({ isOpen, onClose, game }) {
  if (!isOpen || !game) return null;
  const navigate = useNavigate();
  const banner = game.photos.find((photo) => photo.type === "banner")?.photo;

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCcv, setCardCcv] = useState("");
  const [loading, setLoading] = useState(false);

  // Formata o número do cartão como "1234 5678 9012 3456"
  function handleCardNumberChange(e) {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 16) value = value.slice(0, 16);

    // Divide em grupos de 4 dígitos
    const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";

    setCardNumber(formattedValue);
  }

  // Formata data como MM/AA
  function handleCardExpiryChange(e) {
    let value = e.target.value.replace(/\D/g, ""); // só números
    if (value.length > 4) value = value.slice(0, 4);

    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setCardExpiry(value);
  }

  // Limita CCV para 3 números
  function handleCardCcvChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCardCcv(value);
  }

  async function handleConfirmPurchase(e) {
    e.preventDefault();

    setLoading(true);

    try {
      // Aqui você deve montar os dados conforme o schema do backend
      const body = {
        invoiceId: `F${Date.now()}`,
        orderId: `O${Date.now()}`,
        paymentType: "credit_card",
        source: "Minecraft Store",
        total: Number(game.discount),  // converta para number
        transactionItems: [
          {
            productId: Number(game.id),
            productName: game.name,
            publisherName: game.publisher?.name || "",
            productValue: Number(game.value),    // converter aqui
            discount: Number(game.value) - Number(game.discount), // desconto calculado
            finalPrice: Number(game.discount),
          },
        ],
      };
      

      const token = localStorage.getItem("token"); // supondo que o token JWT está aqui

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

      // Sucesso
      alert("Purchase confirmed!");
      navigate("/");
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
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

        <div
          className="buy-modal-banner"
          style={{
            backgroundImage: `url(http://localhost:3000/images/${game.id}/${banner})`,
          }}
        />

        <div className="buy-modal-info">
          <h2 className="buy-game-title">{game.name}</h2>
          <p className="buy-price">R$ {game.discount}</p>

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
                maxLength={19} // 16 dígitos + 3 espaços
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
