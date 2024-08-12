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
    // Add other events here...
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
    
    let speakersList = event.speakers.map(speaker => 
        `<li>${speaker.name} - ${speaker.affiliation}${speaker.note ? ` (${speaker.note})` : ''}</li>`
    ).join('');

    let highlightsList = event.highlights.map(highlight => `<li>${highlight}</li>`).join('');

    document.getElementById('eventDetailsContent').innerHTML = `
        <p><strong>Date:</strong> ${event.startDate} - ${event.endDate}</p>
        <p><strong>Location:</strong> ${event.location}</p>
        <p>${event.description}</p>
        <h4>Speakers:</h4>
        <ul>${speakersList}</ul>
        <h4>Highlights:</h4>
        <ul>${highlightsList}</ul>
    `;

    modal.show();
}

// Function to filter events
function filterEvents() {
    const dateRange = document.getElementById('date-range').value;
    const eventType = document.getElementById('eventTypeDropdown').textContent.trim().toLowerCase();

    events.forEach(event => {
        const eventElement = document.querySelector(`[data-event-title="${event.title}"]`);
        if (eventElement) {
            const isDateMatch = dateRange === '' || (new Date(event.startDate) >= new Date(dateRange.split(' - ')[0]) && 
                                                     new Date(event.endDate) <= new Date(dateRange.split(' - ')[1]));
            const isTypeMatch = eventType === 'all events' || event.type.toLowerCase() === eventType;

            eventElement.style.display = isDateMatch && isTypeMatch ? 'block' : 'none';
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
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('eventTypeDropdown').textContent = this.textContent;
        filterEvents();
    });
});

// Initial display of events
document.addEventListener('DOMContentLoaded', displayEvents);
