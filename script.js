let pokemonList = [];

const loader = document.getElementById('loader');
const appContent = document.getElementById('app-content');
const errorMsg = document.getElementById('error-msg');
const searchInput = document.getElementById('pokemon-search');
const clearBtn = document.getElementById('clear-btn');
const dropdownList = document.getElementById('dropdown-list');
const resultsContainer = document.getElementById('results-container');
const displayName = document.getElementById('display-name');
const formsContainer = document.getElementById('forms-container');

async function initializeApp() {
    try {
        const response = await fetch('./data.json');

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}. Ensure data.json is in the same folder.`);
        }

        const pokeData = await response.json();

        if (!Array.isArray(pokeData) || pokeData.length === 0) {
            throw new Error("data.json was loaded, but the list appears to be empty or invalid.");
        }

        pokemonList = pokeData.sort((a, b) => a.Name.localeCompare(b.Name));

        loader.style.display = 'none';
        appContent.style.display = 'block';

    } catch (err) {
        console.error("Initialization Error:", err);
        loader.style.display = 'none';
        errorMsg.textContent = err.message;
        errorMsg.style.display = 'block';
    }
}

function filterDropdown(query) {
    dropdownList.innerHTML = '';

    if (!query) {
        renderDropdownItems(pokemonList);
        return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = pokemonList.filter(p => p.Name.toLowerCase().includes(lowerQuery));

    if (filtered.length === 0) {
        dropdownList.innerHTML = '<li class="no-results">No Pokémon found.</li>';
    } else {
        renderDropdownItems(filtered);
    }
}

function renderDropdownItems(items) {
    const fragment = document.createDocumentFragment();
    const displayItems = items.slice(0, 150);

    displayItems.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon.Name;
        li.addEventListener('mousedown', (e) => {
            e.preventDefault();
            selectPokemon(pokemon);
        });
        fragment.appendChild(li);
    });
    dropdownList.appendChild(fragment);
}

searchInput.addEventListener('input', (e) => {
    filterDropdown(e.target.value);
    dropdownList.classList.add('active');

    clearBtn.style.display = e.target.value.length > 0 ? 'flex' : 'none';
});

searchInput.addEventListener('focus', () => {
    filterDropdown(searchInput.value);
    dropdownList.classList.add('active');
});

searchInput.addEventListener('blur', () => {
    dropdownList.classList.remove('active');
});

clearBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterDropdown('');
    dropdownList.classList.remove('active');
    clearBtn.style.display = 'none';
    resultsContainer.style.display = 'none';
    searchInput.focus();
});

function selectPokemon(pokemon) {
    searchInput.value = pokemon.Name;
    dropdownList.classList.remove('active');
    clearBtn.style.display = 'flex';

    displayName.textContent = pokemon.Name;
    formsContainer.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'form-card';

    const sources = pokemon.Sources || [];

    let sourcesHtml = '<span class="empty-state">No known 100% catch rate sources.</span>';

    if (sources.length > 0) {
        const listItems = sources.map(source => {
            const game = source[0] || 'Unknown Game';
            const location = source[1] || 'Unknown Location';
            const method = source[2] || '';

            return `<li><strong>${game}</strong> <span style="color:var(--text-muted)">(${location})</span>: ${method}</li>`;
        }).join('');

        sourcesHtml = `<ul class="den-list">${listItems}</ul>`;
    }

    card.innerHTML = `
                <div class="method-box">
                    <div class="method-title">
                        <span class="material-symbols-outlined" style="font-size: 18px;">location_on</span>
                        Guaranteed Catch Locations
                    </div>
                    <div class="method-content">${sourcesHtml}</div>
                </div>
            `;
    formsContainer.appendChild(card);

    resultsContainer.style.display = 'block';
}

initializeApp();