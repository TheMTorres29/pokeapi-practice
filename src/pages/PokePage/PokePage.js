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
                        <Link to={'/'} className="go-back-container">
                            <button className='back-btn'>Go back</button>
                        </Link>
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

                        <div className="pokedata-details-container">
                            <h2 className="pokedata-title">Pokemon Details</h2>
                            <h3 className="pokedata-weight">Weight: {pokemonDetails.weight}</h3>
                            <h3 className="pokedata-height">Height: {pokemonDetails.height}</h3>
                        </div>

                        <div className="pokedata-stats-container">
                            <h2 className="pokedata-title">Stats</h2>
                            {pokemonDetails.stats.map(s => (
                                <div className={`pokedata-stats`}>
                                    <h3 className='pokedata-stats-name'>{s.stat.name}: {s.base_stat}</h3>
                                </div>
                            ))}
                        </div>
                        
                        <div className="pokedata-abilities-container">
                            <h2 className="pokedata-title">Abilities</h2>
                            {pokemonDetails.abilities.map(a => (
                                <div className={`pokedata-abilities`}>
                                    <h3 className='pokedata-abilities-name'>{a.ability.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
            )}
        </>
    )
}
export default PokePage