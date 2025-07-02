import React from "react";
import "./invoice.css";
import logo from "/img/logo.svg";

function Invoice({ isOpen, onClose, data, user }) {
  if (!isOpen || !data) return null;

  const transaction = data.transaction;
  const cartItems = data.cartItems || [];

  const total = cartItems.reduce((sum, item) => sum + item.finalPrice, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0);

  const formattedDate = new Date(transaction.transactionDate).toLocaleDateString(
    "pt-BR",
    { day: "2-digit", month: "long", year: "numeric" }
  );

  return (
    <div
      className="body-invoice"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="central-invoice"
        style={{ position: "relative" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 30,
            background: "none",
            border: "none",
            color: "#555",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>

        <img src={logo} alt="logo" className="logo-invoice" />
        <p className="titlecentral-invoice">Obrigado.</p>

        <div className="content-invoice">
          <div className="grouptext-invoice">
            <p className="p1-gptx-invoice">Olá {user?.fullName || "Cliente"},</p>
            <p className="p2-gptx-invoice">Agradecemos sua compra</p>
            <p className="p3-gptx-invoice">
              ID da fatura: <br />
              {transaction.invoiceId}
            </p>
          </div>

          <div className="infomid-invoice">
            <p className="p-informid-invoice">INFORMAÇÃO DO SEU PEDIDO:</p>
          </div>

          <div className="groupmid-invoice">
            <div className="spacemid1-invoice">
              <div className="textmid-invoice">
                <h4>ID do pedido:</h4>
                <p>{transaction.orderId}</p>
              </div>
            </div>

            <div className="spacemid2-invoice">
              <div className="textmid-invoice">
                <h4>Data do pedido:</h4>
                <p>{formattedDate}</p>
              </div>
            </div>

            <div className="spacemid3-invoice">
              <div className="textmid-invoice">
                <h4>Enviar cobrança para:</h4>
                <a
                  href={`mailto:${user?.email}`}
                  target="_blank"
                  rel="noreferrer"
                  className="emailmid-invoice"
                >
                  {user?.email}
                </a>
              </div>
            </div>

            <div className="spacemid4-invoice">
              <div className="textmid-invoice">
                <h4>Fonte:</h4>
                <p>Minecraft Store</p>
              </div>
            </div>
          </div>

          <div className="bottom-invoice">
            <div className="space-bottom-invoice">
              <div className="line-bottom-invoice line1-invoice">
                <p className="title-bottom-invoice">AQUI ESTÁ SEU PEDIDO:</p>
              </div>

              <div className="line-bottom-invoice line2-invoice">
                <p className="text-bottom1-invoice">Descrição:</p>
                <p className="text-bottom2-invoice">Distribuidora:</p>
                <p className="text-bottom3-invoice">Preço:</p>
              </div>

              {cartItems.map((item) => (
                <div
                  className="line-bottom-invoice line3-invoice"
                  key={item.productId}
                >
                  <p className="text-bottom1-invoice">{item.productName}</p>
                  <p className="text-bottom2-invoice">{item.publisherName}</p>
                  <p className="text-bottom3-invoice">
                    R$ {item.finalPrice.toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="line-bottom-invoice line4-invoice">
                <p className="textleft-bottom-invoice">Descontos:</p>
              </div>

              <div className="line-bottom-invoice line5-invoice">
                <p className="textleft-bottom-invoice">Desconto</p>
                <p className="textright-bottom-invoice">
                  - R$ {totalDiscount.toFixed(2)}
                </p>
              </div>

              <div className="line-bottom-invoice line6-invoice">
                <p className="valuebottom-invoice">TOTAL:</p>
                <p className="numberbottom-invoice">R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
