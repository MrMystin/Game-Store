import { useEffect, useState, useRef } from "react"; // Importa os hooks necessários
import "./App.css";
import Header from "./components/header/header";
import Rodape from "./components/footer/footer";

import video from "/video/homeVideo.mp4";
import gameplayVideo from "/video/gameplayVideo.mp4"

import game1 from "/img/mine.png";
import game2 from "/img/mine_legends.png";
import game3 from "/img/mine_dungeons.png";
import game4 from "/img/mine_education.png";


import novg from "/img/novidadesG.png";
import nov1 from "/img/nov1.png";
import nov2 from "/img/nov2.png";
import nov3 from "/img/nov3.png";

import sobre1 from "/img/sobre1.png";
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

  const videoRef = useRef(null);

  function playVideo() {
    console.log('a');
    var video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  return (
    <>
    <img className="background-app" src={novg} alt="" />

    <Header scrollToSection={scrollToSection} scrollToTopSection={scrollToTopSection}/>

      <div className="banner-app">
        <video 
          src={video} 
          autoPlay 
          loop 
          muted 
          controls={false} 
          controlsList="nodownload nofullscreen noremoteplayback"
          style={{ pointerEvents: "none" }}
        ></video>
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

      <div className="page3-app">
        <p className="titulo-p3-app" ref={topSectionRef}>
          Nossos jogos
        </p>
        <div className="spacegame-p3-app">
          <img className="game-p3-app game1-app" src={game1} alt="Minecraft" />
          <img className="game-p3-app game2-app" src={game2} alt="Minecraft Legends" />
          <img className="game-p3-app game3-app" src={game3} alt="Minecraft Dungeons" />
          <img className="game-p3-app game4-app" src={game4} alt="Minecraft Story Mode" />
        </div>
      </div>

      <div className="page2-app">
        <p className="titulo-p2-app">
          Descubra o Mundo Infinito do Minecraft: Explore, Construa e Sobreviva!
        </p>
        <div className="video-p2-app">
          <video onClick={playVideo} ref={videoRef} data-src={gameplayVideo} loop muted playsInline preload="auto">
            <source src={gameplayVideo} type="video/mp4" />
          </video>
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
          <Rodape/>
    </>
  );
}

export default App;