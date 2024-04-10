// React Imports
import React, { useEffect, useState } from "react";
import { readString } from "react-papaparse";
import pokemonData from "../../data/pokemon_info.csv"; // weight in col[38]; height in col[27]
import Papa from "papaparse";

import './pokemonData.css'

// MUI Imports
import Box from "@mui/material/Box";

const PokemonDataGetter = ({ name, onSearchResult, handleLeftAdd, handleRightAdd }) => {
  const [overallData, setOverallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    const fetchDescriptions = async () => {
      try {
        const response = await fetch(process.env.PUBLIC_URL + "/pokemon_descriptions.csv");
        const csvData = await response.text();
        const parsedData = Papa.parse(csvData, { header: true });
        const descriptionsMap = {};
        parsedData.data.forEach((row) => {
          descriptionsMap[row.Name] = row.Description;
        });
        setDescriptions(descriptionsMap);
      } catch (error) {
        console.error("Error fetching descriptions:", error);
      }
    };
    fetchDescriptions();
  }, []);

  const getAltText = (pokemonName) => {
    return descriptions[pokemonName] || "No description available";
  };

  const getImagePath = (pokemonName) => {
    return process.env.PUBLIC_URL + `/pokemon_images/${pokemonName}/0.jpg`;
  };

  const fetchData = async () => {
    try {
      const papaConfig = {
        complete: (results, file) => {
          console.log("Parsing complete:", results.data, file);
          setOverallData(results.data.slice(1));
        },
        download: true,
        error: (error, file) => {
          console.log("Error while parsing:", error, file);
        },
      };
      const data = await readString(pokemonData, papaConfig);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDataAndSetOverallData = async () => {
      const data = await fetchData();
      if (data) {
        setOverallData(data);
      }
    };

    fetchDataAndSetOverallData();
  }, []); // Empty dependency array to fetch data only once

  useEffect(() => {
    const filteredData = overallData.filter(
      (row) =>
        ((row[38] !== "") &&  // check weight field exists
          ((row[30] &&
          row[30].toLowerCase().indexOf(name.toLowerCase()) !== -1) || // substring search
        (row[37] && row[37].toLowerCase() === name.toLowerCase()) || // primary type search
        (row[38] && row[38].toLowerCase() === name.toLowerCase()))) // secondary type search
    ).map((row) => ({
      ...row,
      imagePath: getImagePath(row[30]),
    }));


  
    const weight = filteredData.length > 0 ? filteredData[0][38] : null;
    setFilteredData(filteredData);
    onSearchResult({ name, weight });
  }, [onSearchResult, overallData, name]);

  const handleLeftButtonClick = (pokemonData) => {
    handleLeftAdd(pokemonData);
  };

  const handleRightButtonClick = (pokemonData) => {
    handleRightAdd(pokemonData);
  };

  const renderSearchResult = () => {
    return filteredData.map((pokemonData, index) => (
      <Box key={index} sx={{ display: "flex", flexDirection: "row", margin: '5px' }}>
        <div style={{ backgroundColor: 'white', padding: '5px', borderRadius: '5px', height: '65px', marginTop: '10%', marginRight: '5%' }}>
          <img src={getImagePath(pokemonData[30])} alt={getAltText(pokemonData[30])} style={{ height: '55px' }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: '10px'}}>
          <span style={{ marginTop: '15px' }}>{pokemonData[30]}</span>
          <div className="side-selector" style={{ display: "flex", flexDirection: "row", marginTop: '5px'}}>
            <button onClick={() => handleLeftButtonClick(pokemonData)}>Left</button>
            <button onClick={() => handleRightButtonClick(pokemonData)} style={{ display: "flex", flexDirection: "row", marginLeft: '5px'}}>Right</button>
        </div>
        </div>
      </Box>

    ));
  };

  return renderSearchResult();
};

export default PokemonDataGetter;
