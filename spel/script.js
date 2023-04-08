document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const value1 = document.getElementById('value1').value;
        const value2 = document.getElementById('value2').value;
        const operation = document.getElementById('operation').value;
        const time = document.getElementById('time').value;

        const queryParams = new URLSearchParams({
            value1,
            value2,
            operation,
            time,
        });

        window.location.href = `game.html?${queryParams.toString()}`;
    });
});
