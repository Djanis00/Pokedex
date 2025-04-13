import React from "react";

const typeMap = {
  1: "Acier", 2: "Combat", 3: "Dragon", 4: "Eau", 5: "Electrik", 6: "Fée",
  7: "Feu", 8: "Glace", 9: "Insecte", 10: "Normal", 11: "Plante", 12: "Poison",
  13: "Psy", 14: "Roche", 15: "Sol", 16: "Spectre", 17: "Ténèbres", 18: "Vol"
};

const PokemonCard = ({ pokemon, onClick }) => {
  const formatType = (t) => {
    if (typeof t === "string") return t;
    if (typeof t === "object" && t.name) return t.name;
    if (typeof t === "number") return typeMap[t] || `Type ${t}`;
    return "Inconnu";
  };

  return (
    <div className="pokemon-card" onClick={onClick}>
      <img src={pokemon.image} alt={pokemon.name.fr} />
      <h3>{pokemon.name.fr}</h3>
      <p>#{pokemon.id}</p>
      <div>{pokemon.types.map(formatType).join(", ")}</div>
    </div>
  );
};

export default PokemonCard;
