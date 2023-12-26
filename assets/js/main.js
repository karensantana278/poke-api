const pokemonsOl = document.querySelector(".pokemons");
const loadMoreButton = document.getElementById("loadMore");
const maxRecords = 151
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
  return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
    <span class="name">${pokemon.name}</span>
    
    <div class="detail">
        <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}"> ${type}</li>`)
              .join("")}
        </ol>

        <img src="${pokemon.photo}" alt="${pokemon.name}">
    </div>
    </li>
    `;
}

function loadPokemonItems(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newList = pokemons.map(convertPokemonToLi).join("");
      
        pokemonsOl.innerHTML += newList;
      });
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', function(){
    offset += limit

    let qtdRecord = offset + limit

    if (qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset ;
        loadPokemonItems(offset, newLimit)

        loadMoreButton.style.display = 'none'

        return
    }

    loadPokemonItems(offset, limit)
})