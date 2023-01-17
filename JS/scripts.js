let pokemonRepository = (function () {
  let pokemonList = [];

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

  function addListItem(inputList) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    button.classList.add("pokemon-button");
    button.innerText = inputList.name;

    listItem.appendChild(button);
    list.appendChild(listItem);

    // button.addEventListener("click", () => showDetails(inputList));
    addListener(button, () => showDetails(inputList));
  }

  function addListener(element, func) {
    element.addEventListener("click", func);
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    getAll,
    add,
    find,
    addListItem,
    showDetails,
  };
})();

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});
