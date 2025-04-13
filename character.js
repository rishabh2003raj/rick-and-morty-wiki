const details = document.getElementById('characterDetails');
const footerClock = document.getElementById('footerClock');

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

async function fetchCharacter(id) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await response.json();

  const episodes = character.episode.map(ep => `<li>${ep}</li>`).join('');

  details.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h2>${character.name}</h2>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Type: ${character.type || 'N/A'}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${character.origin.name}</p>
    <p>Location: ${character.location.name}</p>
    <p>Episodes: ${character.episode.length}</p>
  `;
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const day = now.toLocaleDateString(undefined, { weekday: 'long' });
  const date = now.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
  footerClock.textContent = `${time} ${day} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();

document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('dark-mode');
};

fetchCharacter(id);
