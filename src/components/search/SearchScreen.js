import React, { useMemo } from 'react'
import queryString from "query-string";
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesBySearch } from '../../selectors/getHeroesBySearch';

const SearchScreen = ({ history }) => {
  const location = useLocation();
  const { q = ''} = queryString.parse(location.search);

  const [{searchHero}, handleInputChange] = useForm({
    searchHero: q
  });

  const heroesFiltered = useMemo(() => getHeroesBySearch(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`?q=${searchHero}`);
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <h1>Search Screen</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Serach Form</h4>
          <hr />
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="searchHero"
              placeholder="Find your hero"
              className="form-control"
              onChange={handleInputChange}
              value={searchHero}
            />
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary mt-3 btn-block"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {
            (q === '')
            ?
              <div className="alert alert-info alert alert-info animate__animated animate__fadeIn">
                Search a Hero
              </div>
            :
              (heroesFiltered.length === 0 ) &&
              <div className="alert alert-danger animate__animated animate__zoomIn">
                Heroes not found
              </div>
          }
          {
            heroesFiltered.map(hero => (
              <HeroCard
                key={hero.id}
                hero={hero}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SearchScreen;
