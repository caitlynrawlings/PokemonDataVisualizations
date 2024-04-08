import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import './PokemonList.css'; // Import the CSS file for styling
import SearchButton from '../../shared-components/SearchButton.js';
import PokemonDataGetter from './PokemonDataGetter.js';

const PokemonList = ({ leftWeightSetter, rightWeightSetter, leftHeightSetter, rightHeightSetter, leftNumSetter, rightNumSetter, leftImageSetter, rightImageSetter, style }) => {
  const [leftPokemon, setLeftPokemon] = useState('');
  const [rightPokemon, setRightPokemon] = useState('');
  const [leftWeight, setLeftWeight] = useState(0);  // weight for one left pokemon
  const [rightWeight, setRightWeight] = useState(0);  // weight for one right pokemon
  const [leftHeight, setLeftHeight] = useState(0);  // height for one left pokemon
  const [rightHeight, setRightHeight] = useState(0);  // height for one right pokemon
  const [leftImage, setLeftImage] = useState(null); 
  const [rightImage, setRightImage] = useState(null);  
  const [numLeft, setNumLeft] = useState(1);  // number of left pokemon being weighed
  const [numRight, setNumRight] = useState(1);  // number of right pokemon being weighed
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  

  const addLeftPokemon = (pokemon) => {
    console.log(pokemon)
    const name = pokemon[30]
    const weight = parseFloat(pokemon[38])
    const height = pokemon[27]
    const image = pokemon.imagePath
    setLeftPokemon(name)
    setLeftWeight(weight)
    setLeftHeight(height)
    setNumLeft(1)
    setLeftImage(image)
    leftWeightSetter(weight)
    leftHeightSetter(height)
    leftNumSetter(1)
    leftImageSetter(image)
  };

  const addRightPokemon = (pokemon) => {
    console.log(pokemon)
    const name = pokemon[30]
    const weight = parseFloat(pokemon[38])
    const height = pokemon[27]
    const image = pokemon.imagePath
    setRightPokemon(name)
    setRightWeight(weight)
    setRightHeight(height)
    setNumRight(1)
    setRightImage(image)
    rightWeightSetter(weight)
    rightHeightSetter(height)
    rightNumSetter(1)
    rightImageSetter(image)
  };

  const handleSearch = async (pokemon) => {
    setSearchTerm(pokemon)
    setSearchPerformed(true);
  };

  const handleSearchResult = (pokemonData) => {
    if (pokemonData !== null) {
        setSearchResult([...searchResult, pokemonData])
    }
    console.log(searchResult)
  }

  const handleSearchBoxChange = (value) => {
    setSearchPerformed(false);
    setSearchTerm(value);
    setSearchResult([])
  }

  const handleNumLeftChange = (event) => {
    const num = parseInt(event.target.value, 10)
    setNumLeft(num > 0 ? num : 1);
    leftNumSetter(num > 0 ? num : 1)
    leftWeightSetter(num > 0 ? leftWeight * num : leftWeight)
  };

  const handleNumRightChange = (event) => {
    const num = parseInt(event.target.value, 10)
    setNumRight(num > 0 ? num : 1);
    rightNumSetter(num > 0 ? num : 1)
    rightWeightSetter(num > 0 ? rightWeight * num : rightWeight)
  };

  const WeightInfoContainer = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    borderRadius: "5px",
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingBottom: '2%',
    paddingTop: '0%',
    justifyContent: 'center'
  }));


  return (
    <div className='grid-container' style={style}>
        <div className='weightInfo'>
            <WeightInfoContainer>
                  <h4>On the left: {leftPokemon}</h4>
                  {leftImage !== null ? <img src={leftImage} alt={leftPokemon} style={{ height: '40px' }} /> : <div className='image-placeholder'/>}
                  <label>
                  &nbsp;x&nbsp;
                  <input type="number" value={numLeft} onChange={handleNumLeftChange} style={{ width: '60px' }} />
                  </label>
            </WeightInfoContainer>
                    

                <div className='space-filler' style={{ width: '30%' }}/>

                <WeightInfoContainer>
                    <h4>On the right: {rightPokemon}</h4>
                        {rightImage !== null ? <img src={rightImage} alt={rightPokemon} style={{ height: '40px' }} /> : <div className='image-placeholder'/>}
                        <label>
                            &nbsp;x&nbsp;
                        <input type="number" value={numRight} onChange={handleNumRightChange} style={{ width: '60px' }} />
                        </label>
                </WeightInfoContainer>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'horizontal', width: '20vw', }}>
          <div className='search-con'>
            <SearchButton onSearchChange={handleSearchBoxChange} onSearch={() => handleSearch(searchTerm)} label={"Search"} style={{ justifyContent: 'center' }}/>
              {searchPerformed && (
              <PokemonDataGetter name={searchTerm} onSearchResult={() => handleSearchResult} handleLeftAdd={addLeftPokemon} handleRightAdd={addRightPokemon} />
            )}
          </div>
          <div style={{ position: 'fixed', width: '20vw', borderRight: '1px solid #bebebe', height: "100%" }} />
        </div>
      
    </div>
  );
};

export default PokemonList;
