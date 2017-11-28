let daysHTML = document.getElementById('days');
let monthNameHTML = document.getElementById('monthName');
let yearHTML = document.getElementById('year');

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let today = new Date();
let currentMonth = today.getMonth() + 1;
let currentYear = today.getFullYear();
let templateHandler = templateModule('templates/month-template.html', function () {
  viewMonth(currentMonth, currentYear);
});

function createEmptyDay() {
    let tempHTML = document.createElement('div');
    tempHTML.className = 'column';
    return tempHTML;
}

function viewMonth(month, year) {
    let thisMonth = new Date (year, month -1);
    daysHTML.innerHTML = "";
    monthNameHTML.innerHTML = monthNames[thisMonth.getMonth()];
    yearHTML.innerHTML = year;
    console.log(thisMonth);
    for(let i = 0; i < thisMonth.getDay(); i++) {
        daysHTML.appendChild(createEmptyDay());
    }

    while (thisMonth.getMonth() == month -1) {

        let htmlDay = templateHandler.createHTMLElement(new Day(thisMonth.getDate(), getNumber(), getNumber()));
        /*let liHTML = document.createElement('li');
        liHTML.innerHTML = thisMonth.getDate();
        daysHTML.appendChild(liHTML);
        if(isDateEqual(today, thisMonth))
            liHTML.className = 'active';*/
        if(isDateEqual(today, thisMonth))
            htmlDay.className += ' active';
        daysHTML.appendChild(htmlDay);
        thisMonth = addDays(thisMonth, 1);

    }

    for(i = thisMonth.getDay(); i < 7; i++) {
        daysHTML.appendChild(createEmptyDay());
    }

}

function getNumber() {
  let temp = Math.random() * 5000;
  temp = Number.parseInt(temp);
  return temp;
}



function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function isDateEqual(date1, date2) {
    let dd1 = date1.getDate();
    let dd2 = date2.getDate();

    let mm1 = date1.getMonth();
    let mm2 = date2.getMonth();

    let yy1 = date1.getYear();
    let yy2 = date2.getYear();

    return dd1 == dd2 && mm1 == mm2 && yy1 == yy2;
}







document.getElementById('prev').addEventListener('click', function () {
  currentMonth--;

  if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  viewMonth(currentMonth, currentYear);
});

document.getElementById('next').addEventListener('click', function () {
  currentMonth++;

  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }
  viewMonth(currentMonth, currentYear);
});

document.getElementById('backForToday').addEventListener('click', function () {
  viewMonth(today.getMonth() + 1, today.getFullYear());
});
