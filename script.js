document.getElementById('assignButton').addEventListener('click', assignZones);
document.getElementById('toggleInputBtn').addEventListener('click', toggleInputsVisibility);

let teams = [];

async function fetchTeams() {
    try {
        const response = await fetch('teams.json');
        const data = await response.json();
        teams = data.teams;
        updateTeamInputs(0); // Initialize inputs for the first team
    } catch (error) {
        console.error('Error fetching teams:', error);
    }
}

function toggleInputsVisibility() {
    const inputsDiv = document.getElementById('teamInputs');
    inputsDiv.style.display = (inputsDiv.style.display === 'none' ? 'flex' : 'none');
}

function updateTeamInputs(teamIndex) {
    const teamInputsContainer = document.getElementById('teamInputs');
    teamInputsContainer.innerHTML = ''; // Clear current inputs
    teams[teamIndex].forEach((name, index) => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = name;
        input.id = `name-${index}`;
        input.onchange = () => updateTeamName(teamIndex, index, input.value);
        teamInputsContainer.appendChild(input);
    });
}

function updateTeamName(teamIndex, memberIndex, newName) {
    teams[teamIndex][memberIndex] = newName;
}

function assignZones() {
    let selectedTeamIndex = document.getElementById('teamSelect').value;
    let people = teams[selectedTeamIndex];
    let zones = ['LaserCell 1', 'LaserCell 2', 'LaserCell 3', 'Tredjeman', 'LaserCell 4', 'LaserCell 5', 'LaserCell 6', 'Tredjeman'];

    // Shuffle the people array for the selected team
    for (let i = people.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [people[i], people[j]] = [people[j], people[i]];
    }

    // Assign each person to a zone and update the HTML content
    zones.forEach((zone, index) => {
        document.getElementById(zone).innerHTML = `Zone ${index + 1}<hr>${people[index]}`;
    });
}

// Fetch teams data and initialize inputs when the page loads
window.onload = fetchTeams;
