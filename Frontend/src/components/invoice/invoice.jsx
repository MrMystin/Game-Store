import React from "react";
import "./invoice.css"
import logo from "/img/logo.svg";

function Invoice() {
    return (
        <>
            <div className="body-invoice">
                <div className="central-invoice">
                    <img src={logo} alt="logo" className="logo-invoice"/>
                    <p className="titlecentral-invoice">Obrigado.</p>
                    <div className="content-invoice">
                        <div className="grouptext-invoice">
                            <p className="p1-gptx-invoice">Olá Gabriel,</p>
                            <p className="p2-gptx-invoice">Agradecemos sua compra</p>
                            <p className="p3-gptx-invoice">
                                ID da fatura: <br/>
                                F40901238123
                            </p>
                        </div>
                        <div className="infomid-invoice">
                            <p className="p-informid-invoice">INFORMAÇÃO DO SEU PEDIDO:</p>
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
                                    <p>15 de março de 2025</p>
                                </div>
                            </div>
                            <div className="spacemid3-invoice">
                                <div className="textmid-invoice">
                                    <h4>Enviar cobrança para:</h4>
                                    <a href="https://mail.google.com/mail" 
                                    target="_blank" 
                                    className="emailmid-invoice">
                                        martinsdesousajussara@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div className="spacemid4-invoice">
                                <div className="textmid-invoice">
                                    <h4>Fonte:</h4>
                                    <p>Epic Games Store</p>
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
                                <div className="line-bottom-invoice line3-invoice">
                                    <p className="text-bottom1-invoice">Edição Standard do MINE</p>
                                    <p className="text-bottom2-invoice">SEGA of Europe</p>
                                    <p className="text-bottom3-invoice">R$ 40.00 BRL</p>
                                </div>
                                <div className="line-bottom-invoice line4-invoice">
                                    <p className="textleft-bottom-invoice">Descontos:</p>
                                </div>
                                <div className="line-bottom-invoice line5-invoice">
                                    <p className="textleft-bottom-invoice">Desconto</p>
                                    <p className="textright-bottom-invoice">- R$ 0.00 BRL</p>
                                </div>
                                <div className="line-bottom-invoice line6-invoice">
                                    <p className="valuebottom-invoice">TOTAL:</p>
                                    <p className="numberbottom-invoice">R$40.00 BRL</p>
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