import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className='loader-container'>
        <h1 className='loading-title'>Loading Pokemon...</h1>
        <div className="pokeball-spin">
          <img className='pokeball-icon' alt="PokéBall" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png" />
        </div>
    </div>
  )
}

export default Loader