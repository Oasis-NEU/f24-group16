let emptyarray = [
    [new Date, new Date, new Date, new Date, new Date, new Date, new Date]
    [new Date, new Date, new Date, new Date, new Date, new Date, new Date]
    [new Date, new Date, new Date, new Date, new Date, new Date, new Date]
    [new Date, new Date, new Date, new Date, new Date, new Date, new Date]
];
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


function createCalendar()
{
for (let i =0;  i < emptyarray.length; i ++)
{
    for(let x = 1; x < 7; x ++)
    {
        let d = new Date( 2024, monthCounter, i)

        if((!isNaN (d)) & (d.getDay() == x) )
        {
            emptyarray[i][x] = new Date(2024, 9, i);
        }
        else
        {
            emptyarray[i][x] = null;
        }
    }
}
}

let calendarArray = createCalendar();

function displayCalendarDates(x, y)
{
d = calendarArray[x [y]];
return d.getDate();
}

