const pokedexDiv = document.querySelector(".pokedex");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
let generationshow = 1;

function showPokemonGen(gen) {
  const pokemonGen = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
  };

  const pokemonGenDefault = [1, 151];
  const generation = pokemonGen[gen] || pokemonGenDefault;
  return generation;
}

let pokemonGeneration = showPokemonGen(generationshow);

prev.addEventListener("click", () => {
  if (generationshow > 0){
    generationshow -= 1
    pokemonGeneration = showPokemonGen(generationshow)
    removeChildNodes(pokedexDiv);
    drawPokemon()
  }
});

next.addEventListener("click", () => {
  if (generationshow < 4) {
    generationshow += 1;
    pokemonGeneration = showPokemonGen(generationshow);
    removeChildNodes(pokedexDiv);
    drawPokemon()
  }
});

const drawPokemon = async () => {
  for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  console.log(pokemon.id)
  createPokemon(pokemon);
};

/*Pokemon types*/
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

drawPokemon();