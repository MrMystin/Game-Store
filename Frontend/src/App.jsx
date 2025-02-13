import { useEffect, useState } from "react"; // Importa os hooks necessários
import "./App.css";
import Header from "./components/header";
import game1 from "../public/img/jogo1.png";
import game2 from "../public/img/jogo2.png";
import game3 from "../public/img/jogo3.png";
import game4 from "../public/img/jogo4.jpg";

import novg from "../public/img/novidadesG.png";
import nov1 from "../public/img/nov1.png";
import nov2 from "../public/img/nov2.png";
import nov3 from "../public/img/nov3.png";

function App() {

  return (
    <>
    <Header />
      <div className="banner-app"></div>

      <div className="page2-app">
        <p className="titulo-p2-app">
          Descubra o Mundo Infinito do Minecraft: Explore, Construa e Sobreviva!
        </p>
        <div className="video-p2-app"></div>
      </div>

      <div className="page3-app">
        <p className="titulo-p3-app">
          Nossos jogos
        </p>
        <div className="spacegame-p3-app">
          <div className="game1-app">
            <img className="game-p3-app" src={game1} alt="Minecraft" />
          </div>
          <div className="game2-app">
            <img className="game-p3-app" src={game2} alt="Minecraft Legends" />
          </div>
          <div className="game3-app">
            <img className="game-p3-app" src={game3} alt="Minecraft Dungeons" />
          </div>
          <div className="game4-app">
            <img className="game-p3-app" src={game4} alt="Minecraft Story Mode" />
          </div>
        </div>
      </div>

      <div className="page4-app">
        <div className="titulo-p4-app">Novidades</div>
        <div className="spaceleft-p4-app">
          <img className="imgleft-p4-app" src={novg} alt="Imagem"/>
        </div>
        <div className="spaceimg-p4-app">
          <div className="spaceimg1-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Texto sobre a imagem</p>
            </div>
            <img className="img-p4-app" src={nov1} alt="img1" />
          </div>
          <div className="spaceimg2-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Texto sobre a imagem</p>
            </div>
            <img className="img-p4-app" src={nov2} alt="img2" />
          </div>
          <div className="spaceimg3-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Texto sobre a imagem</p>
            </div>
            <img className="img-p4-app" src={nov3} alt="img3" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
