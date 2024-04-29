var resultsDisplay = document.getElementById('results');
var raids;

function test() {
    resultsDisplay.innerHTML = "script ran";
}

async function dothething() {
    const response = await fetch("./dens.json");
    const content = await response.json();
    return content;
}

async function button() {
    raids = await dothething();
    console.log(raids);
}