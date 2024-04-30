var resultsDisplay = document.getElementById('results');
var pokeAMDropdown = document.getElementById('ampokemon');
var pokeNZDropdown = document.getElementById('nzpokemon');
var raids;

async function setup() {
    raids = await parseraids();

    raids.forEach(poke => {
        let option = document.createElement('option');
        option.value = poke.Name;
        if ("abcdefghijklm".includes(poke.Name[0].toLowerCase())) {
            pokeAMDropdown.appendChild(option);
        } else {
            pokeNZDropdown.appendChild(option);
        }
    });

    document.getElementById('amname').addEventListener('input', function () {
        console.log('changed to ' + document.getElementById('amname').value);
        document.getElementById('nzname').value = '';
        renderResults(document.getElementById('amname').value);
    });
    document.getElementById('nzname').addEventListener('input', function () {
        console.log('changed to ' + document.getElementById('nzname').value);
        document.getElementById('amname').value = '';
        renderResults(document.getElementById('nzname').value);
    });
}

async function parseraids() {
    const response = await fetch("./data.json");
    const content = await response.json();
    return content;
}

function renderResults(pname) {
    resultsDisplay.innerHTML = "";
    filtered = raids.filter((e) => e.Name.toLowerCase() == pname.toLowerCase());
    try {
        resultsDisplay.innerHTML += filtered[0].Name + ":<br>";
        (filtered[0].Sources).forEach(source => {
            resultsDisplay.innerHTML += source[0] + " " + source[1] + " " + source[2] + "<br>";
        })
    } catch (error) {
        resultsDisplay.innerHTML = "not a valid pokemon or pokemon is not in a raid";
    }
}

function button() {
    resultsDisplay.innerHTML = "";
    raids.forEach(poke => {
        resultsDisplay.innerHTML += poke.Name + "<br>";
    })
}