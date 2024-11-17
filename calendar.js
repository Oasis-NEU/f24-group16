
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
const demo =[ ["hi"] ["hello"] ];
let monthCounter = 0;

async function getEventsFromBackend(year,month){
    const response=await fetch(`/get-events?year=${year}&month=${month}`);
    const data =await response.json();
    return data
}

function leftButtonClick(x)
{
    monthCounter = monthCounter - 1;
}

function rightButtonClick(x)
{
    monthCounter = monthCounter + 1;
}

function displayMonth(x)
{
    if(monthCounter < 0)
    {
        monthCounter = monthCounter + 12;
        return months[monthCounter];
    }
    else
    {
        return months[monthCounter];
    }
}

function createCalendar() {
    const emptyArray =Array.from({length: 6}, () => Array(7).fill(null)); // 6x7 array initialized to null
    const today=new Date();
    const month =(today.getMonth() + monthCounter) % 12;
    const year= today.getFullYear() + Math.floor((today.getMonth() + monthCounter) / 12);

    const firstDayOfMonth =new Date(year, month, 1);
    const startingDay =firstDayOfMonth.getDay();
    const daysInMonth= new Date(year, month + 1, 0).getDate();

    let dayCounter=1;

    for (let i = 0; i < 6; i++) { // For each week
        for (let j = 0; j < 7; j++) { // For each day of the week
            if (i === 0 && j < startingDay) {
                emptyArray[i][j] = null; // Leading empty days
            } else if (dayCounter <= daysInMonth) {
                emptyArray[i][j] = new Date(year, month, dayCounter); // Valid date
                dayCounter++;
            } else {
                emptyArray[i][j] = null; // Trailing empty days
            }
        }
    }

    return emptyArray;
}

function displayCalendarDates() {
    const calendarArray=createCalendar();
    const today = new Date();
    const currentYear =today.getFullYear()+ Math.floor((today.getMonth() + monthCounter) / 12);
    const currentMonth= (today.getMonth() +monthCounter) % 12;

    getEventsFromBackend(currentYear,(currentMonth+ 1).toString().padStart(2, "0")).then(events => {
        for (let week= 0; week < 6; week++) {
            for (let day= 0; day < 7; day++) {
                const date = calendarArray[week][day];
                const cell =document.getElementById(`date-${week}-${day}`);
                if (cell) {
                    const titleElement =cell.querySelector(".card-title");
                    const textElement= cell.querySelector(".card-text");
                    if (date) {
                        titleElement.textContent= date.getDate();
                        const dateKey= `${date.getFullYear()}-${(date.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}-${date.getDate().toString().padStart(2,"0")}`;
                        textElement.innerHTML = events[dateKey]?.join("<br>") || "- No events -";
                    } else {
                        titleElement.textContent = "...";
                        textElement.textContent = "";
                    }
                }
            }
        }
    });
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
            cell.id = `date-${week}-${day}`;
            cell.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">...</h5>
                        <p class="card-text">- No events -</p>
                    </div>
                </div>
            `;
            weekRow.appendChild(cell);
        }

        calendarGrid.appendChild(weekRow);
    }
}

function updateCalendar() {
    document.getElementById("current-month").textContent = `${displayMonth()} ${new Date().getFullYear()}`;
    displayCalendarDates();
}

document.addEventListener("DOMContentLoaded", () => {
    generateCalendarGrid();
    updateCalendar();
});