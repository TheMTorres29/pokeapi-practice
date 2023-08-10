import React from 'react';
import { Link } from 'react-router-dom';
import './Pokemon.css';

const Pokemon = ({ pokemon }) => {
  return (
    <Link className='pokemon-container' to={`/pokemon/${pokemon.id}`}>
        <div className="pkm-name-container">
            <h2 className='pkm-name'>{pokemon.name}</h2>
        </div>
        <div className="pkm-sprite-container">
            <img className='pkm-sprite' alt='No sprite atm :(' src={pokemon.sprites.other.home.front_default}/>
        </div>
    </Link>
  )
}

export default Pokemon