const levels = document.querySelectorAll(".level");
const startGameBtn = document.getElementById("startGame");
let selectedDifficulty = 1;

levels.forEach((level, index) => {
    level.addEventListener("click", () => {
        // Remove 'selected' class from previously selected level
        levels.forEach(lvl => lvl.classList.remove('selected'));

        // Add 'selected' class to the clicked level
        level.classList.add('selected');

        // Store the selected difficulty
        selectedDifficulty = index + 1;
    });
});

startGameBtn.addEventListener("click", () => {
    // Add spinning animation to the button
    startGameBtn.classList.add('spin');

    // Wait for the animation to finish
    setTimeout(() => {
        // Navigate to the game page, pass the selected difficulty
        window.location.href = `game.html?difficulty=${selectedDifficulty}`;
    }, 1500);
});

/*
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const difficulty = parseInt(getURLParameter('difficulty'), 10);
console.log(`Difficulty level: ${difficulty}`);

*/
