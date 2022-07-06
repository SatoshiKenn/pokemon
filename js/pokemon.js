const pokedexDiv = document.querySelector(".pokedex");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let offset = 0;
let limit = 10;

prev.addEventListener("click", () => {
  if (offset != 1) {
    offset -= 10;
    removeChildNodes(pokedexDiv);
    fetchPokemons(offset, limit);
  }
});

next.addEventListener("click", () => {
  offset += 10;
  removeChildNodes(pokedexDiv);
  fetchPokemons(offset, limit);
});

const fetchPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  createPokemon(pokemon);
};

function fetchPokemons(offset, limit) {
  for (let i = offset; i < offset + limit; i++) {
    fetchPokemon(i);
  }
}

/*Pokemon's colors types*/
const colors = {
  fire: "#FFA05D",
  grass: "#8FD594",
  electric: "#FFE43B",
  water: "#7E97C0",
  ground: "#CAAC4D",
  rock: "#90642D",
  poison: "#9D5B9B",
  bug: "#EAFD71",
  dragon: "#97b3e6",
  psychic: "#FF96B5",
  flying: "#CDCDCD",
  fighting: "#FF5D5D",
  normal: "#FFFFFF",
};

const main_types = Object.keys(colors);

function createPokemon(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-block");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemonSpriteContainer = document.createElement("div");
  pokemonSpriteContainer.classList.add("imgContainer");

  const pokemonSprite = document.createElement("img");
  pokemonSprite.classList.add("pokemonImg");
  pokemonSprite.src = pokemon.sprites.other["official-artwork"].front_default;

  pokemonSpriteContainer.appendChild(pokemonSprite);

  const pokemonNumber = document.createElement("p");
  pokemonNumber.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const pokemonName = document.createElement("p");
  pokemonName.classList.add("name");
  pokemonName.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  card.appendChild(pokemonNumber);
  card.appendChild(pokemonSpriteContainer);
  card.appendChild(pokemonName);

  pokedexDiv.appendChild(card);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons(offset, limit);
