document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');


    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value1 = document.getElementById('value1').value;
      const value2 = document.getElementById('value2').value;
      const operations = document.getElementById('operation').value;
      const time = document.getElementById('time').value;

      const urlParams = `value1=${value1}&value2=${value2}&time=${time}&operations=${operations}`;
      window.location.href = `game.html?${urlParams}`;
    });
});


const value1Select = document.querySelector("#value1");
const value2Select = document.querySelector("#value2");
function populateSelectOptions(selectElement, defaultValue) {
  for (let i = 1; i <= 30; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === defaultValue) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  }

  for (let i = 35; i <= 55; i += 5) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    if (i === defaultValue) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  }
}

populateSelectOptions(value1Select, 10);
populateSelectOptions(value2Select, 10);
