const api = "https://api.jikan.moe/v4";

async function loadTopAnime(){
  const res = await fetch(`${api}/top/anime`);
  const data = await res.json();
  displayAnime(data.data);
}

function displayAnime(list){
  const container = document.getElementById("animeList");
  container.innerHTML = "";
  list.forEach(anime=>{
    container.innerHTML += `
      <div class="card" onclick="openAnime(${anime.mal_id})">
        <img src="${anime.images.jpg.image_url}">
        <h3>${anime.title}</h3>
      </div>
    `;
  });
}

function openAnime(id){
  window.location = `anime.html?id=${id}`;
}

async function searchAnime(){
  const q = document.getElementById("search").value;
  const res = await fetch(`${api}/anime?q=${q}`);
  const data = await res.json();
  displayAnime(data.data);
}

async function loadAnimeDetails(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if(!id) return;

  const res = await fetch(`${api}/anime/${id}`);
  const anime = (await res.json()).data;

  title.innerText = anime.title;
  poster.src = anime.images.jpg.image_url;
  synopsis.innerText = anime.synopsis;

  // Episode buttons from Admin (title-based)
  let episodes = JSON.parse(localStorage.getItem('animeEpisodes')||"{}");
  const titleKey = anime.title.trim().toLowerCase();

  if(episodes[titleKey]){
    for(let ep in episodes[titleKey]){
      episodeList.innerHTML += `
        <a href="${episodes[titleKey][ep]}" target="_blank">
          <button>Episode ${ep}</button>
        </a>
      `;
    }
  }else{
    episodeList.innerHTML = "No episodes added yet.";
  }
}

if(document.getElementById("animeList")) loadTopAnime();
if(document.getElementById("title")) loadAnimeDetails();
