// Sample event data
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
        location: "AC03, LR005, Ground Floor, Ashoka University, Sonipat",
        registration: {
            deadline: "2024-08-30",
            link: "Scan QR code or click provided link"
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
        joinLink: "www.google.co.in/dummy-url"
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
        <h5>Speakers:</h5>
        <ul>
            ${eventDetails.speakers ? eventDetails.speakers.map(speaker => `<li>${speaker}</li>`).join('') : '<li>To be announced</li>'}
        </ul>
        ${eventDetails.location ? `<p><strong>Location:</strong> ${eventDetails.location}</p>` : ''}
        ${eventDetails.time ? `<p><strong>Time:</strong> ${eventDetails.time}</p>` : ''}
    `;
    
    const modal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    modal.show();
}

function renderTimeline() {
    const margin = {top: 20, right: 20, bottom: 30, left: 50};
    const width = document.getElementById('timeline-chart').clientWidth - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;

    const svg = d3.select("#timeline-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
        .range([0, width]);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const line = d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.id));

    x.domain(d3.extent(events, d => new Date(d.date)));
    y.domain([0, events.length]);

    svg.append("path")
        .datum(events)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll(".dot")
        .data(events)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(new Date(d.date)))
        .attr("cy", d => y(d.id))
        .attr("r", 5)
        .attr("fill", "steelblue");

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));
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

document.addEventListener('DOMContentLoaded', function() {
    renderEvents(events);
    renderTimeline();
    createMathBackground();

    $('#date-range').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        const filteredEvents = events.filter(e => {
            const eventDate = moment(e.date);
            return eventDate.isSameOrAfter(start) && eventDate.isSameOrBefore(end);
        });
        renderEvents(filteredEvents);
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedType = this.getAttribute('data-event-type');
            document.getElementById('eventTypeDropdown').textContent = this.textContent;
            
            const filteredEvents = selectedType === 'all' ? events : events.filter(e => e.type === selectedType);
            renderEvents(filteredEvents);
        });
    });
});
