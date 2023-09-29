import './Burger.css';
import React from 'react';

function Burger(props) {
  return (
    <section className="burger">
      <div>
        {props.isOpen ?
          <button className="button burger__close-button" onClick={props.onClose}></button>
          :
          <button className="button burger__open-button" onClick={props.onBurgerClick}></button>
        }
      </div>
    </section>
  )
}

export default Burger;
