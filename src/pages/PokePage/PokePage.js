import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './PokePage.css';
import shinyStar from '../../assets/images/shinystars.png';

// Components
import Loader from '../../components/Loader/Loader';

const PokePage = ({ match }) => {
    const [pokemonDetails, setPokemonDetails] = useState();
    const [loading, setLoading] = useState(true);
    const [shiny, setShiny] = useState(false);

    let { id } = useParams();

    const setShinySprite = async( shiny ) => {
        setShiny(!shiny);
    }

    const getPokemon = async() => {
        const details = await getPokemonData(id);
        setPokemonDetails(details.data);
        console.log(details.data)
        setLoading(false);
        console.log('Got Pokemon')
    }

    const getPokemonData = async(id) => {
        console.log('gettingpkm');
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        return res;
    }

    useEffect(() => {
        getPokemon(id);
    }, [])

    return (
        <>
            {loading ? (
                    <Loader/>
                ) : (
                    <div className='pokepage-container'>
                        <div className="pokedata-name-container">
                            <h2 className="pokedata-name">{pokemonDetails.name}</h2>
                        </div>
                        <div className="pokedata-img-container">
                            { shiny ? (
                                <>
                                    <div className="shiny-star-container"><img onClick={() => setShinySprite(shiny)} src={shinyStar} alt="shiny-star" className="shinystar-on" /></div>
                                    <img className='pokedata-img' src={pokemonDetails.sprites.other.home.front_shiny} alt="pkm-img" />
                                </>

                            ) : (
                                <>
                                    <div className="shiny-star-container"><img onClick={() => setShinySprite(shiny)} src={shinyStar} alt="shiny-star" className="shinystar-off" /></div>
                                    <img className='pokedata-img' src={pokemonDetails.sprites.other.home.front_default} alt="pkm-img" />
                                </>
                            )}
                        </div>
                        <div className="pokedata-types-container">
                                {pokemonDetails.types.map(t => (
                                    <div className={`pokedata-types ${t.type.name}`}>
                                        <h2 className='pokedata-types-name'>{t.type.name}</h2>
                                    </div>
                                ))}
                        </div>
                    </div>
            )}
        </>
    )
}
export default PokePage