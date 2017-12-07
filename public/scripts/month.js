let daysHTML = document.getElementById('days');
let monthNameHTML = document.getElementById('monthName');
let yearHTML = document.getElementById('year');

var monthNames = [
  "ינואר",
 "פברואר",
  "מרץ",
   "אפריל",
    "מאי",
    "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר"
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

    for(let i = 0; i < thisMonth.getDay(); i++) {
        daysHTML.appendChild(createEmptyDay());
    }

    while (thisMonth.getMonth() == month -1) {

      let htmlFather = document.createElement('div');
      htmlFather.className = 'column';
      daysHTML.appendChild(htmlFather);

        getDayFromData(thisMonth, function (data, _date, _htmlFather) {
            let htmlDay;
            if (data)
              htmlDay = templateHandler.createHTMLString(data);
            else
              htmlDay = templateHandler.createHTMLString(new Day(_date), 0, 0);
            if(isDateEqual(today, _date))
                _htmlFather.className += ' active';

            _htmlFather.innerHTML = htmlDay;
        }, htmlFather);

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
  currentMonth = today.getMonth() + 1;
  currentYear = today.getFullYear();
  viewMonth(currentMonth, currentYear);
});
