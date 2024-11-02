const emptyarray = Array.from({ length: 6 }, () => Array(7).fill(null));
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
    const emptyarray = Array.from({ length: 6 }, () => Array(7).fill(null)); // Create a 6x7 array initialized to null
    const month = 9; // October (0-indexed, so 9 is October)
    const year = 2024;

    const firstDayOfMonth = new Date(year, month, 1); // Get the first day of the month
    const startingDay = firstDayOfMonth.getDay(); // Get the day of the week (0=Sunday, 1=Monday, ..., 6=Saturday)

    let dayCounter = 1; // Day counter to fill the calendar

    for (let i = 0; i < 6; i++) { // For each week
        for (let x = 0; x < 7; x++) { // For each day of the week
            if (i === 0 && x < startingDay) {
                emptyarray[i][x] = null; // Fill in the leading empty cells for the first week
            } else if (dayCounter <= new Date(year, month + 1, 0).getDate()) { // Check if we are still in the month
                if (dayCounter > 0) {
                    let d = new Date(year, month, dayCounter);
                    emptyarray[i][x] = d; // Assign the date to the array
                    dayCounter++; // Increment the day counter
                }
            } else {
                emptyarray[i][x] = null; // Assign null if no valid date
            }
        }
    }

    console.log(emptyarray); // For debugging
    return emptyarray; // Return the populated calendar
}




function displayCalendarDates(x, y) {
    
    const calendarArray = createCalendar(); // Assuming createCalendar is defined elsewhere
    const date = calendarArray[x][y];
    const dateText = date ? date.getDate() : "No date";
    console.log(calendarArray, x, y)
    const dateElement = document.getElementById(`date-${x}-${y}`);
    if (dateElement) {
      dateElement.innerHTML = dateText; // Update the element with the date
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const weeks = 6; // Number of rows/weeks in the calendar
    const daysInWeek = 7; // Number of columns/days in a week
    
    for (let x = 0; x < weeks; x++) {
      for (let y = 0; y < daysInWeek; y++) {
        displayCalendarDates(x, y); // Call the function for each cell
        console.log (displayCalendarDates(x, y));
      }
    }
  });




