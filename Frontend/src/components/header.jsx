import { useEffect, useState } from "react"; 

function Header() {

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
            <li className="about-app li-app">sobre nós</li>
            <li className="game-app li-app">Nossos jogos</li>
            <li className="login-app li-app">Fazer login</li>
          </ul>
        </div>
        </>
    )

} 

export default Header;