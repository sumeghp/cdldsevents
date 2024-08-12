document.addEventListener('DOMContentLoaded', function() {
    const upcomingEventsContainer = document.getElementById('upcoming-events-container');
    const pastEventsContainer = document.getElementById('past-events-container');
    const eventDetailsModal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    const eventDetailsContent = document.getElementById('eventDetailsContent');
    const eventDetailsModalTitle = document.getElementById('eventDetailsModalLabel');
    const dateRangeInput = document.getElementById('dateRange');
    const eventTypeSelect = document.getElementById('eventType');

    const events = [
        {
            title: "AI/ML Methods in Weather Modelling workshop",
            date: "September 6, 2024 - September 7, 2024",
            type: "workshop",
            description: "A two-day workshop featuring a tutorial on monsoon weather modelling and research talks by eminent speakers.",
            details: "For more information, visit: https://www.ashoka.edu.in/event/ai-ml-methods-in-weather-modelling/"
        },
        {
            title: "Is Physical Climate Risk Priced?",
            date: "September 3, 2024",
            type: "seminar",
            description: "Inaugural online talk of the CDLDS seminar series by Dr. Viral Acharya",
            details: "Link: https://zoom.us/j/96515965150?pwd=s1dnImaN6Yr6n8Wnx85bJHK3lgzeMw.1"
        },
        // Add more events here...
    ];

    // Initialize date range picker
    $(dateRangeInput).daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });

    $(dateRangeInput).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
        filterEvents();
    });

    $(dateRangeInput).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
        filterEvents();
    });

    function createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'col-md-6 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${event.date}</h6>
                    <p class="card-text">${event.description}</p>
                    <button class="btn btn-primary btn-sm view-details">View Details</button>
                </div>
            </div>
        `;

        card.querySelector('.view-details').addEventListener('click', () => showEventDetails(event));
        return card;
    }

    function showEventDetails(event) {
        eventDetailsModalTitle.textContent = event.title;
        eventDetailsContent.innerHTML = `
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Type:</strong> ${event.type}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p>${event.details}</p>
        `;
        eventDetailsModal.show();
    }

    function filterEvents() {
        const dateRange = dateRangeInput.value;
        const eventType = eventTypeSelect.value;

        upcomingEventsContainer.innerHTML = '';
        pastEventsContainer.innerHTML = '';

        const currentDate = new Date();
        events.forEach(event => {
            const eventStartDate = new Date(event.date.split(' - ')[0]);
            const eventEndDate = new Date(event.date.split(' - ')[1] || event.date.split(' - ')[0]);
            
            // Apply filters
            if ((eventType === '' || event.type === eventType) &&
                (dateRange === '' || isWithinDateRange(eventStartDate, eventEndDate, dateRange))) {
                const eventCard = createEventCard(event);
                if (eventEndDate >= currentDate) {
                    upcomingEventsContainer.appendChild(eventCard);
                } else {
                    pastEventsContainer.appendChild(eventCard);
                }
            }
        });
    }

    function isWithinDateRange(eventStartDate, eventEndDate, dateRange) {
        if (dateRange === '') return true;

        const [rangeStart, rangeEnd] = dateRange.split(' - ').map(date => new Date(date));
        
        // Check if the event overlaps with the selected date range
        return (eventStartDate <= rangeEnd && eventEndDate >= rangeStart);
    }

    // Initial load
    filterEvents();

    // Add event listeners for filters
    eventTypeSelect.addEventListener('change', filterEvents);
});