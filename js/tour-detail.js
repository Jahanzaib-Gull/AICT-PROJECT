// tour-detail.js
document.addEventListener('DOMContentLoaded', function() {
    const tourId = parseInt(localStorage.getItem('selectedTourId'));
    const tour = getTourById(tourId);
    
    if (!tour) {
        window.location.href = 'tours.html';
        return;
    }

    // Main Tour Info
    document.querySelector('.tour-hero img').src = tour.image;
    document.querySelector('.tour-hero img').alt = tour.title;
    document.querySelector('.tour-title').textContent = tour.title;
    document.querySelector('.tour-price').innerHTML = `From <span>$${tour.price.toLocaleString()}</span> per person`;
    document.querySelector('.tour-description').innerHTML = `<p>${tour.description}</p>`;
    document.querySelector('.tour-rating').innerHTML = `${tour.rating} <i class="fas fa-star"></i> (${tour.reviews} reviews)`;

    // Highlights
    const highlightsList = document.querySelector('.highlights-list');
    highlightsList.innerHTML = tour.highlights.map(h => `<li>${h}</li>`).join('');

    // Meta Info
    const metaData = [
        { icon: 'calendar-alt', text: `Duration: ${tour.duration}` },
        { icon: 'users', text: `Group: ${tour.groupSize}` },
        { icon: 'map-marker-alt', text: `Destinations: ${tour.destinations}` },
        { icon: 'tachometer-alt', text: `Difficulty: ${tour.difficultyLevel}` },
        { icon: 'user', text: `Min Age: ${tour.ageRequirement}` },
        { icon: 'mountain', text: `Physical Rating: ${tour.physicalRating}/5` }
    ];
    document.querySelector('.tour-meta').innerHTML = metaData.map(m => `
        <div class="meta-item">
            <i class="fas fa-${m.icon}"></i>
            <span>${m.text}</span>
        </div>
    `).join('');

    // Dates
    const datesContainer = document.querySelector('.available-dates');
    datesContainer.innerHTML = `
        <h3>Available Departures</h3>
        <ul>${tour.dates.map(d => `<li>${d}</li>`).join('')}</ul>
    `;

    // Itinerary
    const itineraryContainer = document.querySelector('.itinerary');
    itineraryContainer.innerHTML = `
        <h2>Detailed Itinerary</h2>
        <div class="timeline">
            ${tour.itinerary.map((item, i) => `
                <div class="timeline-item">
                    <div class="timeline-day">Day ${i+1}</div>
                    <div class="timeline-content">${item}</div>
                </div>
            `).join('')}
        </div>
    `;

    // Inclusions/Exclusions
    document.querySelector('.included-list').innerHTML = tour.included.map(i => `<li>${i}</li>`).join('');
    document.querySelector('.not-included-list').innerHTML = tour.notIncluded.map(i => `<li>${i}</li>`).join('');

    // Practical Info
    const practicalInfo = [
        { title: 'Accommodation', content: tour.accommodation },
        { title: 'Transport', content: tour.transport },
        { title: 'Best Time to Visit', content: tour.bestTime },
        { title: 'Departure Point', content: tour.departurePoint },
        { title: 'Return Point', content: tour.returnPoint },
        { title: 'Booking Deadline', content: tour.bookingDeadline },
        { title: 'Cancellation Policy', content: tour.cancellationPolicy },
        { title: 'Visa Requirements', content: tour.visaRequirements }
    ];
    document.querySelector('.practical-info').innerHTML = practicalInfo.map(info => `
        <div class="info-item">
            <h4>${info.title}</h4>
            <p>${info.content}</p>
        </div>
    `).join('');

    // Booking Form Setup
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.querySelector('input[name="tourId"]').value = tour.id;
        bookingForm.querySelector('.tour-name-display').textContent = tour.title;
        bookingForm.querySelector('.tour-price-display').textContent = `$${tour.price}`;
        
        // Populate date dropdown
        const dateSelect = bookingForm.querySelector('select[name="tourDate"]');
        tour.dates.forEach(date => {
            dateSelect.innerHTML += `<option value="${date}">${date}</option>`;
        });
    }
});

// Utility function to get tour by ID (would be imported from tour-data.js)
function getTourById(id) {
    return tours.find(tour => tour.id === id);
}