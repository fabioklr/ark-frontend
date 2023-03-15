import opencage from 'opencage-api-client';
import mapboxgl from 'mapbox-gl';

const opencageApiKey = import.meta.env.VITE_OPENCAGE_API_KEY;
const mapboxApiKey = import.meta.env.VITE_MAPBOX_API_KEY;

export const getCoordinates = async (address) => {
  const data = await opencage.geocode({ q: address, key: opencageApiKey });

  return data;
};

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
  console.log(projects)

  // Create a marker for each project in projects
  projects.forEach((project) => {
    const el = document.createElement('div');
    el.innerHTML = `&#127959;`;
    el.style.fontSize = '30px';

    const popup = new mapboxgl.Popup({ 
      offset: 25,
      closeButton: false,
      closeOnMove: true,
    })
      .setHTML(`<div>
                  <a href="${window.location.href}/${project.id}">${project.title}</a>
                  <p>${project.location.components.city}</p>
                </div>`);

    new mapboxgl.Marker(el)
      .setLngLat([project.location.geometry.lng, project.location.geometry.lat])
      .setPopup(popup)
      .addTo(map);
  });

  return map;
};
