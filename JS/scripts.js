let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Charizard",
      height: 1.7,
      type: ["fire", "flying"],
    },
    {
      name: "Beedrill",
      height: 1,
      type: ["bug", "poison"],
    },
    {
      name: "Pidgey",
      height: 0.3,
      type: ["flying", "normal"],
    },
    {
      name: "Groudon",
      height: 3.5,
      type: ["ground"],
    },
    {
      name: "Zekrom",
      height: 2.9,
      type: ["dragon", "electric"],
    },
    {
      name: "Meloetta",
      height: 0.6,
      type: ["psychic", "normal"],
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon !== "object") return;

    const parameters = ["name", "height", "type"];
    const pokemonParams = Object.keys(pokemon);

    let accept = true;
    for (let i = 0; i < parameters.length; i++) {
      if (!pokemonParams.includes(parameters[i])) {
        accept = false;
      }
    }
    if (accept) {
      pokemonList.push(pokemon);
    }
  }

  function find(pokemon) {
    let result = pokemonList.filter((key) => {
      return pokemon === key.name;
    });
    return result[0];
  }
  return {
    getAll,
    add,
    find,
  };
})();

pokemonRepository.add({
  name: "Example1",
  height: 0.6,
  type: ["psychic", "normal"],
});
pokemonRepository.add({
  name: "Example2",
  type: ["psychic", "normal"],
});

pokemonRepository.getAll().forEach((pokemon) => {
  let list = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  listItem.appendChild(button);
  list.appendChild(listItem);
});
