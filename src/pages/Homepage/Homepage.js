import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Homepage.css'

// Components
import Pokemon from '../../components/Pokemon/Pokemon';
import Loader from '../../components/Loader/Loader';


const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const getPokemonList = async () => {
        let pokemonArray = [];
        for(let i = 1; i <= 1010; i++){
            pokemonArray.push(await getPokemonData(i));
        }
        console.log(pokemonArray);
        setPokemon(pokemonArray);
        setLoading(false);
    }

    const getPokemonData = async(id) => {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
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
                                <Pokemon pokemon={p.data}/>
                            </div>
                        ))}     
                    </div>
                </div>
            )}
        </>
  )
}

export default Homepage