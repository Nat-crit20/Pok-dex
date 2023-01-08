let pokemonList = [
  { name: "Charizard", height: 1.7, type: ["fire", "flying"] },
  { name: "Beedrill", height: 1, type: ["bug", "poison"] },
  { name: "Pidgey", height: 0.3, type: ["flying", "normal"] },
  { name: "Groudon", height: 3.5, type: ["ground"] },
  { name: "Zekrom", height: 2.9, type: ["dragon", "electric"] },
  { name: "Meloetta", height: 0.6, type: ["psychic", "normal"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  let pokemon = pokemonList[i];
  let comment = `${pokemon.name} (height: ${pokemon.height})`;
  if (pokemon.height >= 2) {
    document.write(`<p>${comment}- Wow, that's big</p>`);
  } else {
    document.write(`<p>${comment}</p>`);
  }
}
