import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Papa from "papaparse";

const DataTable = ({ filteredData: pokemon }) => {
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
    return descriptions[pokemonName] || `No of description of ${pokemonName} available`;
  };


  const getImagePath = (pokemonName) => {
    return process.env.PUBLIC_URL + `/pokemon_images/${pokemonName}/0.jpg`;
  };

  return (
    <div>
      <table className="data-container">
        <thead>
          <tr>
            <th tabIndex={0} scope="col">Name</th>
            <th tabIndex={0} scope="col">Image</th>
            <th tabIndex={0} scope="col">Pokedex Number</th>
            <th tabIndex={0} scope="col">Height (m)</th>
            <th tabIndex={0} scope="col">Weight (kg)</th>
            <th tabIndex={0} scope="col">HP</th>
            <th tabIndex={0} scope="col">Attack</th>
            <th tabIndex={0} scope="col">Defense</th>
            <th tabIndex={0} scope="col">Special Attack</th>
            <th tabIndex={0} scope="col">Special Defense</th>
            <th tabIndex={0} scope="col">Speed</th>
            <th tabIndex={0} scope="col">Base Total</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.map((pokemon, index) => (
            <tr key={index}>
              <td tabIndex={0}>
                <Link
                  to={`/PokemonDataVisualizations/IndividualPokemon?filterName=${encodeURIComponent(
                    pokemon[30]
                  )}`}
                >
                  {pokemon[30]}
                </Link>
              </td>
              <td aria-labelledby={`${pokemon[30]}-label`} tabIndex={0}>
                <span id={`${pokemon[30]}-label`} style={{ display: "none" }}></span>
                <img
                  id={`${pokemon[30]}image`}
                  src={getImagePath(pokemon[30])}
                  alt={getAltText(pokemon[30])}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td tabIndex={0}>{pokemon[32]}</td>
              <td tabIndex={0}>{pokemon[27]}</td>
              <td tabIndex={0}>{pokemon[38]}</td>
              <td tabIndex={0}>{pokemon[28]}</td>
              <td tabIndex={0}>{pokemon[19]}</td>
              <td tabIndex={0}>{pokemon[25]}</td>
              <td tabIndex={0}>{pokemon[33]}</td>
              <td tabIndex={0}>{pokemon[34]}</td>
              <td tabIndex={0}>{pokemon[35]}</td>
              <td tabIndex={0}>{pokemon[22]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
