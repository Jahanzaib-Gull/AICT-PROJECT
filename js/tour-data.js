// tour-data.js
const tours = [
    {
        id: 1,
        title: "European Grand Tour",
        price: 3499,
        duration: "14 days",
        groupSize: "12 max",
        destinations: "6 countries",
        image: "images/tour-1-large.jpg",
        description: "Embark on a 14-day luxury journey through Europe's most iconic cities. This exclusive tour package includes first-class accommodations, private guided tours, and gourmet dining experiences.",
        highlights: [
            "Private guided tour of the Louvre in Paris",
            "Gondola ride through Venice's canals",
            "VIP access to the Vatican Museums",
            "Wine tasting in Tuscany",
            "Sunset cruise along the Seine River"
        ],
        dates: ["Jun 15-29", "Aug 10-24", "Sep 5-19"]
    },
    {
        id: 2,
        title: "Asian Adventure",
        price: 4199,
        duration: "16 days",
        groupSize: "10 max",
        destinations: "5 countries",
        image: "images/tour-2-large.jpg",
        description: "Explore the exotic wonders of Southeast Asia in style. From bustling cities to tranquil beaches, this tour offers the perfect blend of adventure and relaxation.",
        highlights: [
            "Private tour of Angkor Wat",
            "Elephant sanctuary visit in Thailand",
            "Ha Long Bay cruise",
            "Tokyo city tour",
            "Balinese cooking class"
        ],
        dates: ["Jul 5-21", "Sep 1-17", "Nov 10-26"]
    },
    {
        id: 3,
        title: "African Safari",
        price: 5799,
        duration: "12 days",
        groupSize: "8 max",
        destinations: "3 countries",
        image: "images/tour-3-large.jpg",
        description: "Experience the thrill of a lifetime on this luxury safari tour. Get up close and personal with Africa's majestic wildlife in their natural habitat.",
        highlights: [
            "Private game drive in Kruger National Park",
            "Hot air balloon ride over the Serengeti",
            "Visit to a Maasai village",
            "Guided walking safari",
            "Luxury tented camp accommodations"
        ],
        dates: ["Jul 5-21", "Sep 1-17", "Nov 10-26"]
    },
    // Add more tours as needed
];

// Function to get tour by ID
function getTourById(id) {
    return tours.find(tour => tour.id === id);
}