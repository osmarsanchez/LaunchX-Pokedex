const button = document.getElementById('button')
const input = document.getElementById('input')
const app = document.getElementById('app')

const url = 'https://pokeapi.co/api/v2/pokemon/'

const asyncSearchPokemon = async pokemon => {
  const res = await fetch(url + pokemon)
  const data = await res.json()
  return data
}

const asyncShowPokemon = async () => {
  const pokemon = input.value.toLowerCase()
  try {
    const data = await asyncSearchPokemon(pokemon)
    const { moves, name, sprites, stats, types } = data
    const movesList = moves
      .map(move => move.move.name)
      .slice(0, 3)
      .join('<br>')
    app.innerHTML = `
      <img
        class="pokemon-img"
        src="${sprites.front_default}"
        alt="${name}"
      />
      <h3 class="pokemon-name capitalize">${name}</h3>
      <div class="pokemon-data">
        <p class="capitalize moves"><b>${movesList}</b></p>
        <p><b>Salud:</b> ${stats[0].base_stat}</p>
        <p><b>Ataque:</b> ${stats[1].base_stat}</p>
        <p><b>Defensa:</b> ${stats[2].base_stat}</p>
        <p><b>Velocidad:</b> ${stats[5].base_stat}</p>
        <p class="capitalize moves"><b>Tipo:</b> ${types[0].type.name}</p>
      </div>
    `
  } catch (error) {
    app.innerHTML = `<p>Pokémon no encontrado</p>`
    console.error(error)
  }
}

button.addEventListener('click', async () => {
  await asyncShowPokemon()
})

input.addEventListener('keyup', e => {
  if (e.key === 'Enter') {
    button.click()
  }
})
