let currentDay;
let editedLine = -1;

function myFunction(e) {

  popup.classList.toggle("show");
  popuDate.innerHTML = e;

  let htmlFather = document.createElement('div');
  getDayFromData(formatedDateToDate(e), function(dayObj, _date, htmlFather) {
      currentDay = dayObj;
      outComesBodyHTML.innerHTML = '';
      incomesBodyHTML.innerHTML = '';

      /*dayObj.inComes.forEach(function(element) {
          var tempTR = createYourElement('tr', incomesBodyHTML, '');
          createYourElement('th', tempTR, '').scope = 'row';
          createYourElement('td', tempTR, element['to']);
          createYourElement('td', tempTR, element['ref']);
          createYourElement('td', tempTR, numberWithCommas(element['amount'])).className = 'coin';
      }, this);*/

      for (let i = 0; i < dayObj.inComes.length; i++) {
          var tempTR = createYourElement('tr', incomesBodyHTML, '');
          createYourElement('th', tempTR, i + 1).scope = 'row';
          createYourElement('td', tempTR, dayObj.inComes[i]['to']);
          createYourElement('td', tempTR, dayObj.inComes[i]['ref']);
          createYourElement('td', tempTR, numberWithCommas(dayObj.inComes[i]['amount'])).className = 'coin';
          tempTR.setAttribute('data-line-number', i);
          tempTR.addEventListener('click', incomesLineClicked);
          tempTR.className = 'lineone';
      };

      for (let i = 0; i < dayObj.outComes.length; i++) {
          var tempTR = createYourElement('tr', outComesBodyHTML, '');
          createYourElement('th', tempTR, i + 1).scope = 'row';
          createYourElement('td', tempTR, dayObj.outComes[i]['to']);
          createYourElement('td', tempTR, dayObj.outComes[i]['ref']);
          createYourElement('td', tempTR, numberWithCommas(dayObj.outComes[i]['amount'])).className = 'coin';
          tempTR.setAttribute('data-line-number', i);
          tempTR.addEventListener('click', outcomesLineClicked);
          tempTR.className = 'lineone';
      };

      sumSpanHTML.innerHTML = numberWithCommas(dayObj.total);
  }, htmlFather);


}


function incomesLineClicked (e) {
  console.log(e.path[1].getAttribute('data-line-number'));
  editedLine = e.path[1].getAttribute('data-line-number');
  setEditingPanel(currentDay.inComes[editedLine]);
}

function outcomesLineClicked (e) {
  console.log(e.path[1].getAttribute('data-line-number'));
  editedLine = e.path[1].getAttribute('data-line-number');
  let temp = currentDay.outComes[editedLine];
  temp.amount *= -1;
  setEditingPanel(temp);
}

function setEditingPanel(line) {
  console.log(line);
  editingPanelHTML.classList.remove('hidden');

  toHTML.value = line['to'];
  referenceHTML.value = line.ref;
  amountHTML.value = line.amount;
}


let toHTML = document.getElementById('to');
let referenceHTML = document.getElementById('reference');
let amountHTML = document.getElementById('amount');
let editingPanelHTML = document.getElementById('editingPanel');

$('.popuptext').css('max-height',$(window).height() * 0.9);


document.getElementById('saveBtn').addEventListener('click', function(e){
    e.preventDefault();
    //console.log ('save ' + toHTML.value + ' ' + referenceHTML.value + ' ' + amountHTML.value);
    editingPanelHTML.classList.add('hidden');
    if(editedLine > -1) {
      if(amountHTML.value > 0){
        currentDay.inComes[editedLine]['to'] = toHTML.value;
        currentDay.inComes[editedLine]['amount'] = Number.parseFloat(amountHTML.value);
        currentDay.inComes[editedLine]['ref'] = referenceHTML.value;
      } else if (amountHTML.value < 0) {
        currentDay.outComes[editedLine]['to'] = toHTML.value;
        currentDay.outComes[editedLine]['amount'] = Number.parseFloat(amountHTML.value) * -1;
        currentDay.outComes[editedLine]['ref'] = referenceHTML.value;
      }
      writeData(formatedDateToDate(currentDay.date), currentDay.outComes, currentDay.inComes);
    }

});

document.getElementById('cancelBtn').addEventListener('click', function(e){
    e.preventDefault();
    editingPanelHTML.className +=' hidden';

});

document.getElementById('editBtn').addEventListener('click', function(e){
    e.preventDefault();
    editingPanelHTML.className = editingPanelHTML.className.replace('hidden', '');
    //console.log('edit');
});
