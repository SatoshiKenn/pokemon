const pokedexDiv = document.querySelector(".pokedex");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const gen1 = document.getElementById("gen1");
const gen2 = document.getElementById("gen2");
const gen3 = document.getElementById("gen3");
const gen4 = document.getElementById("gen4");
const gen5 = document.getElementById("gen5");
const gen6 = document.getElementById("gen6");
const gen7 = document.getElementById("gen7");
const gen8 = document.getElementById("gen8");

let generationshow = 1;

function showPokemonGen(gen) {
  const pokemonGen = {
    1: [1, 151],
    2: [152, 251],
    3: [252, 386],
    4: [387, 493],
    5: [494, 649],
    6: [650, 721],
    7: [722, 809],
    8: [810, 898],
  };

  const pokemonGenDefault = [1, 151];
  const generation = pokemonGen[gen] || pokemonGenDefault;
  return generation;
}

let pokemonGeneration = showPokemonGen(generationshow);

gen1.addEventListener("click", () => {
  changeGen(1)
});

gen2.addEventListener("click", () => {
  changeGen(2)
});

gen3.addEventListener("click", () => {
  changeGen(3)
});

gen4.addEventListener("click", () => {
  changeGen(4)
});

gen5.addEventListener("click", () => {
  changeGen(5)
});

gen6.addEventListener("click", () => {
  changeGen(6)
});

gen7.addEventListener("click", () => {
  changeGen(7);
});

gen8.addEventListener("click", () => {
  changeGen(8)
});

function changeGen(num){
  generationshow = num;
  pokemonGeneration = showPokemonGen(generationshow);
  removeChildNodes(pokedexDiv);
  fetchPokemons();
}

prev.addEventListener("click", () => {
  if (generationshow > 0) {
    generationshow -= 1;
    pokemonGeneration = showPokemonGen(generationshow);
    removeChildNodes(pokedexDiv);
    fetchPokemons();
  }
});

next.addEventListener("click", () => {
  if (generationshow < 9) {
    generationshow += 1;
    pokemonGeneration = showPokemonGen(generationshow);
    removeChildNodes(pokedexDiv);
    fetchPokemons();
  }
});

const fetchPokemons = async () => {
  for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  console.log(pokemon);
  createPokemon(pokemon);
};

const onePokemon = async (id) => {
  const main = document.querySelector(".flex");
  removeChildNodes(main);
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const rest = await fetch(url);
  const pokemon = await rest.json();
  detailPokemon(pokemon);
  window.scrollTo(0, document.body.scrollHeight);
};

/*Pokemon types*/
const colors = {
  fire: "#FFA05D",
  grass: "#8FD594",
  electric: "#FFE43B",
  water: "#7E97C0",
  ground: "#CAAC4D",
  rock: "#90642D",
  poison: "#803782",
  bug: "#EAFD71",
  dragon: "#705BD9",
  psychic: "#E63E76",
  flying: "#93A4F2",
  fighting: "#FF5D5D",
  normal: "#C2BDB2",
  dark: "#523D2E",
  ice: "#6DD3F5",
  steel: "#8E8E9F",
  fairy: "#EEA6EE",
  ghost: "#4D4C9C",
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

  const pokemonOptions = document.createElement("div");
  const pokemonButton = document.createElement("button");
  pokemonButton.classList.add("pokemonBtn");
  pokemonButton.textContent = "Info";
  pokemonButton.addEventListener("click", () => {
    onePokemon(pokemon.id);
  });

  const pokemonAdd = document.createElement("button");
  pokemonAdd.classList.add("pokemonBtn");
  pokemonAdd.textContent = "<3";

  card.appendChild(pokemonNumber);
  card.appendChild(pokemonSpriteContainer);
  card.appendChild(pokemonName);
  pokemonOptions.appendChild(pokemonButton);
  pokemonOptions.appendChild(pokemonAdd);
  card.appendChild(pokemonOptions);

  pokedexDiv.appendChild(card);
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

fetchPokemons();

//Pokemon's Details

function detailPokemon(pokemon) {
  const main = document.querySelector(".flex");
  const detailCard = document.createElement("article");
  detailCard.classList.add("card");

  const detailCardBody = document.createElement("div");
  detailCardBody.classList.add("card-body");

  const poke_types = pokemon.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  detailCardBody.style.backgroundColor = color;

  const detailImg = document.createElement("img");
  detailImg.setAttribute(
    "src",
    pokemon.sprites.other["official-artwork"].front_default
  );
  detailImg.setAttribute("alt", `${pokemon.name}`);
  detailImg.classList.add("card-body-img");

  const pokemonName = document.createElement("h1");
  pokemonName.classList.add("card-body-title");
  pokemonName.textContent =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const pokemonNumber = document.createElement("p");
  pokemonNumber.classList.add("card-body-text");
  pokemonNumber.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

  const detailInfo = document.createElement("p");
  detailInfo.classList.add("card-body-text");
  detailInfo.textContent = "Base Stats:";

  const detailFooter = document.createElement("div");
  detailFooter.classList.add("card-footer");
  detailFooter.style.backgroundColor = "#FFFFF";

  const pokemonHp = document.createElement("div");
  pokemonHp.classList.add("card-footer-social");
  pokemonHp.textContent = `HP: ${pokemon.stats[0].base_stat}`;

  const pokemonAttack = document.createElement("div");
  pokemonAttack.classList.add("card-footer-social");
  pokemonAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;

  const pokemonDeffense = document.createElement("div");
  pokemonDeffense.classList.add("card-footer-social");
  pokemonDeffense.textContent = `Deffense: ${pokemon.stats[2].base_stat}`;

  const pokemonSAttack = document.createElement("div");
  pokemonSAttack.classList.add("card-footer-social");
  pokemonSAttack.textContent = `Special Attack: ${pokemon.stats[3].base_stat}`;

  const pokemonSDeffense = document.createElement("div");
  pokemonSDeffense.classList.add("card-footer-social");
  pokemonSDeffense.textContent = `Special Deffense: ${pokemon.stats[4].base_stat}`;

  const pokemonSpeed = document.createElement("div");
  pokemonSpeed.classList.add("card-footer-social");
  pokemonSpeed.textContent = `Speed: ${pokemon.stats[5].base_stat}`;

  const chartContainer = document.createElement("canvas");
  chartContainer.setAttribute("id", "container");
  chartContainer.setAttribute("width", "400px");
  chartContainer.setAttribute("height", "400px");

  new Chart(chartContainer, {
    type: "radar",
    data: {
      labels: ["HP", "Attack", "Deffense", "Speed", "Special Deffense", "Special Attack"],
      datasets: [{
        backgroundColor: color,
        borderColor: 'rgb(128,128,128)',
        borderWidth: 2,
        label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        data: [pokemon.stats[0].base_stat, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat, pokemon.stats[5].base_stat, pokemon.stats[4].base_stat, pokemon.stats[3].base_stat]
      }]
    }
  })

  detailCardBody.appendChild(detailImg);
  detailCardBody.appendChild(pokemonName);
  detailCardBody.appendChild(pokemonNumber);
  detailCardBody.appendChild(detailInfo);
  detailFooter.appendChild(pokemonHp);
  detailFooter.appendChild(pokemonAttack);
  detailFooter.appendChild(pokemonDeffense);
  detailFooter.appendChild(pokemonSAttack);
  detailFooter.appendChild(pokemonSDeffense);
  detailFooter.appendChild(pokemonSpeed);
  detailFooter.appendChild(chartContainer);
  detailCardBody.appendChild(detailFooter);

  main.appendChild(detailCardBody);
}
