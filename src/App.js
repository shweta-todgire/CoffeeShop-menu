import React, { useRef, useLayoutEffect, useEffect, useState } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

import logo from "./assets/Logo.png";
import coffeeCup from "./assets/Coffee-cup.png";

import espresso from "./assets/espresso.png";
import cappuccino from "./assets/cappuccino.png";
import latte from "./assets/latte.png";
import icedcoffee from "./assets/icedcoffee.png";
import mocha from "./assets/mocha.png";
import macchiato from "./assets/macchiato.png";
import americano from "./assets/americano.png";

import hotcoffee1 from "./assets/Hot_coffee.png";
import hotcoffee2 from "./assets/Hot-Coffee.png";
import matcha from "./assets/Matcha.png";
import icedcoffe from "./assets/Iced-Coffee.png";
import muffin from "./assets/Muffin.png";
import fries from "./assets/Fries.jpg";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const cupRef = useRef(null);
  const aboutRef = useRef(null);
  const waveRef = useRef(null);
  const sloganRef = useRef(null);
  const menuRowsRef = useRef([]);

  // Carousel images
  const images = [espresso, cappuccino, latte, icedcoffee, mocha, macchiato, americano];
  const [index, setIndex] = useState(1);

  // GSAP animations for slogan and hero coffee
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!cupRef.current || !aboutRef.current || !waveRef.current || !sloganRef.current) return;

      gsap.from(sloganRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      const cardRect = aboutRef.current.querySelector(".about-card").getBoundingClientRect();
      const cupRect = cupRef.current.getBoundingClientRect();

      const targetX = cardRect.left + cardRect.width / 2 - (cupRect.left + cupRect.width / 2);
      const targetY = cardRect.top + cardRect.height / 2 - (cupRect.top + cupRect.height / 2);

      gsap.fromTo(
        cupRef.current,
        { x: 0, y: 0, scale: 1.2, rotation: -20 },
        {
          x: targetX,
          y: targetY,
          scale: 1,
          rotation: 0,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );

      // Animate menu rows smoothly from left or right
      menuRowsRef.current.forEach((row, i) => {
        if (!row) return;
        const direction = i % 2 === 0 ? -100 : 100;
        gsap.from(row, {
          x: direction,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Carousel auto-slide
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(slider);
  }, [index]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  // Menu data
  const menuData = [
    {
      type: "Cold Coffees",
      imgFront: icedcoffe,
      imgBack: matcha,
      items: [
        { name: "Iced Americano", price: "₹120 / ₹150" },
        { name: "Cold Latte", price: "₹140 / ₹170" },
        { name: "Mocha Frappe", price: "₹160 / ₹190" },
        { name: "Matcha Latte", price: "₹200 / ₹240" },
        { name: "Caramel Iced Coffee", price: "₹180 / ₹210" },
      ],
    },
    {
      type: "Hot Coffees",
      imgFront: hotcoffee1,
      imgBack: hotcoffee2,
      reverse: true,
      items: [
        { name: "Espresso Shot", price: "₹90 / ₹120" },
        { name: "Hot Cappuccino", price: "₹130 / ₹160" },
        { name: "Flat White", price: "₹150 / ₹180" },
        { name: "Turkish Coffee", price: "₹120 / ₹170" },
        { name: "Americano", price: "₹100 / ₹140" },
        { name: "Hot Mocha", price: "₹170 / ₹200" },
      ],
    },
    {
      type: "Snacks",
      imgFront: muffin,
      imgBack: fries,
      items: [
        { name: "Dutch Truffle Pastry", price: "₹110" },
        { name: "Chocolate Pastry", price: "₹95" },
        { name: "Blueberry Donut", price: "₹70" },
        { name: "Chocolate Muffin", price: "₹80" },
        { name: "Chili Cheese Sticks", price: "₹105" },
        { name: "Vegetable Sandwich", price: "₹100" },
        { name: "Cheese Garlic Bread", price: "₹110" },
        { name: "Crispy Fries", price: "₹90" },
      ],
    },
  ];

  return (
    <div className="App">
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="FreshPour Logo" className="logo" />
      </div>

      {/* Wave Section */}
      <section className="wave-section" ref={waveRef}>
        <div className="slogan" ref={sloganRef}>
          <h1>Brewed Fresh, Served with Love!!</h1>
          <p>Fresh Taste. Warm Heart. Every Pour Matters.</p>
        </div>

        <div className="hero-coffee" ref={cupRef}>
          <img src={coffeeCup} alt="Coffee Cup" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutRef}>
        <div className="about-card"></div>
        <div className="about-text">
          <h2>About FreshPour</h2>
          <p>
            At FreshPour, we believe coffee should be fresh, bold, and comforting.
            Our beans are sourced from quality growers, roasted with precision,
            and brewed to perfection. Whether you’re here for a peaceful break,
            a work session, or a cozy chat, we create a space where great coffee meets great experiences.
          </p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="slideshow-section">
        <h2 className="slider-title">Popular Picks</h2>
        <div className="carousel-wrapper">
          <div className="carousel">
            {images.map((img, i) => {
              const offset = i - index;
              return (
                <motion.div
                  key={i}
                  className="carousel-card"
                  animate={{
                    x: offset * 260,
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset === 0 ? 1 : 0.4,
                    filter: offset === 0 ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <img src={img} alt={`slide-${i}`} />
                </motion.div>
              );
            })}
          </div>
          <button className="arrow left" onClick={prev}>‹</button>
          <button className="arrow right" onClick={next}>›</button>
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section">
        <h1 className="menu-heading">~ FreshPour Menu ~</h1>

        {menuData.map((menu, idx) => (
          <div
            key={idx}
            className={`menu-row ${menu.reverse ? "reverse" : ""}`}
            ref={(el) => (menuRowsRef.current[idx] = el)}
          >
            {/* Flip Image */}
            <div className="menu-image">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={menu.imgFront} alt={`${menu.type} Front`} />
                  </div>
                  <div className="flip-card-back">
                    <img src={menu.imgBack} alt={`${menu.type} Back`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Menu List */}
            <div className="menu-list">
              <h2>{menu.type}</h2>
              <div className="menu-price-header">
                <span>Item</span>
                <span>{menu.type === "Snacks" ? "Price" : "Regular | Large"}</span>
              </div>
              <ul>
                {menu.items.map((item, i) => (
                  <li key={i}>
                    <span>{item.name}</span>
                    <p>{item.price}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-item">
            <h3>Email</h3>
            <p>contact@freshpour.com</p>
          </div>
          <div className="footer-item">
            <h3>Phone</h3>
            <p>+91 12345 67890</p>
          </div>
          <div className="footer-item">
            <h3>Address</h3>
            <p>123 Coffee Street, Brewtown, India</p>
          </div>
        </div>
        <p className="footer-copy">© 2025 FreshPour. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;
