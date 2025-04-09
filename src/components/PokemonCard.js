import React from "react";
import "./PokemonCard.css";

const typeColors = {
  Feu: "#f08030", Eau: "#6890f0", Plante: "#78c850", Électrik: "#f8d030",
  Normal: "#a8a878", Poison: "#a040a0", Sol: "#e0c068", Vol: "#a890f0",
  Insecte: "#a8b820", Roche: "#b8a038", Spectre: "#705898", Acier: "#b8b8d0",
  Glace: "#98d8d8", Combat: "#c03028", Psy: "#f85888", Dragon: "#7038f8",
  Ténèbres: "#705848", Fée: "#ee99ac"
};

const typeIcons = {
  Feu: "🔥", Eau: "💧", Plante: "🌿", Électrik: "⚡", Normal: "🔘", Poison: "☠️",
  Sol: "🌍", Vol: "🕊️", Insecte: "🐛", Roche: "🪨", Spectre: "👻", Acier: "⚙️",
  Glace: "❄️", Combat: "🥊", Psy: "🔮", Dragon: "🐉", Ténèbres: "🌑", Fée: "🧚‍♀️"
};

const getTypeGradient = (types) => {
  const colors = types.map(type => typeColors[type] || "#ccc");
  if (colors.length === 1) colors.push(colors[0]);
  return `linear-gradient(135deg, ${colors.join(", ")})`;
};

const PokemonCard = ({ pokemon }) => {
  const gradientStyle = {
    background: getTypeGradient(pokemon.types)
  };

  return (
    <div className="pokemon-card" style={gradientStyle}>
      <img src={pokemon.image} alt={pokemon.name.fr} />
      <h3>{pokemon.name.fr}</h3>
      <p>#{pokemon.id}</p>
      <div className="types">
        {pokemon.types.map(type => (
          <span key={type} className="type">
            {typeIcons[type] || "❓"} {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
