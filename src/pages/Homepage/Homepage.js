import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css'

// Components
import Pokemon from '../../components/Pokemon/Pokemon';
import Loader from '../../components/Loader/Loader';


const Homepage = () => {

    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadedPokemon, setLoadedPokemon] = useState([1,25]);
  
    let getPokemonList = async () => {
        let pokemonArray = [];
        // 1010 for SV, 905 Arceus
        for(let i = loadedPokemon[0]; i <= loadedPokemon[1]; i++){
            pokemonArray.push(await getPokemonData(i));
        }
        setPokemon(pokemonArray);
        setLoading(false);
    }

    let getPokemonData = async(id) => {
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    let queuePrevPokemon = () => {
        setLoading(true);
        // let paginationArray = [loadedPokemon[0]-25, loadedPokemon[1]-25];

        setLoadedPokemon([loadedPokemon[0]-25, loadedPokemon[1]-25]);
        getPokemonList();
    }

    let queueNextPokemon = () => {
        setLoading(true);
        // let paginationArray = [loadedPokemon[0]+25, loadedPokemon[1]+25];

        setLoadedPokemon([loadedPokemon[0]+25, loadedPokemon[1]+25]);
        getPokemonList();
    }

    const PrevArrow = () => {
        return (
            <>
                {loadedPokemon[0] !== 1 && (
                    <button className='load-prev' onClick={queuePrevPokemon}>&#171;</button>
                )}
            </>
        );
    }
    const NextArrow = () => {
        return (
            <>
                {loadedPokemon[1] <= 905 && (
                    <button className='load-next' onClick={queueNextPokemon}>&#187;</button>
                )}
            </>
        );
    }

    useEffect(() => {
        getPokemonList()
        console.log(loadedPokemon);
    }, [loadedPokemon])
    
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
                        <PrevArrow />
                        <NextArrow />
                    </div>
                </div>
            )}
        </>
  )
}

export default Homepage