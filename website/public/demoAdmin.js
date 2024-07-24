const generateCodeButton = document.getElementById('generateCode');
const entryCodeElement = document.getElementById('entryCode');
const rankingTableBody = document.querySelector('#rankingTable tbody');

generateCodeButton.addEventListener('click', () => {
    const entryCode = Math.random().toString(36).substr(2, 5).toUpperCase();
    localStorage.setItem('entryCode', entryCode);
    entryCodeElement.textContent = `Entry Code: ${entryCode}`;

    // Clear all user data when a new entry code is generated
    localStorage.removeItem('userScores');
    displayRankings();
});

function displayRankings() {
    const userScores = JSON.parse(localStorage.getItem('userScores')) || [];
    userScores.sort((a, b) => b.score - a.score);

    rankingTableBody.innerHTML = '';
    userScores.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.score}</td>
        `;
        rankingTableBody.appendChild(row);
    });
}

// Update rankings every second
setInterval(displayRankings, 1000);
