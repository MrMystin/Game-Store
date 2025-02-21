import React from "react";
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaWhatsapp, FaDiscord, FaReddit } from "react-icons/fa6";
import "./Rodape.css"
import mojang from "/img/mojang.png";
import xbox from "/img/xbox.webp";
import rating from "/img/rating.svg";

const Rodape = () => {
  const rodape = [
    { icon: <FaYoutube />, link: "https://www.youtube.com" },
    { icon: <FaInstagram />, link: "https://www.instagram.com" },
    { icon: <FaFacebookF />, link: "https://www.facebook.com" },
    { icon: <FaXTwitter />, link: "https://twitter.com" },
    { icon: <FaTiktok />, link: "https://www.tiktok.com" },
    { icon: <FaWhatsapp />, link: "https://web.whatsapp.com" },
    { icon: <FaDiscord />, link: "https://discord.com" },
    { icon: <FaReddit />, link: "https://www.reddit.com" },
  ];

  return (
    <>
    <div className="spaceall-rodape">
      <div className="social-container">
        <div className="titulo-rodape">SIGA O MINECRAFT</div>
        {rodape.map((item, index) => (
          <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="social-icon">
            {item.icon}
          </a>
        ))}
      </div>
      <div className="spacebottom-rodape">
        <img className="mojang-img-rodape" src={mojang} alt="Mojang" />
        <img className="xbox-img-rodape" src={xbox} alt="XBOX Game Studios" />
        <div className="spacegame-rodape">
          <p className="titulogame-rodape">Jogos</p>
          <p className="game1-rodape game-rodape">Minecraft</p>
          <p className="game2-rodape game-rodape">Minecraft Legends</p>
          <p className="game3-rodape game-rodape">Minecraft Dungeons</p>
          <p className="game4-rodape game-rodape">Minecraft Story Mode</p>
        </div>
        <img className="rating-img-rodape" src={rating} alt="10+" />
      </div>
    </div>
    </>
  );
};

export default Rodape;
