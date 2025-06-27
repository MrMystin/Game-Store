import React, { useEffect, useState } from "react";
import "./header.css";
import logo from "/img/logo.svg";

function Header({ scrollToSection, scrollToTopSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 400);
    };

    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`header-app ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-app">
          <img
            src={logo}
            alt="logo"
            onClick={() => (window.location.href = "/")}
          />
        </div>

        <ul className="ul1-app">
          <li className="game-app li-app" onClick={scrollToTopSection}>
            <div className="text-header">Nossos jogos</div>
            <div className="borderbottom-header"></div>
          </li>
        </ul>

        <ul className="ul2-app">
          <li className="about-app li-app" onClick={scrollToSection}>
            <div className="text-header">Sobre nós</div>
            <div className="borderbottom-header"></div>
          </li>
        </ul>

        {isLoggedIn && (
          <ul className="ul3-app">
            <li className="cart-app li-app">
              <div className="text-header">
                🛒
              </div>
              <div className="borderbottom-header"></div>
            </li>
            <li className="login-app li-app">
              <div className="text-header">
                <a href="/account">Account</a>
              </div>
              <div className="borderbottom-header"></div>
            </li>
          </ul>
        )}

        {!isLoggedIn && (
          <ul className="ul3-app">
            <li className="login-app li-app">
              <div className="text-header">
                <a href="/login">Fazer login</a>
              </div>
              <div className="borderbottom-header"></div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Header;
