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
    let parameters = ["name", "height", "type"];
    if (typeof pokemon === "object") {
      let pokemonParams = Object.keys(pokemon);
      for (let i = 0; i < parameters.length; i++) {
        if (pokemonParams.includes(parameters[i])) {
          continue;
        } else {
          return;
        }
      }
      return pokemonList.push(pokemon);
    } else {
      return;
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
  name: "Meloetta",
  height: 0.6,
  type: ["psychic", "normal"],
});
pokemonRepository.add({
  name: "Meloetta",
  type: ["psychic", "normal"],
});

pokemonRepository.getAll().forEach((pokemon) => {
  let pokemonDetails = `${pokemon.name} (height: ${pokemon.height})`;
  if (pokemon.height >= 2) {
    document.write(`<p>${pokemonDetails}- Wow, that's big</p>`);
  } else {
    document.write(`<p>${pokemonDetails}</p>`);
  }
});
