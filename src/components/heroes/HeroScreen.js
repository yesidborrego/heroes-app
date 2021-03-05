import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroById';

const HeroScreen = ({ history }) => {
  const { heroId } = useParams();
  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  if(!hero) return <Redirect to="/" />

  const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

  const handleReturn = () => {
    (history.length <= 2) ? history.push('/') : history.goBack();
  }

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`../assets/heroes/${heroId}.jpg`}
          alt={ superhero }
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{ superhero }</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>Alter ego: </strong>{ alter_ego }</li>
          <li className="list-group-item"><strong>Publisher: </strong>{ publisher }</li>
          <li className="list-group-item"><strong>First Appearance: </strong>{ first_appearance }</li>
        </ul>
        <p><strong>Characters: </strong><i>{ characters }</i></p>
        <hr />
        <button
          className="btn btn-outline-secondary"
          onClick={handleReturn}
        >
          Return
        </button>
      </div>
    </div>
  )
}

export default HeroScreen;