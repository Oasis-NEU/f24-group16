const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const anchorDate = new Date();
let monthCounter = anchorDate.getMonth(); // Start with the current month
let yearCounter = anchorDate.getFullYear(); // Start with the current year

function createCalendar(month, year) {
    const emptyarray = Array.from({ length: 6 }, () => Array(7).fill(null)); // Create a 6x7 grid
    const firstDayOfMonth = new Date(year, month, 1); // First day of the month
    const startingDay = firstDayOfMonth.getDay(); // Day of the week for the 1st (0 = Sunday, ..., 6 = Saturday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total days in the current month
    let dayCounter = 1; // Start counting days from the 1st of the month

    for (let i = 0; i < 6; i++) { // Loop over weeks
        for (let j = 0; j < 7; j++) { // Loop over days in a week
            if (i === 0 && j < startingDay) {
                emptyarray[i][j] = null; // Empty leading days
            } else if (dayCounter <= daysInMonth) {
                emptyarray[i][j] = dayCounter; // Assign valid date
                dayCounter++;
            } else {
                emptyarray[i][j] = null; // Empty trailing days
            }
        }
    }

    return emptyarray;
}

function displayMonth() {
    if (monthCounter < 0) {
        monthCounter += 12;
        yearCounter -= 1;
    } else if (monthCounter > 11) {
        monthCounter -= 12;
        yearCounter += 1;
    }
    return `${months[monthCounter]} ${yearCounter}`;
}

function updateCalendar() {
    const calendarArray = createCalendar(monthCounter, yearCounter);
    document.getElementById("current-month").textContent = displayMonth();

    for (let week = 0; week < 6; week++) {
        for (let day = 0; day < 7; day++) {
            const dateElement = document.getElementById(`date-${week}-${day}`);
            if (calendarArray[week][day] === null) {
                dateElement.textContent = ""; // Empty cell
                dateElement.parentElement.parentElement.style.visibility = "hidden"; // Hide the card
            } else {
                dateElement.textContent = calendarArray[week][day]; // Set date
                dateElement.parentElement.parentElement.style.visibility = "visible"; // Show the card
            }
        }
    }
}

function generateCalendarGrid() {
    const calendarGrid = document.getElementById("calendar-grid");
    calendarGrid.innerHTML = "";
    for (let week = 0; week < 6; week++) {
        const weekRow = document.createElement("div");
        weekRow.className = "row g-2";
        for (let day = 0; day < 7; day++) {
            const cell = document.createElement("div");
            cell.className = "col";
            cell.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title" id="date-${week}-${day}"></h5>
                        <p class="card-text">- No events -</p>
                    </div>
                </div>
            `;
            weekRow.appendChild(cell);
        }
        calendarGrid.appendChild(weekRow);
    }
}

function leftButtonClick() {
    monthCounter--;
    updateCalendar();
}

function rightButtonClick() {
    monthCounter++;
    updateCalendar();
}

// Initial Load
document.addEventListener("DOMContentLoaded", () => {
    generateCalendarGrid();
    updateCalendar();
});
