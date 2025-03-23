import { useState } from 'react'
import './buy.css'

function Buy() {
    return (
        <>
            <div className='body-buy'>
                <div></div>
                <div className="container-compras">
                    <div className="plan-box">
                        <div className='game-box'>
                            <h3>Jogo selecionado:</h3>
                            <h2 id='game-name'>Minecraft</h2>
                        </div>
                        <div className='plan-info'><p><strong>Cobrança:</strong> R$ 40,00</p>
                            <hr></hr>
                            <label for="language-game">Selecione um idioma</label>
                            <select id="language-game">
                                <option >Português</option>
                                <option >Inglês</option>
                                <option >Chinês</option>
                                <option >Espanhol</option>
                                <option >Hindi</option>
                                <option >Francês</option>
                                <option >Árabe</option>
                                <option >Bengali</option>
                                <option >Russo</option>
                            </select>
                        </div>
                    </div>
                    <div className="payment-box">
                        <h3>Informações para cobrança</h3>
                        <div className='buy-info'>
                            <label for="card-numberc">Número do cartão</label>
                            <input type="text" className='input-buy' id="card-numberc" placeholder="XXX.XXX.XXX"></input>
                            <div className='txt-cards'>
                                <label for="date-cardc" id='validade'>Data de validade do cartão</label>
                                <label for="segurity-numberc" id='seguranca'>Código de segurança</label>
                            </div>
                            <div className="card-infoc">
                                <input type="text" id='date-cardc' placeholder="MM/AA" className='input-buy'></input>
                                <input type="text" id='segurity-numberc' placeholder="CVC" className='input-buy'></input>
                            </div>
                            <label for="options-country">País</label>
                            <select id='options-country'>
                                <option>Brasil</option>
                                <option>Canadá</option>
                                <option>França</option>
                                <option>Nigéria</option>
                                <option>Austrália</option>
                                <option>China</option>
                                <option>Arábia saldita</option>
                                <option>Bolívia</option>
                            </select>
                            <button className='btn-compra'>Finalizar compra</button>
                        </div>
                    </div>
                </div>
                <div className='txt-compra'>
                    <p>Explore, construa e aventure-se no infinito mundo de Minecraft. O único limite é a sua imaginação!</p>
                    <a>Termos e condições</a>
                </div>
            </div>
        </>
    )
}

export default Buy;