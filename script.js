// Define the events
let events = [
    {
        title: "AI/ML Methods in Weather Modelling",
        type: "workshop",
        startDate: "September 6, 2024",
        endDate: "September 7, 2024",
        location: "AC03, LR005, Ground Floor, Ashoka University, Sonipat",
        description: "A two-day workshop featuring a tutorial on monsoon weather modelling and research talks by eminent speakers.",
        speakers: [
            { name: "Shreya Agrawal", affiliation: "Google Research, San Francisco" },
            { name: "Auroop R Ganguly", affiliation: "COE Distinguished Professor, Northeastern University" },
            { name: "Amar Jyothi K", affiliation: "Scientist, National Centre for Medium Range Weather Forecasting" },
            { name: "Jayanarayanan Kuttippurath", affiliation: "Indian Institute of Technology, Kharagpur" },
            { name: "Krishnan Raghavan", affiliation: "Director, Indian Institute of Meteorology", note: "Keynote Speaker" },
            { name: "Mrutyunjay Mohapatra", affiliation: "Director General of Meteorology, IMD", note: "Chief Guest" },
            { name: "Madhavan Nair Rajeevan", affiliation: "Vice Chancellor, Atria University, Former Secretary, MoES India", note: "Tutorial Speaker" },
            { name: "Tapio Schneider", affiliation: "Theodore Y. Wu Professor of Environmental Science and Engineering, California Institute of Technology" },
            { name: "Sandeep Sukumaran", affiliation: "Indian Institute of Technology, Delhi" }
        ],
        highlights: [
            "A two and a half hour tutorial on monsoon weather modelling on September 6, 2024",
            "Research talks by eminent speakers on September 7, 2024"
        ]
    },
    {
        title: "Ashoka Astronomy Club",
        type: "club",
        startDate: "August 15, 2024",
        endDate: "December 15, 2024",
        location: "Ashoka University Campus",
        description: "Join us for an exciting semester of astronomical exploration and discovery!",
        highlights: [
            "Weekly stargazing sessions",
            "Guest lectures by renowned astronomers",
            "Hands-on workshops on telescope use and astrophotography",
            "Field trips to observatories"
        ]
    }
];

// Function to display events
function displayEvents() {
    const upcomingEvents = document.getElementById('upcoming-events');
    const pastEvents = document.getElementById('past-events');
    const currentDate = new Date();

    upcomingEvents.innerHTML = '';
    pastEvents.innerHTML = '';

    events.forEach(event => {
        const eventDate = new Date(event.startDate);
        const eventElement = createEventElement(event);

        if (eventDate >= currentDate) {
            upcomingEvents.appendChild(eventElement);
        } else {
            pastEvents.appendChild(eventElement);
        }
    });
}

// Function to create event element
function createEventElement(event) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'col-md-4 mb-4';
    eventDiv.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${event.type}</h6>
                <p class="card-text">${event.startDate} - ${event.endDate}</p>
                <p class="card-text">${event.description}</p>
                <button class="btn btn-primary" onclick="showEventDetails('${event.title}')">More Details</button>
            </div>
        </div>
    `;
    return eventDiv;
}

// Function to show event details
function showEventDetails(eventTitle) {
    const event = events.find(e => e.title === eventTitle);
    const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    
    document.getElementById('eventDetailsModalLabel').textContent = event.title;
    
    let speakersList = event.speakers ? event.speakers.map(speaker => 
        `<li>${speaker.name} - ${speaker.affiliation}${speaker.note ? ` (${speaker.note})` : ''}</li>`
    ).join('') : '';

    let highlightsList = event.highlights.map(highlight => `<li>${highlight}</li>`).join('');

    document.getElementById('eventDetailsContent').innerHTML = `
        <p><strong>Date:</strong> ${event.startDate} - ${event.endDate}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        ${event.speakers ? `<h4>Speakers:</h4><ul>${speakersList}</ul>` : ''}
        <h4>Highlights:</h4>
        <ul>${highlightsList}</ul>
    `;

    modal.show();
}

// Function to filter events
function filterEvents() {
    const dateRange = document.getElementById('date-range').value;
    const [startDate, endDate] = dateRange.split(' - ');
    const eventType = document.getElementById('event-type').value.toLowerCase();

    const filteredEvents = events.filter(event => {
        const eventStartDate = new Date(event.startDate);
        const eventEndDate = new Date(event.endDate);
        const filterStartDate = startDate ? new Date(startDate) : null;
        const filterEndDate = endDate ? new Date(endDate) : null;

        const dateMatch = !dateRange || (
            (!filterStartDate || eventStartDate >= filterStartDate) &&
            (!filterEndDate || eventEndDate <= filterEndDate)
        );
        const typeMatch = eventType === 'all' || event.type.toLowerCase() === eventType;

        return dateMatch && typeMatch;
    });

    displayFilteredEvents(filteredEvents);
}

// Function to display filtered events
function displayFilteredEvents(filteredEvents) {
    const upcomingEvents = document.getElementById('upcoming-events');
    const pastEvents = document.getElementById('past-events');
    const currentDate = new Date();

    upcomingEvents.innerHTML = '';
    pastEvents.innerHTML = '';

    filteredEvents.forEach(event => {
        const eventDate = new Date(event.startDate);
        const eventElement = createEventElement(event);

        if (eventDate >= currentDate) {
            upcomingEvents.appendChild(eventElement);
        } else {
            pastEvents.appendChild(eventElement);
        }
    });
}

// Initialize date range picker
$(function() {
    $('#date-range').daterangepicker({
        autoUpdateInput: false,
        opens: 'left',
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $('#date-range').on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        filterEvents();
    });

    $('#date-range').on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
        filterEvents();
    });
});

// Event listener for event type dropdown
document.getElementById('event-type').addEventListener('change', filterEvents);

// Initial display of events
document.addEventListener('DOMContentLoaded', () => {
    displayEvents();
    // Set up any other necessary initializations
});
