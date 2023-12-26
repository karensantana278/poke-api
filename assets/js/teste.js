document.addEventListener("DOMContentLoaded", function () {
    const listaPokemons = document.querySelector('.pokemons');

    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            let pokemons = data.results;
            return pokemons.forEach(function (pokemon, index) {
                let li = document.createElement('li');

                li.classList.add('pokemon');

                let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;

                fetch(pokemonUrl)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (pokemonData) {
                        console.log(pokemonData);

                        // Mapeia os tipos para uma string HTML
                        let typesHtml = pokemonData.types.map(type => `<li class="type">${type.type.name}</li>`).join('');

                        let firstType = pokemonData.types[0].type.name

                        li.classList.add(firstType);

                        li.innerHTML = `
                            <span class="number">#${pokemonData.order.toString().padStart(3, '0')}</span>
                            <span class="name">${pokemonData.name}</span>
                            
                            <div class="detail">
                                <ol class="types">
                                    ${typesHtml}
                                </ol>

                                <img src="${pokemonData.sprites.other.dream_world.front_default}" alt="${pokemonData.name}">
                            </div>
                        `;
                    })
                    .catch(function (e) {
                        console.log('Erro ao obter detalhes do Pokémon:', e);
                    });

                listaPokemons.appendChild(li);
            });
        })
        .catch(function (e) {
            console.log(e)
        });
});
