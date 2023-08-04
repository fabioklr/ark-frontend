import opencage from 'opencage-api-client';
import mapboxgl from 'mapbox-gl';

const opencageApiKey = import.meta.env.VITE_OPENCAGE_KEY;
const mapboxApiKey = import.meta.env.VITE_MAPBOX_KEY;
// Forward geocode the location string to get the coordinates
export const getCoordinates = async (location) => {
  const data = await opencage.geocode({ q: location, key: opencageApiKey });
  return data;
};
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
    el.innerHTML = `&#127959;`;
    el.style.fontSize = '30px';
    // Extract the city's or village's name from the formatted location string
    const projectLocationCleaned = project.location.formatted.split(',')[0].replace(/[\d\s]/g, '');
    // Add a popup to the marker that links to the project's page
    const popup = new mapboxgl.Popup({ 
      closeButton: false,
      closeOnMove: true,
    })
      .setHTML(`<div class="text-eerie-black cursor-pointer">
                  <h1 class="font-bold">${project.title}</h1>
                  <p>${projectLocationCleaned}, ${project.year_completed.slice(0, 4)}</p>
                </div>`)
      .setOffset(25)
      .addClassName(`${project.id}`)
      .addClassName('project-popup')

    new mapboxgl.Marker(el)
      .setLngLat([project.location.geometry.lng, project.location.geometry.lat])
      .setPopup(popup)
      .addTo(map);
  });

  return map;
};
