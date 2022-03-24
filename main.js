const BuscarButton = document.getElementById('buscar-button');
const datosIngresados = document.getElementById('buscaPokemon');
const pokemonImage = document.getElementById('pokemon-img');
const pokemonName = document.getElementById('poke-name');
const pokemonName2 = document.getElementById('poke-name2');
const pokemonType = document.getElementById('pokemonType');
const pokemonId = document.getElementById('pokemonId');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonEvolution = document.getElementById('pokemonEvolution');
const pokemonMov1 = document.getElementById('pokemonMov1');
const pokemonMov2 = document.getElementById('pokemonMov2');


/* Funcion para la API */
function limpiar() {
    pokemonName.value = '';
    pokemonName2.value = '';
    pokemonType.value = '';
    pokemonId.value = '';
    pokemonHeight.value = '';
    pokemonWeight.value = '';
    pokemonEvolution.value = '';
    pokemonMov1.value = '';
    pokemonMov2.value = '';
}

const obtenerDatosPokemon = (pokemon) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((response) => {
            if (response.status != "200") {
                pokemonImage.src = 'images/no_pokemon.png';
                datosIngresados.value = '';
                limpiar();
            }
            else{
                return response.json();
            }
        })        
        .then((data) => {
            let id = ('00' + data.id).slice(-3);
            pokemonImage.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'+id+'.png';
            pokemonName.value = data.name;
            pokemonName2.value = 'Nombre: ' + data.name;
            pokemonType.value = 'Tipo: ' + data.types[0].type.name;
            pokemonId.value = `Id: #${data.id}`;
            pokemonHeight.value = `Altura: ${data.height * 10}cms`;
            pokemonWeight.value = `Peso: ${data.weight / 10}kg`;
            pokemonEvolution.value = `Pts. Exp: ${data.base_experience}`;
            pokemonMov1.value = `Mov. 1: ${data.abilities[0].ability.name}`;
            pokemonMov2.value = `Mov. 2: ${data.abilities[1].ability.name}`;
            datosIngresados.value = '';
        });
}

BuscarButton.addEventListener('click', () => obtenerDatosPokemon(datosIngresados.value));
datosIngresados.addEventListener(
    'keydown',
    (event) => event.key === 'Enter' && BuscarButton.click()
);