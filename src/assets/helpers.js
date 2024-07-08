import mapboxgl from 'mapbox-gl';

const mapboxApiKey = import.meta.env.VITE_MAPBOX_KEY;

// Create a map with markers for each project
export const createMap = (projects) => {
  const map = new mapboxgl.Map({
    accessToken: mapboxApiKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [8.540518785547745, 47.40145937203409],
    zoom: 8,
  });
  
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');
  // Create a marker for each project in projects
  projects.forEach((project) => {
    const el = document.createElement('div');
    el.innerHTML = `🏗️`;
    el.style.fontSize = '30px';
    // Add a popup to the marker that links to the project's page
    const popup = new mapboxgl.Popup({ 
      closeButton: false,
      closeOnMove: true,
    })
      .setHTML(`<div class="text-eerie-black cursor-pointer">
                  <h1 class="font-bold">${project.name}</h1>
                  <p>${project.ort}, ${project.year_completed.slice(0, 4)}</p>
                </div>`)
      .setOffset(25)
      .addClassName(`${project.id}`)
      .addClassName('project-popup')

    new mapboxgl.Marker(el)
      .setLngLat([project.lng, project.lat])
      .setPopup(popup)
      .addTo(map);
  });

  return map;
};
