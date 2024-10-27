
fetch('http://127.0.0.1:5000/api/events')
    .then(response => {
        console.log('response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('data received:', data);
    })
    .catch(error => console.error('error:', error));


let calendararray = [
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
    monthCounter = monthCounter - 1
    if;
}

function rightButtonClick(x)
{
    monthCounter = monthCounter + 1;
}

function displayMonth(x)
{
    if()
}


function createCalendar(arr)
{
for (let i =0;  i < 3; i ++)
{
    for(let x = 0; x < 6; x ++)
    {
        if(!isNaN (new Date = (2024, )))
    }
}
}
