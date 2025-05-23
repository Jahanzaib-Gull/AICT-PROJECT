// booking.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const bookingForm = document.getElementById('bookingForm');
    const tourSelect = document.getElementById('tourSelect');
    const tourDateSelect = document.getElementById('tourDate');
    const participantsInput = document.getElementById('participants');
    const decreaseBtn = document.getElementById('decreaseParticipants');
    const increaseBtn = document.getElementById('increaseParticipants');
    const roomTypeRadios = document.querySelectorAll('input[name="roomType"]');
    
    // Summary Elements
    const summaryTourName = document.getElementById('summaryTourName');
    const summaryTourImage = document.getElementById('summaryTourImage').querySelector('img');
    const summaryTourDate = document.getElementById('summaryTourDate');
    const summaryParticipants = document.getElementById('summaryParticipants');
    const summaryParticipantsDisplay = document.getElementById('summaryParticipantsDisplay');
    const summaryBasePrice = document.getElementById('summaryBasePrice');
    const summarySingleSupplement = document.getElementById('summarySingleSupplement');
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');
    const summaryCancellationPolicy = document.getElementById('summaryCancellationPolicy');
    const summaryTourDuration = document.getElementById('summaryTourDuration');
    
    // Current Booking Data
    let currentTour = null;
    let currentPrice = 0;
    const singleSupplementRate = 1.3; // 30% single supplement
    
    // Initialize the booking form
    function initBookingForm() {
        // Populate tour dropdown
        populateTourDropdown();
        
        // Check if coming from tour page with preselected tour
        const selectedTourId = localStorage.getItem('selectedTourId');
        if (selectedTourId) {
            const tour = getTourById(parseInt(selectedTourId));
            if (tour) {
                setSelectedTour(tour);
                localStorage.removeItem('selectedTourId');
            }
        }
        
        // Set up event listeners
        setupEventListeners();
    }
    
    // Populate tour dropdown from tour-data.js
    function populateTourDropdown() {
        tours.forEach(tour => {
            const option = document.createElement('option');
            option.value = tour.id;
            option.textContent = `${tour.title} (${tour.price} USD)`;
            tourSelect.appendChild(option);
        });
    }
    
    // Set up all event listeners
    function setupEventListeners() {
        // Tour selection change
        tourSelect.addEventListener('change', function() {
            const selectedTourId = parseInt(this.value);
            const tour = getTourById(selectedTourId);
            if (tour) {
                setSelectedTour(tour);
            }
        });
        
        // Date selection change
        tourDateSelect.addEventListener('change', function() {
            summaryTourDate.textContent = this.value || 'Select a date';
        });
        
        // Participant quantity controls
        decreaseBtn.addEventListener('click', function() {
            if (participantsInput.value > 1) {
                participantsInput.value--;
                updateParticipantCount();
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            if (participantsInput.value < 20) {
                participantsInput.value++;
                updateParticipantCount();
            }
        });
        
        participantsInput.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            if (this.value > 20) this.value = 20;
            updateParticipantCount();
        });
        
        // Room type selection
        roomTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (currentTour) {
                    updatePricing();
                }
            });
        });
        
        // Form submission
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBooking();
        });
    }
    
    // Set the selected tour and update form
    function setSelectedTour(tour) {
        currentTour = tour;
        
        // Update tour select dropdown
        tourSelect.value = tour.id;
        
        // Update tour info in summary
        summaryTourName.textContent = tour.title;
        summaryTourImage.src = tour.image;
        summaryTourImage.alt = tour.title;
        summaryTourDuration.textContent = tour.duration;
        summaryCancellationPolicy.textContent = tour.cancellationPolicy;
        
        // Populate available dates
        populateTourDates(tour.dates);
        
        // Update pricing
        updatePricing();
        
        // Scroll to form
        document.querySelector('.booking-form-container').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Populate available dates for selected tour
    function populateTourDates(dates) {
        tourDateSelect.innerHTML = '<option value="">-- Available Dates --</option>';
        
        dates.forEach(date => {
            const option = document.createElement('option');
            option.value = date;
            option.textContent = date;
            tourDateSelect.appendChild(option);
        });
        
        // Select first date by default
        if (dates.length > 0) {
            tourDateSelect.value = dates[0];
            summaryTourDate.textContent = dates[0];
        }
    }
    
    // Update participant count in summary
    function updateParticipantCount() {
        const count = participantsInput.value;
        summaryParticipants.textContent = count;
        summaryParticipantsDisplay.textContent = count;
        
        if (currentTour) {
            updatePricing();
        }
    }
    
    // Calculate and update pricing in summary
    function updatePricing() {
        if (!currentTour) return;
        
        const participantCount = parseInt(participantsInput.value);
        const selectedRoomType = document.querySelector('input[name="roomType"]:checked').value;
        
        // Calculate base price
        const basePrice = currentTour.price * participantCount;
        
        // Calculate single supplement if applicable
        let singleSupplement = 0;
        if (selectedRoomType === 'single' && participantCount === 1) {
            singleSupplement = currentTour.price * (singleSupplementRate - 1);
        }
        
        // Update summary
        summaryBasePrice.textContent = `$${basePrice.toLocaleString()}`;
        summarySingleSupplement.textContent = `$${singleSupplement.toLocaleString()}`;
        summaryTotalPrice.textContent = `$${(basePrice + singleSupplement).toLocaleString()}`;
        
        // Store current price
        currentPrice = basePrice + singleSupplement;
    }
    
    // Submit booking form
    function submitBooking() {
        if (!validateForm()) return;
        
        // Prepare booking data
        const bookingData = {
            tourId: currentTour.id,
            tourName: currentTour.title,
            date: tourDateSelect.value,
            participants: participantsInput.value,
            customer: {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                nationality: document.getElementById('nationality').value,
                passport: document.getElementById('passport').value
            },
            preferences: {
                roomType: document.querySelector('input[name="roomType"]:checked').value,
                dietary: document.getElementById('dietary').value
            },
            emergencyContact: {
                name: document.getElementById('emergencyName').value,
                phone: document.getElementById('emergencyPhone').value,
                relation: document.getElementById('emergencyRelation').value
            },
            specialRequests: document.getElementById('specialRequests').value,
            totalPrice: currentPrice,
            bookingDate: new Date().toISOString()
        };
        
        // In a real app, you would send this to your server
        console.log('Booking submitted:', bookingData);
        
        // Store booking in localStorage (for demo purposes)
        localStorage.setItem('lastBooking', JSON.stringify(bookingData));
        
        // Redirect to confirmation page
        window.location.href = 'booking-confirmation.html';
    }
    
    // Validate form before submission
    function validateForm() {
        let isValid = true;
        
        // Check if tour is selected
        if (!currentTour) {
            alert('Please select a tour');
            isValid = false;
        }
        
        // Check required fields
        const requiredFields = [
            'fullName', 'email', 'phone', 'nationality',
            'emergencyName', 'emergencyPhone', 'emergencyRelation'
        ];
        
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        // Check terms agreement
        if (!document.getElementById('agreeTerms').checked) {
            alert('You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Utility function to get tour by ID
    function getTourById(id) {
        return tours.find(tour => tour.id === id);
    }
    
    // Initialize the booking form
    initBookingForm();
});