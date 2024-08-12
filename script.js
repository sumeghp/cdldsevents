// Event data
const events = [
    {
        id: 1,
        title: "AI/ML Methods in Weather Modelling",
        type: "workshop",
        date: "2024-09-06",
        endDate: "2024-09-07",
        description: "A two-day workshop featuring a tutorial on monsoon weather modelling and research talks by eminent speakers.",
        speakers: [
            "Auroop R Ganguly", "Jayanarayanan Kuttippurath", "Krishnan Raghavan",
            "Sandeep Sukumaran", "Tapio Schneider", "Mrutyunjay Mohapatra",
            "Madhavan Nair Rajeevan", "Amar Jyothi K", "Shreya Agrawal"
        ],
        speakerDetails: [
            "Shreya Agrawal - Google Research, San Francisco"
            "Auroop R Ganguly - COE Distinguished Professor, Northeastern University, Indian Institute of Technology Kharagpur",
            "Amar Jyothi K - Scientist, National Centre for Medium Range Weather Forecasting",
            "Jayanarayanan Kuttippurath - Director, Indian Institute of Meteorology (Keynote Speaker)",
            "Krishnan Raghavan - Indian Institute of Technology Delhi",
            "Mrutyunjay Mohapatra - Director General of Meteorology, IMD (Chief Guest)",
            "Madhavan Nair Rajeevan - Vice Chancellor, Atria University, Former Secretary, MoES India (Tutorial Speaker)",
            "Tapio Schneider - (Keynote Speaker)",
            "Sandeep Sukumaran - Theodore Y. Wu Professor of Environmental Science and Engineering, California Institute of Technology",
        ],
        location: "AC03, LR005, Ground Floor, Ashoka University, Sonipat",
        highlights: [
            "A two and a half hour tutorial on monsoon weather modelling on September 6, 2024",
            "Research talks by eminent speakers on September 7, 2024"
        ],
        registration: {
            deadline: "2024-08-30",
            link: "Scan QR code or click provided link"
        },
        contact: {
            email: "ashoka-cdlds@ashoka.edu.in",
            phone: "+91-9136857558",
            website: "https://cdlds.ashoka.edu.in/"
        }
    },
    {
        id: 2,
        title: "Is Physical Climate Risk Priced?",
        type: "seminar",
        date: "2024-09-03",
        time: "06:00 PM IST",
        description: "Inaugural online talk of the seminar series by Dr. Viral Acharya",
        speaker: "Viral Acharya",
        speakerInfo: [
            "C.V. Starr Professor of Economics, NYU Stern School of Business",
            "Former Deputy Governor, Reserve Bank of India"
        ],
        joinLink: "https://zoom.us/j/96515965150?pwd=s1dnImaN6Yr6n8Wnx85bJHK3lgzeMw.1",
        contact: {
            email: "ashoka-cdlds@ashoka.edu.in",
            phone: "+91-9136857558",
            website: "https://cdlds.ashoka.edu.in/"
        }
    },
    {
        id: 3,
        title: "ExPLOre 2024",
        type: "explore",
        date: "TBA",
        description: "Details to be announced"
    }
];

function renderEvents(filteredEvents) {
    const upcomingEvents = filteredEvents.filter(e => new Date(e.date) >= new Date());
    const pastEvents = filteredEvents.filter(e => new Date(e.date) < new Date());

    renderEventCards(document.getElementById('upcoming-events'), upcomingEvents);
    renderEventCards(document.getElementById('past-events'), pastEvents);
}

