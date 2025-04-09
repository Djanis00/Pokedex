import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon }) => {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name.fr} />
      <h3>{pokemon.name.fr}</h3>
      <p>Génération : {pokemon.generation}</p>
      <p>Types : {pokemon.types?.join(", ")}</p>
    </Link>
  );
};

export default PokemonCard;
