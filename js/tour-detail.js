// tour-detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the selected tour ID from localStorage
    const tourId = parseInt(localStorage.getItem('selectedTourId'));
    
    // Get the tour data
    const tour = getTourById(tourId);
    
    if (tour) {
        // Update the page with tour data
        document.querySelector('.tour-detail-image img').src = tour.image;
        document.querySelector('.tour-detail-image img').alt = tour.title;
        document.querySelector('.tour-detail-info h2').textContent = tour.title;
        document.querySelector('.tour-price-large').textContent = `$${tour.price} per person`;
        document.querySelector('.tour-description').innerHTML = `<p>${tour.description}</p>`;
        
        // Update highlights
        const highlightsList = document.querySelector('.tour-highlights ul');
        highlightsList.innerHTML = '';
        tour.highlights.forEach(highlight => {
            highlightsList.innerHTML += `<li>${highlight}</li>`;
        });
        
        // Update meta info
        document.querySelector('.tour-meta-item:nth-child(1) span').textContent = `Duration: ${tour.duration}`;
        document.querySelector('.tour-meta-item:nth-child(2) span').textContent = `Group size: ${tour.groupSize}`;
        document.querySelector('.tour-meta-item:nth-child(3) span').textContent = `Destinations: ${tour.destinations}`;
        
        // Update available dates
        const datesContainer = document.querySelector('.tour-dates');
        if (datesContainer) {
            datesContainer.innerHTML = '<h3>Available Dates</h3>';
            const datesList = document.createElement('ul');
            tour.dates.forEach(date => {
                datesList.innerHTML += `<li>${date}</li>`;
            });
            datesContainer.appendChild(datesList);
        }
    } else {
        // Redirect if no tour found
        window.location.href = 'tours.html';
    }
});