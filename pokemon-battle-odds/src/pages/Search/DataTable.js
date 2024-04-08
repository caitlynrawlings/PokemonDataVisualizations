import { Link } from "react-router-dom";

const DataTable = ({ filteredData: pokemon }) => {
  const getImagePath = (pokemonName) => {
    return process.env.PUBLIC_URL + `/pokemon_images/${pokemonName}/0.jpg`;
  };

  return (
    <div>
      <table className="data-container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
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
        </thead>
        <tbody>
          {pokemon.map((pokemon, index) => (
            <tr key={index}>
              <td>
                <Link
                  to={`/24wi/final-project/Pokemon-Battle-Odds/IndividualPokemon?filterName=${encodeURIComponent(
                    pokemon[30]
                  )}`}
                >
                  {pokemon[30]}
                </Link>
              </td>
              <td>
                <img
                  src={getImagePath(pokemon[30])}
                  alt={pokemon[30]}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{pokemon[32]}</td>
              <td>{pokemon[27]}</td>
              <td>{pokemon[38]}</td>
              <td>{pokemon[28]}</td>
              <td>{pokemon[19]}</td>
              <td>{pokemon[25]}</td>
              <td>{pokemon[33]}</td>
              <td>{pokemon[34]}</td>
              <td>{pokemon[35]}</td>
              <td>{pokemon[22]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
