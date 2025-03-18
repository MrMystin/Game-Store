import { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/header/header";
import Rodape from "./components/footer/footer";
import video from "/video/homeVideo.mp4";
import gameplayVideo from "/video/gameplayVideo.mp4";
import fundo from "/img/fundo.png";
import game1 from "/img/mine.png";
import game2 from "/img/mine_legends.png";
import game3 from "/img/mine_dungeons.png";
import game4 from "/img/mine_education.png";
import novg from "/img/novidadesG.png";
import nov1 from "/img/nov1.png";
import nov2 from "/img/nov2.png";
import nov3 from "/img/nov3.png";
import sobre1 from "/img/sobre1.png";
import sobre2 from "/img/sobre2.png";
import iconPlay from "/img/iconPlay.png";
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate();
  const [mostrarSpan, setMostrarSpan] = useState(false); 
  const [pause, setPause] = useState(false); 
  const [actualWord, setActualWord] = useState(false); 
  const sectionRef = useRef(null);
  const topSectionRef = useRef(null);
  const [products, setProducts] = useState([])
  let counter = 1; 

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
      setMostrarSpan(true); 
      setPause(false)
    } else {
      setActualWord(window.getComputedStyle(document.getElementsByClassName("troca-palavra")[0], "::after").content.replace(/['"]/g, ""))
      setPause(true)
      video.pause();
    }
  }

  async function fetchProducts() {
    try {
      const response = await fetch('http://localhost:3000/products/listAll');
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <img className="background-app" src={fundo} alt="" />

    <Header scrollToSection={scrollToSection} scrollToTopSection={scrollToTopSection}/>

      <div className="banner-app">
        <video 
          className="video-banner-app"
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
          {products.map((product) => {
            return <img key={product.id} onClick={() => navigate(`/games/${product.id}`)} className={`game-p3-app game${counter ? counter++ : ''}-app`} src={`http://localhost:3000/images/${product.id}/${product.photos.find(photo => photo.type === "banner").photo}`}  alt={`${product.name}`} />
          })}
        </div>
      </div>
      <div className="page2-app">
        <p className="titulo-p2-app">
          Descubra o Mundo Infinito do Minecraft
          {mostrarSpan && (
            <>: <span className={`troca-palavra ${pause ? "pause" : ""}`} data-content={pause ? actualWord : ""}></span></>
          )}
        </p>
        <div className="video-p2-app">
          <video onClick={playVideo} poster={iconPlay} ref={videoRef} data-src={gameplayVideo} loop muted playsInline preload="auto">
            <source src={gameplayVideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <div className="page5-app">
        <div className="titulo-p5-app" ref={sectionRef}>Sobre nós</div>
          <div className="space1-p5-app space-p5-app">
            <div className="about-p5-app">
              <div className="aboutspace-p5-app">
                <p className="titulo-aboutp5-app">Programadores</p>
                <p className="text-p5-app">
                Transformamos ideias em soluções tecnológicas eficientes, 
                combinando inovação, criatividade e expertise para 
                desenvolver sistemas, apps e sites que fazem a diferença. 
                </p>
              </div>
              <img className="img-p5-app" src={sobre1} alt="foto1" />
            </div>
          </div>

          <div className="space3-p5-app space-p5-app">
            <div className="about-p5-app">
              <div className="aboutspace-p5-app">
                <p className="titulo2-aboutp5-app titulo-aboutp5-app">Exploradores do Código</p>
                <p className="text-p5-app">
                Assim como em um mundo cheio de desafios e aventuras, encaramos 
                a programação como uma jornada épica. Criamos, inovamos e desbravamos 
                novas possibilidades com tecnologia. Nosso objetivo é transformar 
                ideias em realidade, construindo soluções digitais que fazem a diferença.
                </p>
              </div>
                <img className="img-p5-app" src={sobre2} alt="foto1" />
            </div>
          </div>
      </div>
          <Rodape/>
    </>
  );
}

export default App;