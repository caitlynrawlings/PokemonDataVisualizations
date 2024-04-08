// React Imports
import React, { useEffect, useState } from "react";
import { readString } from "react-papaparse";
import pokemonData from "../../data/pokemon_info.csv";

// MUI Imports
import Box from "@mui/material/Box";
import DataTable from "./DataTable";

const PokemonResults = ({ searchTerm }) => {
  const [overallData, setOverallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const papaConfig = {
      complete: (results, file) => {
        console.log("Parsing complete:", results.data, file);
        setOverallData(results.data.slice(1));
        setFilteredData(results.data.slice(1))
      },
      download: true,
      error: (error, file) => {
        console.log("Error while parsing:", error, file);
      },
    };
    readString(pokemonData, papaConfig);
  }, []); // Empty dependency array to fetch data only once

  useEffect(() => {
    if (typeof searchTerm === "string") {
      if (searchTerm === '') {
        setFilteredData(overallData)
        return
      } else {
        const filteredData = overallData.filter(
          (row) =>
            (row[30] &&
            row[30].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  // substring search
            // row[37] = type1
            // row[38] = type2
            || (row[37] && row[37].toLowerCase() === searchTerm.toLowerCase())  // primary type search
            || (row[38] && row[38].toLowerCase() === searchTerm.toLowerCase())  // secondary type search
        );
        console.log("filtereddata " + filteredData)
        setFilteredData(filteredData);
      }
    }
  }, [searchTerm, overallData]);

  const renderPokemonTables = () => {
    return (
      <DataTable
        filteredData={filteredData}
      />
    );
  };

  return <Box>{renderPokemonTables()}</Box>;
};

export default PokemonResults;