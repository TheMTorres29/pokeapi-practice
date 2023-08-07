import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [chosen, setChosen] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "", 
    sprite: "",
    type: "",
  });

  const searchPokemon = () => {
    let loweredName = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${loweredName}`).then((response)=> {
      setPokemonData({
        name: pokemonName, 
        sprite: response.data.sprites.front_default,
        type: response.data.types[0].type.name,
        });
        setChosen(true);
      }
      
    )
  }
  return (
    <div className="App">
      {/* Title Section */}
      <div className="title-section">
        <h1 className="app-title">PokeAPI Practice</h1>
        <div className="search-container">
          <input className="poke-input" type="text" placeholder='Type Pokemon name...' onChange={(event) => {setPokemonName(event.target.value)}}/>
          <button onClick={searchPokemon} className="poke-search">Search</button>
        </div>
      </div>

      {/* Pokemon Being Displayed Section */}
      <div className="pokemon-section">
        {!chosen ? (<h1>Choose your Pokemon!</h1>) :
        (
          <>
            <h1>{pokemonData.name}</h1>
            <img alt='pkm-sprite' className='pkm-sprite' src={pokemonData.sprite} />
            <h3>Type: {pokemonData.type}</h3>
          </>
        )}
      </div>
      
    </div>
  );
}

export default App;
