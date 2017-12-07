

function Day(_date, outComes, inComes) {
  this.dayNumber = _date.getDate();
  if (!Array.isArray(outComes))
    outComes = [{to: '', ref: '', amount: outComes}];
  if (!Array.isArray(inComes))
    inComes = [{to: '', ref: '', amount: inComes}];
  this.outComes = outComes;
  this.inComes = inComes;
  this.total = sumArray(inComes) - sumArray(outComes);
  this.status = getStatus(this.total);
  this.date = formatDate(_date);
}

function getDay(_date) {

    return new Day(_date, getNumber(), getNumber());
}

var database = firebase.database();

function writeData(_date, outComes, inComes) {
  let tempDay = new Day(_date, outComes, inComes);
  let temp = {
    outComes: tempDay.outComes,
    inComes: tempDay.inComes
  };
  //new Day (_date, outComes, inComes);
  firebase.database().ref('/days/' + formatDate(_date)).set(temp);
  return temp;
}

function getDayFromData(_date, callback, htmlFather) {
    firebase.database().ref('/days/' + formatDate(_date)).once('value').then(function(snapshot) {
        var temp = (snapshot.val());
        if (temp) {
          temp = new Day (_date, temp.outComes, temp.inComes);
          var statusChangeRef = firebase.database().ref('/days/' + formatDate(_date));
          statusChangeRef.on('value', function(snapshot) {
            callback(new Day(_date, snapshot.val().outComes, snapshot.val().inComes), _date, htmlFather);
          });
        }
        else
          temp = new Day (_date, 0, 0);

        if(callback)
          callback(temp, _date, htmlFather);
  });

}

function sumArray(arr) {
  let sum = 0;
  arr.forEach(function(element) {
    sum += element.amount;
  }, this);
  return sum;
}
/*
var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
starCountRef.on('value', function(snapshot) {
  updateStarCount(postElement, snapshot.val());
});*/



function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

function formatedDateToDate(date) {
    var temp = date.split('-');
    return new Date([temp[1], temp[0], temp[2]].join('-'));
}
