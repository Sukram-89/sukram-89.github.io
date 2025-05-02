// Example data for multiple languages

// Global State
let currentTheme = "";
let currentWord = "";
let fakeArtistIndex = 0;
let numPlayers = 0;
let currentPlayer = 0; // 0-based index
let isWordVisible = false;

// ------------------ Utility Functions ------------------

async function populateExcludeThemes(language) {
    try {
        // Fetch the JSON file for the selected language
        const wordsData = await loadWordsData(language);

        // Get the "Exclude Themes" container
        const excludeThemesContainer = document.getElementById("excludeThemesContainer");

        // Clear existing checkboxes
        excludeThemesContainer.innerHTML = "";

        // Populate the container with checkboxes
        wordsData.forEach(themeObj => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `exclude-${themeObj.theme}`;
            checkbox.value = themeObj.theme;
            checkbox.className = "form-check-input";

            const label = document.createElement("label");
            label.htmlFor = `exclude-${themeObj.theme}`;
            label.className = "form-check-label";
            label.textContent = themeObj.theme;

            const div = document.createElement("div");
            div.className = "form-check";
            div.appendChild(checkbox);
            div.appendChild(label);

            excludeThemesContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error populating exclude themes:", error);
    }
}

document.getElementById("toggleExclusionsBtn").addEventListener("click", () => {
    const exclusionsContainer = document.getElementById("exclusionsContainer");
    const toggleButton = document.getElementById("toggleExclusionsBtn");

    if (exclusionsContainer.style.display === "none") {
        exclusionsContainer.style.display = "block";
        toggleButton.textContent = "Hide Exclusions";
    } else {
        exclusionsContainer.style.display = "none";
        toggleButton.textContent = "Show Exclusions";
    }
});
// Event listener for language selection
document.getElementById("languageSelect").addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    populateExcludeThemes(selectedLanguage);
});
// Populate themes on page load for the default language
document.addEventListener("DOMContentLoaded", () => {
    const defaultLanguage = document.getElementById("languageSelect").value;
    populateExcludeThemes(defaultLanguage);
});

// Returns a random theme & word for a given language
// Update getRandomThemeAndWord to accept wordsData as a parameter
function getRandomThemeAndWord(wordsData) {
    // Get checked themes to exclude
    const excludeThemes = Array.from(document.querySelectorAll("#excludeThemesContainer input:checked"))
        .map(checkbox => checkbox.value);

    // Filter out excluded themes
    const filteredWordsData = wordsData.filter(themeObj => !excludeThemes.includes(themeObj.theme));

    if (filteredWordsData.length === 0) {
        alert("No themes available after exclusions. Please adjust your selections.");
        return { theme: null, word: null };
    }

    // Select a random theme and word
    const randomThemeObj = filteredWordsData[Math.floor(Math.random() * filteredWordsData.length)];
    const randomWord = randomThemeObj.words[
        Math.floor(Math.random() * randomThemeObj.words.length)
        ];
    return { theme: randomThemeObj.theme, word: randomWord };
}

// Returns an integer 0..(numPlayers-1) for the fake artist
function getFakeArtistIndex(num) {
    return Math.floor(Math.random() * num);
}

// ------------------ Rendering the Game ------------------

/**
 * Renders the game area (theme, instructions, buttons)
 * based on current state (currentPlayer, isWordVisible, etc.).
 */
function renderGameArea() {
    const gameDiv = document.getElementById("gameArea").querySelector(".col-md-8");

    // If all players have finished
    if (currentPlayer >= numPlayers) {
        gameDiv.innerHTML = `
        <div class="card">
          <div class="card-body text-center">
            <h2 class="card-title">All players are done!</h2>
            <p class="card-text">Everyone has seen their word or discovered they are the Fake Artist.<br/>
            Time to start drawing!</p>
          </div>
        </div>
      `;
        return;
    }

    // We still have a player to show
    const playerNumber = currentPlayer + 1; // 1-based display

    let cardContent = `
      <h3 class="card-title text-primary mb-3">THEME: ${currentTheme}</h3>
    `;

    if (!isWordVisible) {
        // Word is hidden
        cardContent += `
        <p>Pass phone to Player <strong>${playerNumber}</strong>.</p>
        <button id="showWordBtn" class="btn btn-success me-2">SHOW WORD</button>
        <div class="mt-3 text-muted">Word: (hidden)</div>
      `;
    } else {
        // Word is visible
        const isFake = (currentPlayer === fakeArtistIndex);
        const displayedWord = isFake
            ? "<strong class='text-danger'>You are the FAKE ARTIST!</strong>"
            : `<strong class="text-success">${currentWord}</strong>`;

        cardContent += `
        <p>Read your word and press "Hide Word".</p>
        <button id="hideWordBtn" class="btn btn-warning me-2">HIDE WORD</button>
        <div class="mt-3">Word: ${displayedWord}</div>
      `;
    }

    gameDiv.innerHTML = `
      <div class="card">
        <div class="card-body">
          ${cardContent}
        </div>
      </div>
    `;

    // Event listeners for the buttons
    if (!isWordVisible) {
        // "SHOW WORD" button
        const showBtn = document.getElementById("showWordBtn");
        showBtn.addEventListener("click", () => {
            isWordVisible = true;
            renderGameArea();
        });
    } else {
        // "HIDE WORD" button
        const hideBtn = document.getElementById("hideWordBtn");
        hideBtn.addEventListener("click", () => {
            isWordVisible = false;
            currentPlayer++; // move to next player
            renderGameArea();
        });
    }
}

// ------------------ Initialization ------------------
async function loadWordsData(language) {
    try {
        const response = await fetch(`./files/${language}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load ${language}.json`);
        }
        const data = await response.json();
        return data[language];
    } catch (error) {
        console.error("Error loading words data:", error);
        return [];
    }
}
document.getElementById("startBtn").addEventListener("click", async () => {
    const language = document.getElementById("languageSelect").value;
    const wordsData = await loadWordsData(language);

    // Get the number of players from the input field
    numPlayers = parseInt(document.getElementById("numPlayersInput").value, 10);

    // Validate the number of players
    if (isNaN(numPlayers) || numPlayers < 2) {
        alert("Please enter a valid number of players (minimum 2).");
        return;
    }

    const { theme, word } = getRandomThemeAndWord(wordsData);
    currentTheme = theme;
    currentWord = word;

    // Randomly pick a fake artist
    fakeArtistIndex = getFakeArtistIndex(numPlayers);

    // Reset state
    currentPlayer = 0;
    isWordVisible = false;

    // Render the first player's screen
    renderGameArea();
});
