import opencage from 'opencage-api-client';
import mapboxgl from 'mapbox-gl';

const opencageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;
// Forward geocode the location string to get the coordinates
export const getCoordinates = async (location) => {
  const data = await opencage.geocode({ q: location, key: opencageApiKey });

  return data;
};
// Create a map with markers for each project
export const createMap = (projects, redirectFunction) => {
  const map = new mapboxgl.Map({
    accessToken: mapboxApiKey,
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: [8.231750518993502, 46.79865190629966],
    zoom: 6,
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
      offset: 25,
      closeButton: false,
      closeOnMove: true,
    })
      .setHTML(`<div>
                  <a href="${window.location.href}/${project.id}" class="font-bold">${project.title}</a>
                  <p>${projectLocationCleaned}, ${project.year_completed.slice(0, 4)}</p>
                </div>`);

    new mapboxgl.Marker(el)
      .setLngLat([project.location.geometry.lng, project.location.geometry.lat])
      .setPopup(popup)
      .addTo(map);
  });

  return map;
};
