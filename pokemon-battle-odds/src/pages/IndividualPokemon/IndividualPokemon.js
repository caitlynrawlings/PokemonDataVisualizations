import React, { useEffect, useState } from "react";
import { readString } from "react-papaparse";
import { useLocation } from "react-router-dom";
import pokemonData from "../../data/pokemon_info.csv";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import DataSheet from "./DataSheet";
import StatDistributions from "./StatDistributions";
import { useNavigate } from "react-router-dom";

const IndividualPokemon = () => {
  const location = useLocation();
  const filterName = new URLSearchParams(location.search).get("filterName");
  const navigate = useNavigate();

  // Function to navigate to the StatFilter component
  const navigateToStatFilter = (filteredDataset, statName, start, end) => {
    console.log(filteredDataset);

    navigate(process.env.PUBLIC_URL + "/StatFilter", {
      state: {
        filteredData: filteredDataset,
        statName: statName,
        start: start,
        end: end,
      },
    });
  };

  const [filteredData, setFilteredData] = useState([]);
  const [overallData, setOverallData] = useState([]);
  const [selectedStat, setSelectedStat] = useState("Total"); // Default selected stat

  useEffect(() => {
    const papaConfig = {
      complete: (results, file) => {
        console.log("Parsing complete:", results.data, file);
        setOverallData(results.data);
        const filteredData = results.data.filter(
          (row) => row[30] && row[30].toLowerCase() === filterName.toLowerCase()
        );
        setFilteredData(filteredData);
      },
      download: true,
      error: (error, file) => {
        console.log("Error while parsing:", error, file);
      },
    };
    readString(pokemonData, papaConfig);
  }, [filterName]);

  const statValues = new Map([
    ["Total", 22],
    ["HP", 28],
    ["Attack", 19],
    ["Defense", 25],
    ["Special Attack", 33],
    ["Special Defense", 34],
    ["Speed", 35],
  ]);

  const handleStatChange = (event) => {
    setSelectedStat(event.target.value);
  };

  return (
    <Box className="pokemon-container">
      <div className="data-sheet-container">
        <DataSheet filterName={filterName} filteredData={filteredData} />
      </div>
      <div className="stat-distribution-container">
        <label htmlFor="stat-select">Select Stat: </label>
        <select
          id="stat-select"
          value={selectedStat}
          onChange={handleStatChange}
        >
          {Array.from(statValues.keys()).map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
        <StatDistributions
          statName={selectedStat}
          selectedStat={statValues.get(selectedStat)}
          filteredData={filteredData}
          overallData={overallData}
          navigateToStatFilter={navigateToStatFilter}
        />
      </div>
    </Box>
  );
};

export default IndividualPokemon;
