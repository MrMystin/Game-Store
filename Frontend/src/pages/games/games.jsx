import { useState } from 'react'
import Carousel from '../../components/carousel/carousel'
import './games.css'

function Games() {
    return (
        <>
            <div className='body-games'></div>
            <div className='bannerG' style={{ backgroundImage: "url('/img/Banner1.png')" }}>
                <div className='containerG' style={{ backgroundImage: "url('/img/placaG.png')" }}>
                    <div className='descontoG'>
                        <h2 className='descontoTG'>-25%</h2>
                    </div>
                    <div className='precoG'>
                        <p className='antG'>R$ 45,00</p>
                        <p className='atuG'>R$ 33,75</p>
                    </div>
                    <button className='btnBuy'>Comprar agora</button>
                </div>
            </div>

            <div className='infoimg'>
                <h1 className='ngame'>Minecraft</h1>
                <p className='txtG'>Construa tudo que você possa imaginar, descubra mistérios assustadores e sobreviva à noite no melhor jogo do tipo livre.</p>
            </div>
            <Carousel />

            <div className='informacoesG'>
                <div className='infG'>Informações</div>
                <div class="contG">
                    <div className='idiomasG'>
                        <div class="linha-grande">Idiomas</div>
                        <div class="grade-inferior">
                            <div>Inglês</div>
                            <div>Chinês</div>
                            <div>Hindi</div>
                            <div>Espanhol</div>
                            <div>Francês</div>
                            <div>Árabe</div>
                            <div>Bengali</div>
                            <div>Russo</div>
                            <div>Português</div>
                        </div>
                    </div>
                    <div className='classG'>
                        <h2 className="title-class">Classificação Indicativa</h2>
                        <div>
                            <img className="img-class" src='/img/livre.png' alt='Classificação Livre'></img>
                        </div>
                    </div>
                    <div className='informacaoG'>
                        <div className='info-class'>Data de lançamento: Data</div>
                        <div className='info-class'>Tamanho do arquivo: 1MB</div>
                        <div className='info-class'>Avaliação: 4.9</div>
                    </div>
                </div>
            </div>
            <div className='descri'>
                <img className='desc-img' src='/img/descricao.png'></img>
                <div className='desc-cont'>
                    <div className='desc-title'>Descrição</div>
                    <p className='txt-desc'>É um fato estabelecido há muito tempo que um leitor será distraído pelo conteúdo legível de uma página ao olhar para seu layout. O ponto de usar Lorem Ipsum é que ele tem uma distribuição mais ou menos normal de letras, ao contrário de usar 'Conteúdo aqui, conteúdo aqui', fazendo com que pareça um inglês legível. Muitos pacotes de editoração eletrônica e editores de páginas da web agora usam Lorem Ipsum como seu texto modelo padrão, e uma busca por 'lorem ipsum' revelará muitos sites ainda em sua infância. Várias versões evoluíram ao longo dos anos, às vezes por acidente, às vezes de propósito (humor injetado e coisas do tipo).</p>
                </div>
            </div>
        </>

    )
}

export default Games;