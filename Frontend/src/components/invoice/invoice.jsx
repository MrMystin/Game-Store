import React from "react";
import "./invoice.css"

function Invoice() {
    return (
        <>
            <div className="body-invoice">
                <div className="central-invoice">
                    <div className="content-invoice">
                        <div className="grouptext-invoice">
                            <p className="p1-gptx-invoice">Olá Gabriel,</p>
                            <p className="p2-gptx-invoice">Agradecemos sua compra</p>
                            <p className="p3-gptx-invoice">
                                ID da fatura: <br/>
                                F40901238123
                            </p>
                        </div>
                        <div className="groupmid-invoice">
                            <div className="spacemid1-invoice">
                                <div className="textmid-invoice">
                                    <h4>ID do pedido:</h4>
                                    <p>F23423423423</p>
                                </div>
                            </div>
                            <div className="spacemid2-invoice">
                                <div className="textmid-invoice">
                                    <h4>Data do pedido:</h4>
                                    <p>F23423423423</p>
                                </div>
                            </div>
                            <div className="spacemid3-invoice">
                                <div className="textmid-invoice">
                                    <h4>Enviar cobrança para:</h4>
                                    <p>bielrocharo@gmail.com</p>
                                </div>
                            </div>
                            <div className="spacemid4-invoice">
                                <div className="textmid-invoice">
                                    <h4>Fonte:</h4>
                                    <p>Epic Games Store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
} 

export default Invoice;