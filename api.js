const avatar = document.getElementById("avatar");
const avatar1 = document.getElementById("avatar1");
const avatar2 = document.getElementById("avatar2");
const avatar3 = document.getElementById("avatar3");
const nom = document.getElementById("nom");
const types = document.getElementById("types");
const taille = document.getElementById("taille");
const poids = document.getElementById("poids");
const resistances = document.getElementById("resistances");
const button = document.getElementById("btn");
const saisie = document.getElementById("saisie")

function resistList(resistances) {
    let resists = ''
    resistances.forEach(element => {
        let good = ''

        if (element.multiplier >= 1.5) {
            good = 'good'
        }
        else if (element.multiplier <= 1 && element.multiplier >= 0.7) {
            good = 'middlegood'
        }
        else if (element.multiplier === 0) {
            good = 'ineficace'
        }
        else {
            good = 'notgood'
        }

        resists += '<p class="' + good + '">Nom: ' + element.name + ' Valeur :' + element.multiplier + '</p>'
    })
    return resists
}

function typesList(a) {
    let types = ''
    a.forEach(element => {
        types = types + '<p>' + element.name + '<img src="' + element.image + '"></img></p>'

    })
    return types
}

function megaList(c) {
    let mega = []
    c.forEach(element => {
        for (let p in element.sprites) {

            mega.push(element.sprites[p])
        }

    }

    )
return mega

}

async function b(non) {
    const reponse = await fetch("https://tyradex.vercel.app/api/v1/pokemon/" + non);
    const pokemon = await reponse.json();
    if (pokemon.status === 404) {
        alert("Ce pokémon n'existe pas")

    }
    console.log(pokemon);

    avatar.insertAdjacentHTML("beforeend", '<img src="' + pokemon.sprites.regular + '" class="d-block w-25" />')
    avatar1.insertAdjacentHTML("beforeend", '<img src="' + pokemon.sprites.shiny + '" class="d-block w-25" />')
    if (pokemon.sprites.gmax) {
        avatar2.insertAdjacentHTML("beforeend", '<img src="' + pokemon.sprites.gmax.regular + '" class="d-block w-25" />')
        avatar3.insertAdjacentHTML("beforeend", '<img src="' + pokemon.sprites.gmax.shiny + '" class="d-block w-25" />')

    }
    megaList(pokemon.evolution.mega).forEach(element => {
  avatar.insertAdjacentHTML("beforeend", '<img src="' + element + '" class="d-block w-25" />')
    })

    nom.insertAdjacentHTML("beforeend", "<span>" + pokemon.name.fr + "</span>")
    types.insertAdjacentHTML("beforeend", "<span>" + typesList(pokemon.types) + "</span>")
    taille.insertAdjacentHTML("beforeend", "<span>" + pokemon.height + "</span>")
    poids.insertAdjacentHTML("beforeend", "<span>" + pokemon.weight + "</span>")
    resistances.insertAdjacentHTML("beforeend", "<span>" + resistList(pokemon.resistances) + "</span>")
}

button.addEventListener("click", (event) => {
    event.preventDefault()
    b(saisie.value)

})