let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
    { name: "Beedrill", height: 1, type: ["bug", "poison"] },
    { name: "Pidgey", height: 0.3, type: ["flying", "normal"] },
    { name: "Groudon", height: 3.5, type: ["ground"] },
    { name: "Zekrom", height: 2.9, type: ["dragon", "electric"] },
    { name: "Meloetta", height: 0.6, type: ["psychic", "normal"] },
  ];
  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (typeof pokemon === "object") {
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
console.log(pokemonRepository.find("Meloetta"));

pokemonRepository.getAll().forEach((pokemon) => {
  let comment = `${pokemon.name} (height: ${pokemon.height})`;
  if (pokemon.height >= 2) {
    document.write(`<p>${comment}- Wow, that's big</p>`);
  } else {
    document.write(`<p>${comment}</p>`);
  }
});
