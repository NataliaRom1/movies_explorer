import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
  const { pathname } = useLocation();

  return (
    <section className="search">
      {(pathname === "/movies") ?
        <>
          <form className="search__form" name="search" noValidate onSubmit={props.handleSubmit}>
            <input
              type="text"
              className="search__input"
              name="search"
              required
              id="search"
              placeholder="Фильм"
              value={props.searchQuery || ""}
              onChange={props.handleChange}
            />
            <button className="search__button button" type="submit" >Найти</button>
          </form>
          <FilterCheckbox
            onChange={props.handleCheckboxClick}
            isChecked={props.isChecked}
          />
        </>
        :
        <>
          <form className="search__form" name="search" noValidate onSubmit={props.handleSubmitSave}>
            <input
              type="text"
              className="search__input"
              name="search"
              required
              id="search"
              placeholder="Фильм"
              value={props.searchQuerySave || ""}
              onChange={props.handleChangeSave}
            />
            <button className="search__button button" type="submit" >Найти</button>
          </form>
          <FilterCheckbox
            onChangeSave={props.handleCheckboxClickSave}
            isCheckedSave={props.isCheckedSave}
          />
        </>
      
      }

    </section>
  )
}

export default SearchForm;
