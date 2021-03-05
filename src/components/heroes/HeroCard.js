import React from 'react'
import { Link } from 'react-router-dom'

export const HeroCard = ({hero}) => {
  return (
    <div className="col animate__animated animate__fadeIn">
      <div className={`card m-3 ${hero.publisher === 'DC Comics' ? 'border-warning' : 'border-danger'}`} style={{ maxWidth: 540 }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={`./assets/heroes/${hero.id}.jpg`} className="card-img" alt={hero.superhero} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-text">{ hero.superhero }</h5>
              {/*<p className="card-text">{ hero.alter_ego }</p>*/}
              {
                // (hero.alter_ego !== hero.characters) && <p className="card-text">{ hero.characters }</p>
              }
              {/*<p className="card-text">
                <small className="text-muted">{ hero.first_appearance }</small>
              </p>*/}
              <Link to={`/hero/${hero.id}`}>
                See more...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
