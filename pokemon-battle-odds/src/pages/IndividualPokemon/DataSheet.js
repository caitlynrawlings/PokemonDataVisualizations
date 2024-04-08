import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import "./DataSheet.css"; // Import CSS file for styling
import bugIcon from "../../media/icons/bug.jpg";
import darkIcon from "../../media/icons/dark.jpg";
import dragonIcon from "../../media/icons/dragon.jpg";
import electricIcon from "../../media/icons/electric.jpg";
import fairyIcon from "../../media/icons/fairy.jpg";
import fightingIcon from "../../media/icons/fighting.jpg";
import fireIcon from "../../media/icons/fire.jpg";
import flyingIcon from "../../media/icons/flying.jpg";
import ghostIcon from "../../media/icons/ghost.jpg";
import grassIcon from "../../media/icons/grass.jpg";
import groundIcon from "../../media/icons/ground.jpg";
import iceIcon from "../../media/icons/ice.jpg";
import normalIcon from "../../media/icons/normal.jpg";
import poisonIcon from "../../media/icons/poison.jpg";
import psychicIcon from "../../media/icons/psychic.jpg";
import rockIcon from "../../media/icons/rock.jpg";
import steelIcon from "../../media/icons/steel.jpg";
import waterIcon from "../../media/icons/water.jpg";

const DataSheet = ({ filterName, filteredData }) => {
  const getImagePath = (pokemonName) => {
    return process.env.PUBLIC_URL + `/pokemon_images/${pokemonName}/0.jpg`;
  };

  const typeIcons = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    water: waterIcon,
  };

  return (
    <div>
      <h1>{filterName}</h1>
      <img
        src={getImagePath(filterName)}
        alt={filterName}
        style={{ width: "250px", height: "250px" }}
      />
      <img />
      <div className="type-icons-container">
        {filteredData.length > 0 && (
          <>
            <img
              src={typeIcons[filteredData[0][36]]}
              alt="Type1"
              className="type-icon"
            />
            {filteredData[0][37] && (
              <img
                src={typeIcons[filteredData[0][37]]}
                alt="Type2"
                className="type-icon"
              />
            )}
          </>
        )}
      </div>
      <h2>Basic Stats</h2>
      <table className="data-container">
        <tbody>
          <tr>
            <th>Pokedex Number</th>
            <th>Height (m)</th>
            <th>Weight (kg)</th>
            <th>HP</th>
            <th>Attack</th>
            <th>Defense</th>
            <th>Special Attack</th>
            <th>Special Defense</th>
            <th>Speed</th>
            <th>Base Total</th>
          </tr>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{row[32]}</td>
              <td>{row[27]}</td>
              <td>{row[38]}</td>
              <td>{row[28]}</td>
              <td>{row[19]}</td>
              <td>{row[25]}</td>
              <td>{row[33]}</td>
              <td>{row[34]}</td>
              <td>{row[35]}</td>
              <td>{row[22]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Weakness Modifiers</h2>
      <table className="data-container">
        <thead>
          <tr>
            <th>
              <img
                src={bugIcon}
                alt="Bug"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={darkIcon}
                alt="Dark"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={dragonIcon}
                alt="Dragon"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={electricIcon}
                alt="Electric"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={fairyIcon}
                alt="Fairy"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={fightingIcon}
                alt="Fighting"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={fireIcon}
                alt="Fire"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={flyingIcon}
                alt="Flying"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={ghostIcon}
                alt="Ghost"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {row.slice(1, 10).map((against, idx) => (
                <td key={idx}>{against}x</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="data-container">
        <thead>
          <tr>
            <th>
              <img
                src={grassIcon}
                alt="Grass"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={groundIcon}
                alt="Ground"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={iceIcon}
                alt="Ice"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={normalIcon}
                alt="Normal"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={poisonIcon}
                alt="Poison"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={psychicIcon}
                alt="Psychic"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={rockIcon}
                alt="Rock"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={steelIcon}
                alt="Steel"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
            <th>
              <img
                src={waterIcon}
                alt="Water"
                style={{ width: "64px", height: "24px" }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {row.slice(10, 19).map((against, idx) => (
                <td key={idx}>{against}x</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSheet;
