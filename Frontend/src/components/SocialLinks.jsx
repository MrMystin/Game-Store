import React from "react";
import { FaYoutube, FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaWhatsapp, FaDiscord, FaReddit } from "react-icons/fa6";
import "./SocialLinks.css"

const SocialLinks = () => {
  const socialMedia = [
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
    <div className="social-container">
      {socialMedia.map((item, index) => (
        <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="social-icon">
          {item.icon}
        </a>
      ))}
    </div>
    </>
  );
};

export default SocialLinks;
