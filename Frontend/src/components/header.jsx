import { useEffect, useState } from "react"; 

function Header({ scrollToSection, scrollToTopSection }) {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) { 
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);


    return (
        <>
         <div className={`header-app ${scrolled ? "scrolled" : ""}`}>
          <div className="logo-app">
            <img src="/img/download.png" alt="logo" />
          </div>
          <ul className="ul-app">
          <li className="game-app li-app" onClick={scrollToSection}>Sobre nós</li>
            <li className="about-app li-app" onClick={scrollToTopSection}>Nossos jogos</li>
            <li className="login-app li-app">Fazer login</li>
          </ul>
        </div>
        </>
    )

} 

export default Header;