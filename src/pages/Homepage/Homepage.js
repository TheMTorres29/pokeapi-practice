import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css'

// Components
import Pokemon from '../../components/Pokemon/Pokemon';
import Loader from '../../components/Loader/Loader';


const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedPokemon, setLoadedPokemon] = useState(25);
  
    let getPokemonList = async () => {
        let pokemonArray = [];
        // 1010 for SV
        for(let i = 1; i <= loadedPokemon; i++){
            pokemonArray.push(await getPokemonData(i));
        }
        console.log(pokemonArray);
        setPokemon(pokemonArray);
        setLoading(false);
    }

    let getPokemonData = async(id) => {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    let queueMorePokemon = () => {
        console.log(loadedPokemon);
        setLoading(true);
        setLoadedPokemon(loadedPokemon+25);
        getPokemonList();
    }

    useEffect(() => {
        getPokemonList();
    }, [])
    
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='homepage-container'>
                    <div className='row'>
                        {pokemon.map(p => (
                            <div className='col' key={p.data.name}>
                                <h3 className="pkm-no">{p.data.id}</h3>
                                <div className="poke-container">
                                    <Pokemon pokemon={p.data}/>
                                </div>
                            </div>
                        ))}     
                    </div>
                    <div className="load-more-container">
                        <button className='load-more' onClick={queueMorePokemon}>Load more Pokemon</button>
                    </div>
                </div>
            )}
        </>
  )
}

export default Homepage