// Initialize Leaflet map
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Era colors
// Era colors
const eraColors = {
  "Ancient":"#C49B66",
  "Medieval":"#7F3F98",
  "Modern":"#20B2AA"
};


// Custom marker icon
const createIcon = color => L.divIcon({
  html: `<div style="background:${color}; width:20px; height:20px; border-radius:50%; border:2px solid #000"></div>`,
  className:'',
  iconSize:[20,20]
});

// Load data
fetch('data.json')
  .then(res => res.json())
  .then(locations => {
    const list = document.getElementById('location-list');

    locations.forEach(loc => {
      // Marker
      const marker = L.marker([loc.lat, loc.lng], {icon:createIcon(eraColors[loc.era])}).addTo(map);

      // Popup with image
      const popupContent = `
        <img src="${loc.image}" alt="${loc.name}">
        <h3>${loc.name}</h3>
        <p>${loc.description}</p>
        <strong>Era:</strong> ${loc.era}
      `;
      marker.bindPopup(popupContent);

      // Tooltip on hover
      marker.bindTooltip(loc.name);

      // Sidebar click
      const li = document.createElement('li');
      li.textContent = loc.name;
      li.addEventListener('click', () => {
        map.setView([loc.lat, loc.lng], 7);
        marker.openPopup();
      });
      list.appendChild(li);
    });
});
