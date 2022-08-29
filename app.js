//////////////////////////////////////////
////////CONTENTFUL AUTH//////////////////
////////////////////////////////////////

const client = contentful.createClient({
  space: '4iw2ws18xn1k',
  accessToken: 'nMxcLlGbEUTo_VTM0Ex6l4_LpeKh-E2mAerr9BKACfQ',
});

//////////////////////////////////////////
////////CONTENTFUL FETCH//////////////////
////////////////////////////////////////

async function contentFetch() {
  try {
    const contentful = await client.getEntries({
      content_type: 'trabajos',
    });
    const dataArray = contentful.items;
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////////////////////////////
////////////////CREAR ARRAY DE TRABAJOS LOCALMENTE///////////
/////////////////////////////////////////////////////////////

function crearTrabajos(array) {
  let trabajos = array.map((item) => {
    const artista = item.fields.artista;
    const obra = item.fields.obra;
    const credito1 = item.fields.credito1 || '';
    const credito2 = item.fields.credito2 || '';
    const credito3 = item.fields.credito3 || '';
    const credito4 = item.fields.credito4 || '';
    const credito5 = item.fields.credito5 || '';
    const arte = item.fields.arte.fields.file.url;
    const spotify = item.fields.linkSpotify || '';
    const youtube = item.fields.linkYoutube || '';
    const tidal = item.fields.linkTidal || '';
    return {
      artista,
      obra,
      credito1,
      credito2,
      credito3,
      credito4,
      credito5,
      arte,
      links: { spotify, youtube, tidal },
    };
  });
  return trabajos;
}

//////////////////////////////////////////////////
///////////FUNCTION PARA DOM INSERTION////////////
/////////////////////////////////////////////////

function insertion(array) {
  const sectionTrabajos = document.querySelector('.section-trabajos');

  for (const item of array) {
    const trabajoIndiv = document.createElement('div');
    trabajoIndiv.classList.add(
      'card',
      'text-center',
      'bg-transparent',
      'border-dark'
    );
    trabajoIndiv.setAttribute('style', 'width: 18rem');
    trabajoIndiv.innerHTML = `<img
            src="${item.arte}"
            class="card-img-top"
            alt="${item.obra} Portada"
          />
          <div class="card-body">
            <h5 class="card-title">${item.obra} - ${item.artista}</h5>
            <p class="card-text">${item.credito1}</p>
            <p class="card-text">${item.credito2}</p>
            <p class="card-text">${item.credito3}</p>
            <p class="card-text">${item.credito4}</p>
            <p class="card-text">${item.credito5}</p>
            <!-- Inicio Links de trabajo individual -->
            <div class="card__links">
              <!-- Inicio Link Spotify -->
              <a
                href="${item.links.spotify}"
                target="_blank"
                class="card__links-individual"
              >
                <img
                  src="../Multimedia/logosRedes/spotify-svg.svg"
                  alt="Spotify Icon"
                  class="card__links-img"
                />
              </a>
              <!-- Fin Link Spotify -->
              <!-- Inicio Link Youtube -->
              <a
                href="${item.links.youtube}"
                target="_blank"
                class="card__links-individual"
              >
                <img
                  src="../Multimedia/logosRedes/youtube-svg.svg"
                  alt="Youtube Icon"
                  class="card__links-img"
                />
              </a>
              <!-- Fin Link Youtube -->
              <!-- Inicio Link Tidal -->
              <a
                href="${item.links.tidal}"
                target="_blank"
                class="card__links-individual"
              >
                <img
                  src="../Multimedia/logosRedes/tidal-svg.svg"
                  alt="Tidal Icon"
                  class="card__links-img"
                />
              </a>
              <!-- Fin Link Tidal -->
              <!-- Fin Links de trabajo individual -->
            </div>
          </div>
    `;
    sectionTrabajos.appendChild(trabajoIndiv);
  }
}

///////////////////////////////////////////////////////////
//////////////EVENTO PARA INSERTAR TRABAJOS///////////////
//////////////////////////////////////////////////////////

window.addEventListener('load', async () => {
  try {
    const data = await contentFetch();
    console.log(data);
    const trabajos = crearTrabajos(data);
    console.log(trabajos);
    insertion(trabajos);
  } catch (error) {
    console.log(error);
  }
});
