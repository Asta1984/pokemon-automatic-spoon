import React, { useState } from 'react';
import About from './Tabs/About';
import BaseStats from './Tabs/BaseStats';
import Evolution from './Tabs/Evolution';
import './Details.css';
import { usePokemons } from '../../context/PokemonsProvider';

function Details( { pokemon } ) {
	const [ tab, setTab ] = useState( 'about' );
	const { setCurrentPokemonId } = usePokemons();

	if ( ! pokemon ) {
		return null;
	}

	// get pokemon image
	const sprites = pokemon.sprites.other;
	const imgURL = sprites.dream_world.front_default || sprites[ 'official-artwork' ].front_default;

	// handle tab switching
	const switchTab = ( e ) => {
		e.preventDefault();
		setTab( e.target.dataset.tab );
	};

	// return tab switch class name
	const getClassName = ( tabName ) => {
		return `tab-switch ${ tab === tabName ? 'active' : '' }`;
	};

	// change pokemon data & go to first tab
	const changePokemon = ( pokemonData ) => {
		setTab( 'about' );
		setCurrentPokemonId( pokemonData.id );
	};

	return (
		<div className="details">

			<img src={ imgURL } className="pokemon-image" alt={ pokemon.name } />

			<div className="tabs-switch-container">

				<button className={ getClassName( 'about' ) } data-tab="about" onClick={ switchTab }>About</button>
				<button className={ getClassName( 'base-stats' ) } data-tab="base-stats" onClick={ switchTab }>Base Stats</button>
				<button className={ getClassName( 'evolution' ) } data-tab="evolution" onClick={ switchTab }>Evolution</button>

			</div>

			{ tab === 'about' &&
                <About pokemon={ pokemon } />
			}

			{ tab === 'base-stats' &&
                <BaseStats stats={ pokemon.stats } />
			}

			{ tab === 'evolution' &&
                <Evolution pokemon={ pokemon } changePokemon={ changePokemon } />
			}

		</div>
	);
}

export default Details;
