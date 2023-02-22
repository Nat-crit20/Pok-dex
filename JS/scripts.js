let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;
  let pokemonFilterList = [];
  // returns all pokemon in the array
  function getAll() {
    return pokemonList;
  }

  // loads pokemon data
  function loadList() {
    showLoadingMessage("Loading your pokemon now....");

    const data = fetch(`${apiUrl}?limit=200`);

    const results = data
      .then((res) => {
        setTimeout(() => hideLoadingMessage(), 500);

        return res.json();
      })
      .then((res) => {
        res.results.forEach((item) => {
          const pokemon = {
            name: item.name.slice(0, 1).toUpperCase() + item.name.slice(1),
            detailUrl: item.url,
          };

          add(pokemon);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return results;
  }

  //loads additional details about a pokemon
  function loadDetails(item) {
    showLoadingMessage(`Loading ${item.name} data now...`);

    const url = item.detailUrl;
    return fetch(url)
      .then((res) => {
        setTimeout(() => hideLoadingMessage(), 500);

        return res.json();
      })
      .then((res) => {
        const pokemonData = {
          name: item.name,
          imageUrl: res.sprites.front_default,
          height: res.height,
          type: res.types.map((element) => {
            return element.type.name;
          }),
          weight: res.weight,
        };
        return pokemonData;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function add(pokemon) {
    if (typeof pokemon !== "object") return;

    const parameters = ["name", "detailUrl"];
    const pokemonParams = Object.keys(pokemon);

    let accept = true;
    //Only accept pokemon with correct keys
    for (let i = 0; i < parameters.length; i++) {
      if (!pokemonParams.includes(parameters[i])) {
        accept = false;
      }
    }

    if (accept) {
      pokemonList.push(pokemon);
    }
  }

  let find = async function (pokemon) {
    const item = {};
    const data = fetch(`${apiUrl}${pokemon.toLowerCase()}`);
    await data
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        showLoadingMessage(`Loading ${res.name} data now...`);
        item.name = res.name.slice(0, 1).toUpperCase() + res.name.slice(1);
        item.imageUrl = res.sprites.front_default;
        item.height = res.height;
        item.type = [];
        res.types.forEach((element) => {
          item.type.push(element.type.name);
        });
        item.weight = res.weight;
      })
      .catch((err) => {
        console.error(err);
      });
    setTimeout(() => hideLoadingMessage(), 500);
    if (!item.name) {
      return;
    } else {
      showDetailsModal(item);
    }
  };

  function filterPokemon(pokemonInput) {
    pokemonFilterList = pokemonList.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(pokemonInput.toLowerCase());
    });
    updateListItems();
    pokemonFilterList.forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
    return pokemonList;
  }

  function searchFunc() {
    const form = document.querySelector("form");
    const search = document.querySelector("input[type=search]");
    search.addEventListener("input", (e) => {
      filterPokemon(search.value);
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      find(search.value);
    });
  }

  function updateListItems() {
    const list = document.querySelector(".pokemon-list");
    list.innerHTML = "";
  }

  function addListItem(inputList) {
    const list = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.classList.add("list-group-item");

    button.setAttribute("type", "button");
    button.classList.add("pokemon-button");
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemonModal");

    button.innerText = inputList.name;

    listItem.appendChild(button);
    list.appendChild(listItem);

    // button.addEventListener("click", () => showDetails(inputList));
    addListener(button, () => showDetails(inputList));
  }

  function addListener(element, func) {
    element.addEventListener("click", func);
  }

  // Bootstrap modal
  let showDetails = async function (pokemon) {
    const pokemonData = await loadDetails(pokemon);
    return showDetailsModal(pokemonData);
  };

  function showDetailsModal(pokemon) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");

    modalBody.empty();
    modalTitle.empty();

    const nameElement = $("<h1>" + pokemon.name + "</h1>");
    const heightElement = $("<p>Height: " + pokemon.height + "</p>");
    const weightElement = $("<p>Weight: " + pokemon.weight + "</p>");
    const imageElement = $("<img>");
    const typesElement = $("<p> Types: " + pokemon.type + "</p>");
    imageElement.attr("src", pokemon.imageUrl);

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);

    return;
  }

  function showLoadingMessage(text) {
    const container = document.querySelector(".container");
    const message = document.createElement("p");
    message.innerText = text;
    container.appendChild(message);
  }

  function hideLoadingMessage() {
    let message = document.querySelector("p");
    message.parentElement.removeChild(message);
  }

  return {
    getAll,
    addListItem,
    loadList,
    searchFunc,
  };
})();

pokemonRepository
  .loadList()
  .then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
    pokemonRepository.searchFunc();
  })
  .catch((err) => {
    console.log(err);
  });
