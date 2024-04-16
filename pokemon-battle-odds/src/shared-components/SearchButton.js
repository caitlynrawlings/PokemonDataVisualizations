import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './SearchButton.css'

function SearchButton({ onSearchChange, onSearch, label }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(); // Invoking the onSearch function passed from the parent component
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    onSearchChange(e.target.value); // Invoking the onSearchChange function passed from the parent component
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (

    <div className='wrap'>
      <div className="search">
          <input type="text" 
                 value={searchValue} 
                 onChange={handleChange} 
                 onKeyUp={handleKeyPress}
                 className="searchTerm" 
                 placeholder="Search for pokemon"/>
          <button onClick={handleSearch} className="searchButton" aria-label='search'>
            <SearchIcon/>
        </button>
      </div>
    </div>
  );
}

export default SearchButton;
