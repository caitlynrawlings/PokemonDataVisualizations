// React Imports
import React, { useState } from 'react';
import PokemonResults from './PokemonResults.js';
// import {useNavigate} from 'react-router-dom';

// MUI Imports
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SearchButton from '../../shared-components/SearchButton.js'; // Importing SearchComponent

const Search = () => {
    // const navigate = useNavigate(); // use for page navigation later
    const [searchValue, setSearchValue] = useState('');
    const [pokemonList, setPokemonList] = useState([]);

    const handleSearchChange = (newValue) => {
        setSearchValue(newValue);
    };

    const handleSearch = () => {
        // Perform search operation here, for now, let's just set the pokemonList to contain the searchValue
        setPokemonList(searchValue);
    };

    return (
        <Box>
            <Typography>
                <div style={{ width: '50%', padding: '10px' }}>
                    <SearchButton onSearchChange={handleSearchChange} onSearch={handleSearch} label={"Search"}/> {/* Passing callback functions */}
                </div>
                <PokemonResults searchTerm={pokemonList}/>
            </Typography>
        </Box>
    )
}

export default Search;
