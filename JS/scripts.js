let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

  let modalContainer = document.querySelector("#pokemonModal");

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

  /* 
  // Original Create modal
  function showDetails(pokemon) {
    // Make sure that the modal is empty
    modalContainer.innerHTML = "";

    modalContainer.classList.add("is-visible");

    let modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    let modalHead = document.createElement("div");
    modalHead.classList.add("modal-head");

    let closeBtn = document.createElement("button");
    closeBtn.classList.add("modal-close");
    closeBtn.innerText = "X";
    modalHead.appendChild(closeBtn);
    closeBtn.addEventListener("click", hideDetails);

    let nameTitle = document.createElement("h2");
    let text = document.createElement("p");
    text.classList.add("modal-info");
    let img = document.createElement("img");

    return loadDetails(pokemon)
      .then(() => {
        nameTitle.innerText = pokemon.name;
        text.innerText = `Height ${pokemon.height}`;
        img.src = pokemon.imageUrl;
        modalHead.appendChild(nameTitle);
        modal.appendChild(modalHead);
        modal.appendChild(text);
        modal.appendChild(img);
        console.log(pokemon);
      })
      .catch((err) => {
        console.log(err);
      });
  }
*/

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

  // Hide Modal
  // function hideDetails() {
  //   modalContainer.classList.remove("is-visible");
  // }

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

  // modalContainer.addEventListener("click", (e) => {
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideDetails();
  //   }
  // });

  // window.addEventListener("keydown", (e) => {
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideDetails();
  //   }
  // });

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
