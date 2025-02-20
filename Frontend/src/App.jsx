import { useEffect, useState, useRef } from "react"; // Importa os hooks necessários
import "./App.css";
import Header from "./components/header";
import SocialLinks from "./components/SocialLinks";
import "./components/SocialLinks"

// import back from "../public/img/background.png"

import game1 from "/img/jogo1.png";
import game2 from "/img/jogo2.png";
import game3 from "/img/jogo3.png";
import game4 from "/img/jogo4.jpg";

import novg from "/img/novidadesG.png";
import nov1 from "/img/nov1.png";
import nov2 from "/img/nov2.png";
import nov3 from "/img/nov3.png";

import sobre1 from "/img/sobre1.png";
import sobre2 from "/img/sobre2.png";
import sobre3 from "/img/sobre3.png";

function App() {

  const sectionRef = useRef(null);
  const topSectionRef = useRef(null);

  const scrollToSection = () => {
    if (sectionRef.current) {
      const offset = 85; 
      const topPosition = sectionRef.current.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  const scrollToTopSection = () => {
    if (topSectionRef.current) {
      const offset = 100;
      const topPosition = topSectionRef.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  return (
    <>
    <Header scrollToSection={scrollToSection} scrollToTopSection={scrollToTopSection}/>

      <div className="banner-app"></div>

      <div className="page2-app">
        {/* <img className="back-app" src={back} alt="background" /> */}
        <p className="titulo-p2-app">
          Descubra o Mundo Infinito do Minecraft: Explore, Construa e Sobreviva!
        </p>
        <div className="video-p2-app"></div>
      </div>

      <div className="page3-app">
        <p className="titulo-p3-app" ref={topSectionRef}>
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
          <div className="spacetextleft-app">
            <p>Novas armas, objetos, mobs, biomas e modos estão disponíveis!</p>
          </div>
        </div>
        <div className="spaceimg-p4-app">
          <div className="spaceimg1-p4-app spaceright-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Construções novas nos mapas!</p>
            </div>
            <img className="img-p4-app" src={nov1} alt="img1" />
          </div>
          <div className="spaceimg2-p4-app spaceright-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Modo multiplayer habilitado em todos os modos!</p>
            </div>
            <img className="img-p4-app" src={nov2} alt="img2" />
          </div>
          <div className="spaceimg3-p4-app spaceright-p4-app">
            <div className="spacetext-p4-app">
              <p className="textimg-p4-app">Novos blocos já disponíveis nessa atualização!</p>
            </div>
            <img className="img-p4-app" src={nov3} alt="img3" />
          </div>
        </div>
      </div>

      <div className="page5-app">
        <div className="titulo-p5-app" ref={sectionRef}>Sobre nós</div>
          <div className="space1-p5-app space-p5-app">
            <div className="about-p5-app">
              <div className="aboutspace-p5-app">
                <p className="titulo-aboutp5-app">Descrição da foto</p>
                <p className="text-p5-app">
                Lorem ipsun Lorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                </p>
              </div>
              <img className="img-p5-app" src={sobre1} alt="foto1" />
            </div>
          </div>
          <div className="space2-p5-app space-p5-app">
            <div className="about-p5-app">
              <div className="aboutspace2-p5-app aboutspace-p5-app">
                <p className="titulo-aboutp5-app">Descrição da foto</p>
                <p className="text-p5-app">
                Lorem ipsun Lorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                </p>
              </div>
              <img className="img2-p5-app img-p5-app" src={sobre2} alt="foto1" />
            </div>
          </div>
          <div className="space3-p5-app space-p5-app">
            <div className="about-p5-app">
              <div className="aboutspace-p5-app">
                <p className="titulo-aboutp5-app">Descrição da foto</p>
                <p className="text-p5-app">
                Lorem ipsun Lorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                Lorem ipsunLorem ipsun Lorem ipsun
                </p>
              </div>
                <img className="img-p5-app" src={sobre3} alt="foto1" />
            </div>
          </div>
      </div>

      <div className="rodape-app">
        <div className="spaceicons-rod-app">
          <SocialLinks/>
        </div>
      </div>
    </>
  );
}

export default App;
