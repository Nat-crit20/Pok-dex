let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

  function getAll() {
    return pokemonList;
  }

  function loadList() {
    showLoadingMessage("Loading your pokemon now....");

    let data = fetch(apiUrl);

    let results = data
      .then((res) => {
        setTimeout(() => hideLoadingMessage(), 500);

        return res.json();
      })
      .then((res) => {
        res.results.forEach((item) => {
          let pokemon = {
            name: item.name,
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

  function loadDetails(item) {
    showLoadingMessage(`Loading ${item.name} data now...`);

    let url = item.detailUrl;
    return fetch(url)
      .then((res) => {
        setTimeout(() => hideLoadingMessage(), 500);

        return res.json();
      })
      .then((res) => {
        item.imageUrl = res.sprites.front_default;
        item.height = res.height;
        item.type = [];
        res.types.forEach((element) => {
          item.type.push(element.type.name);
        });
        item.weight = res.weight;
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
    let item = {};
    let data = fetch(`${apiUrl}${pokemon}`);
    await data
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        item.name = res.name;
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
    console.log(item);
  };

  function addListItem(inputList) {
    let list = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
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
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    modalBody.empty();
    modalTitle.empty();

    await loadDetails(pokemon).catch((err) => {
      console.log(err);
    });

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let heightElement = $("<p>Height: " + pokemon.height + "</p>");
    let weightElement = $("<p>Weight: " + pokemon.weight + "</p>");
    let imageElement = $("<img>");
    let typesElement = $("<p> Types: " + pokemon.type + "</p>");
    imageElement.attr("src", pokemon.imageUrl);

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);

    return;
  };

  function showLoadingMessage(text) {
    let container = document.querySelector(".container");
    let message = document.createElement("p");
    message.innerText = text;
    container.appendChild(message);
  }

  function hideLoadingMessage() {
    let message = document.querySelector("p");
    message.parentElement.removeChild(message);
  }

  return {
    getAll,
    add,
    find,
    addListItem,
    showDetails,
    loadList,
    loadDetails,
  };
})();
pokemonRepository
  .loadList()
  .then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon);
    });
  })
  .catch((err) => {
    console.log(err);
  });
pokemonRepository.find("charmander");
