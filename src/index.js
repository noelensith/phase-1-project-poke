document.addEventListener('DOMContentLoaded', () => {
        
    const result = document.getElementById('prev-result')
    const searchBar = document.getElementById('search')
    const pokemonName = document.getElementById('name')
    const pokemonImg = document.getElementById('img')
    const pokemonId = document.getElementById('pokemonID')
    const pokemonType = document.getElementById('type')
    const pokemonShinyActivator = document.getElementById('shiny')
    const likeBtn = document.getElementById('likeBtn')
    let query = '';
    let pokemons = [];

    //event listeners


    searchBar.addEventListener('input', (e) => {
        query = e.target.value.toLowerCase();
        console.log(query)
        setTimeout(showPokemon, 3000)
    })

    likeBtn.addEventListener('click', () => {
        addPokemon(query)
        result.className = 'container mx-6 py-3 px-6 has-text-centered'
    })

    //functions

    const fetchPokemon = async () => {
        pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`, {
            method: 'GET',
        })
            .then(res => res.json()).catch(() => {
                alert("Pokemon is not real")
            })
    }

    const showPokemon = async () => {
        await fetchPokemon();
        const pokemonsArr = [pokemons]

        pokemonsArr.filter(pokemon => pokemon.name).forEach(pokemon => {
            const names = pokemon.name
            const types = pokemon.types[0].type.name
            const pokeid = pokemon.id
            console.log(pokeid)
            pokemonShinyActivator.innerHTML = `Click on ${names.toUpperCase()} to display shiny version`
            pokemonId.innerHTML = `No. ${pokeid}`
            pokemonName.innerHTML = names.toUpperCase()
            pokemonType.innerHTML = types.toUpperCase()
            
            const regPkmnSprite = pokemon.sprites.front_default
            const shinyPkmnSprite = pokemon.sprites.front_shiny
            
            pokemonImg.setAttribute('src', pokemon.sprites.front_default)
            pokemonImg.addEventListener('click', (e) => {
                if (e.target.className == 'reg-pokemon') {
                    pokemonImg.setAttribute('src', shinyPkmnSprite)
                    pokemonImg.className = 'shiny-pokemon'
                } else {
                    pokemonImg.setAttribute('src', regPkmnSprite)
                    pokemonImg.className = 'reg-pokemon'
                }
            })

            likeBtn.addEventListener('click', (e) => {
                if (e.target.className === 'button is-danger is-light') {
                    likeBtn.className = 'button is-danger'
                } else {
                    likeBtn.className = 'button is-danger is-light'
                }
            })
        })
    }

    const addPokemon = async () => {
        await fetchPokemon();

        const pokemonsArr = [pokemons]
        const li = document.createElement('li')
        const div = document.createElement('div')
        div.className = ''
        div.id = 'pokedata'
        pokemonsArr.filter(pokemon => pokemon.name).forEach(pokemon => {
            const names = pokemon.name
            const types = pokemon.types[0].type.name
            const pokeid = pokemon.id

            const pokeName = document.createElement('p')
            const pokeType = document.createElement('p')
            const pokeID = document.createElement('p')
            const appendedPokemonImg = document.createElement('img')
        
            const regPkmnSprite = pokemon.sprites.front_default
            const shinyPkmnSprite = pokemon.sprites.front_shiny
            
            appendedPokemonImg.setAttribute('src', pokemon.sprites.front_default)
            appendedPokemonImg.setAttribute('id', 'pokemon-img')
            appendedPokemonImg.addEventListener('click', (e) => {
                if (e.target.className === 'reg-pokemon') {
                    appendedPokemonImg.setAttribute('src', shinyPkmnSprite)
                    appendedPokemonImg.className = 'shiny-pokemon'
                } else {
                    appendedPokemonImg.setAttribute('src', regPkmnSprite)
                    appendedPokemonImg.className = 'reg-pokemon'
                }
            })
            pokeName.innerText = names.toUpperCase()
            pokeName.className = 'is-size-4 has-text-weight-bold'
            pokeID.innerHTML = `No. ${pokeid}`
            pokeID.className = 'is-size-5- has-text-weight-light'
            pokeType.innerHTML = types.toUpperCase()
            pokeType.className = 'is-size-5 has-text-weight-light'
            
            const form = document.createElement('form')
            li.appendChild(pokeName)
            li.appendChild(pokeID)
            li.appendChild(pokeType)
            li.appendChild(form)
            form.appendChild(appendedPokemonImg)
            div.appendChild(li)
        })
        result.appendChild(div)
        
        const removeBtn = document.createElement('button')
        removeBtn.className = 'button is-danger is-light'
        removeBtn.innerHTML = 'Remove'
        li.appendChild(removeBtn)
        removeBtn.addEventListener('click', (e) => {
            e.target = div.remove()
            div.className = 'is-hidden'
        })
    }
})  
