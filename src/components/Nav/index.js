import React, { useState, useEffect } from "react";
import "./style.css";
import { CSSTransition } from "react-transition-group";
import { BrowserRouter, Link, Switch, Route, } from "react-router-dom";
import Home from "./../pages/Home";
import About from "./../pages/About";
import Portfolio from "./../pages/Portfolio";
import Contact from "./../pages/Contact";
import './../../assets/css/layout.css'
import './../../assets/css/style.css'

export default function Nav() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    
      <BrowserRouter>

        <header className="Header">
          <div className="Logo" alt="logo">Scott Kumor</div>
          <div className="Container">
          <CSSTransition
            in={!isSmallScreen || isNavVisible}
            timeout={350}
            classNames="NavAnimation"
            unmountOnExit
          >
            
            <nav className="Nav">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/contact">Contact</Link>
            </nav>

          </CSSTransition>
          <button onClick={toggleNav} className="Burger">
            <div className=" c-w">+</div>
          </button>
          </div>
        </header>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>

      </BrowserRouter>

  );
}