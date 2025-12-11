document.addEventListener('DOMContentLoaded', function() {
    const locations = [];
    const cards = document.querySelectorAll('.location-card');
    const markers = {};
    
    cards.forEach((card, index) => {
        const lat = parseFloat(card.getAttribute('data-lat'));
        const lng = parseFloat(card.getAttribute('data-lng'));
        const title = card.querySelector('h3').textContent;
        const address = card.querySelector('.address').textContent;
        
        locations.push({
            id: index,
            lat: lat,
            lng: lng,
            title: title,
            address: address,
            element: card
        });
    });
    
    const map = L.map('map').setView([39.8283, -95.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    locations.forEach((location) => {
        const markerHtml = `<div class="location-marker">${location.id + 1}</div>`;
        const customIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });
        
        const marker = L.marker([location.lat, location.lng], {
            icon: customIcon
        }).bindPopup(`
            <strong>${location.title}</strong><br>
            ${location.address}
        `).addTo(map);
        
        markers[location.id] = {
            marker: marker,
            element: customIcon.options.iconAnchor
        };
        
        marker.on('click', function() {
            selectLocation(location.id);
        });
    });
    
    function selectLocation(id) {
        cards.forEach((card, index) => {
            card.classList.remove('active');
        });
        
        locations[id].element.classList.add('active');
        locations[id].element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        const location = locations[id];
        map.flyTo([location.lat, location.lng], 12, {
            duration: 1.5
        });
        
        updateMarkers(id);
    }
    
    function updateMarkers(activeId) {
        const markerElements = document.querySelectorAll('.location-marker');
        markerElements.forEach((marker, index) => {
            if (index === activeId) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }
    
    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            selectLocation(index);
        });
    });
    
    selectLocation(0);
});
