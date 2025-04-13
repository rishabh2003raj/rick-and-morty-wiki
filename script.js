const gallery = document.getElementById('characterGallery');
const footerClock = document.getElementById('footerClock');
let currentPage = 1;

async function fetchCharacters(page = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  const data = await response.json();
  gallery.innerHTML = data.results.map(character => `
    <div class="card" onclick="openCharacter(${character.id})">
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>${character.species}</p>
      <p>Status: ${character.status}</p>
    </div>
  `).join('');
}

function openCharacter(id) {
  window.open(`character.html?id=${id}`, '_blank');
}

document.getElementById('nextPage').onclick = () => {
  currentPage++;
  fetchCharacters(currentPage);
  updatePageNumber();
};

document.getElementById('prevPage').onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
    updatePageNumber();
  }
};

function updatePageNumber() {
  document.getElementById('currentPage').textContent = `Page ${currentPage}`;
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

document.getElementById('randomCharacter').onclick = () => {
  const randomId = Math.floor(Math.random() * 826) + 1;
  window.open(`character.html?id=${randomId}`, '_blank');
};

fetchCharacters(currentPage);
