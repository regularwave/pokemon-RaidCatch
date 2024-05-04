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
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    const pnamerow = document.createElement("tr");
    const pnamecell = document.createElement("td");
    filtered = raids.filter((e) => e.Name.toLowerCase() == pname.toLowerCase());
    try {
        const pnametext = document.createTextNode(`${filtered[0].Name}`);
        pnamecell.appendChild(pnametext);
        pnamecell.colSpan = 3;
        pnamerow.appendChild(pnamecell);
        tblBody.appendChild(pnamerow);
        const headerrow = document.createElement("tr");
        const gamehcell = document.createElement("th");
        const gamehtext = document.createTextNode("Game");
        gamehcell.appendChild(gamehtext);
        headerrow.appendChild(gamehcell);
        const areahcell = document.createElement("th");
        const areahtext = document.createTextNode("Area");
        areahcell.appendChild(areahtext);
        headerrow.appendChild(areahcell);
        const lochcell = document.createElement("th");
        const lochtext = document.createTextNode("Location");
        lochcell.appendChild(lochtext);
        headerrow.appendChild(lochcell);
        tblBody.appendChild(headerrow);
        // resultsDisplay.innerHTML += filtered[0].Name + ":<br>";
        (filtered[0].Sources).forEach(source => {
            const plocrow = document.createElement("tr");
            const gamecell = document.createElement("td");
            const gametext = document.createTextNode(source[0]);
            gamecell.appendChild(gametext);
            plocrow.appendChild(gamecell);
            const areacell = document.createElement("td");
            const areatext = document.createTextNode(source[1]);
            areacell.appendChild(areatext);
            plocrow.appendChild(areacell);
            const loccell = document.createElement("td");
            const loctext = document.createTextNode(source[2]);
            loccell.appendChild(loctext);
            plocrow.appendChild(loccell);

            tblBody.appendChild(plocrow);

            // resultsDisplay.innerHTML += source[0] + " " + source[1] + " " + source[2] + "<br>";
        })
        tbl.appendChild(tblBody);
        // tbl.setAttribute("border","1");
        resultsDisplay.appendChild(tbl);
    } catch (error) {
        resultsDisplay.innerHTML = "not a valid pokemon or pokemon is not in a raid";
    }
}

function button() {
    resultsDisplay.innerHTML = "";
    document.getElementById('amname').value = '';
    document.getElementById('nzname').value = '';
    raids.forEach(poke => {
        resultsDisplay.innerHTML += poke.Name + "<br>";
    })
}