function renderEventCards(container, events) {
    container.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card event-card" data-event-id="${event.id}">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="event-type">${event.type}</p>
                    <p class="event-date">${formatDate(event.date)}${event.endDate ? ' - ' + formatDate(event.endDate) : ''}</p>
                    <p class="card-text">${event.description}</p>
                    <button class="btn btn-primary">More Details</button>
                </div>
            </div>
        `;
        card.querySelector('.card').addEventListener('click', showEventDetails);
        container.appendChild(card);
    });
}

function formatDate(dateString) {
    return moment(dateString).format('MMMM D, YYYY');
}

function showEventDetails(event) {
    const eventId = event.currentTarget.dataset.eventId;
    const eventDetails = events.find(e => e.id == eventId);
    
    const modalTitle = document.getElementById('eventDetailsModalLabel');
    const modalContent = document.getElementById('eventDetailsContent');
    
    modalTitle.textContent = eventDetails.title;
    modalContent.innerHTML = `
        <h4>Date: ${formatDate(eventDetails.date)}${eventDetails.endDate ? ' - ' + formatDate(eventDetails.endDate) : ''}</h4>
        <p>${eventDetails.description}</p>
        ${eventDetails.time ? `<p><strong>Time:</strong> ${eventDetails.time}</p>` : ''}
        ${eventDetails.location ? `<p><strong>Location:</strong> ${eventDetails.location}</p>` : ''}
        ${eventDetails.speakers ? `
            <h5>Speakers:</h5>
            <ul>
                ${eventDetails.speakerDetails ? eventDetails.speakerDetails.map(speaker => `<li>${speaker}</li>`).join('') : 
                  eventDetails.speakers.map(speaker => `<li>${speaker}</li>`).join('')}
            </ul>
        ` : ''}
        ${eventDetails.highlights ? `
            <h5>Highlights:</h5>
            <ul>
                ${eventDetails.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        ` : ''}
        ${eventDetails.registration ? `
            <h5>Registration:</h5>
            <p>Deadline: ${eventDetails.registration.deadline}</p>
            <p>${eventDetails.registration.link}</p>
        ` : ''}
        ${eventDetails.contact ? `
            <h5>Contact:</h5>
            <p>Email: ${eventDetails.contact.email}</p>
            <p>Phone: ${eventDetails.contact.phone}</p>
            <p>Website: <a href="${eventDetails.contact.website}" target="_blank">${eventDetails.contact.website}</a></p>
        ` : ''}
        ${eventDetails.joinLink ? `<p><strong>Join Link:</strong> <a href="${eventDetails.joinLink}" target="_blank">${eventDetails.joinLink}</a></p>` : ''}
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    modal.show();
}

function createMathBackground() {
    const svg = d3.select(".mathematical-background")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%");

    const symbols = ['+', '-', '×', '÷', '∑', '∫', '∂', '∇', 'π', 'λ', 'θ', 'σ'];
    const numSymbols = 100;

    for (let i = 0; i < numSymbols; i++) {
        svg.append("text")
            .attr("x", Math.random() * 100 + "%")
            .attr("y", Math.random() * 100 + "%")
            .attr("font-size", Math.random() * 20 + 10)
            .attr("fill", "#3498db")
            .attr("opacity", 0.1)
            .text(symbols[Math.floor(Math.random() * symbols.length)]);
    }
}

function filterEvents() {
    const selectedType = document.getElementById('eventTypeSelect').value;
    const dateRange = document.getElementById('date-range')._flatpickr.selectedDates;

    let filteredEvents = events;

    if (selectedType !== 'all') {
        filteredEvents = filteredEvents.filter(e => e.type === selectedType);
    }

    if (dateRange.length === 2) {
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        filteredEvents = filteredEvents.filter(e => {
            const eventDate = new Date(e.date);
            return eventDate >= startDate && eventDate <= endDate;
        });
    }

    renderEvents(filteredEvents);
}

document.addEventListener('DOMContentLoaded', function() {
    renderEvents(events);
    createMathBackground();

    flatpickr("#date-range", {
        mode: "range",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            filterEvents();
        }
    });

    document.getElementById('eventTypeSelect').addEventListener('change', filterEvents);

    document.getElementById('contactLink').addEventListener('click', function(e) {
        e.preventDefault();
        const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
        contactModal.show();
    });
});
