import React, { useState, useEffect } from 'react';
import './FilterCheckbox.css';
import { useLocation } from 'react-router-dom';


function FilterCheckbox(props) {
  const { pathname } = useLocation();
  
  const [isChecked, setIsChecked] = useState(false); //Нажат ли чекбокс
  const [isCheckedSave, setIsCheckedSave] = useState(false); //Нажат ли чекбокс

  function handleCheckboxClick() {
    setIsChecked(!isChecked);
    props.onChange(!isChecked);
  }

  function handleCheckboxClickSave() {
    setIsCheckedSave(!isCheckedSave);
    props.onChangeSave(!isCheckedSave);
  }

  useEffect(() => {
    if (localStorage.getItem('isChecked') !== null) {
      setIsChecked(JSON.parse(localStorage.getItem('isChecked')));
    }
  }, [])

  return (
    <section className="filter">
      <label className="filter__container">
        {(pathname === "/movies") ?
          <>
            <input type="checkbox" className="filter__checkbox"
              checked={isChecked}
              onChange={handleCheckboxClick} />
            <span className="filter__slider round"></span>
          </>
          :
          <>
            <input type="checkbox" className="filter__checkbox"
              checked={isCheckedSave}
              onChange={handleCheckboxClickSave} />
            <span className="filter__slider round"></span>
          </>
        }
      </label>
      <p className="filter__text">Короткометражки</p>
    </section>
  )
}

export default FilterCheckbox;
