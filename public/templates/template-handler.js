

function getStatus(total) {
  if (total > 0)
    return "green";
	if(total < 0)
    return "red";
	return "orange";

}


function numberWithCommas (x){
  if(x) {
    if (x%1)
      x = x.toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
}

function templateModule(url, onReady) {
    "use strict";

    let templateString;

    // Get the HTML template.
    getData(function(data){
        templateString = data;
        if (onReady)
          onReady();
    });

    // get data
    function getData(callback) {

      function dataLoaded() {
             callback(this.responseText);
      };

      var req = new XMLHttpRequest();
      req.addEventListener('load', dataLoaded);
      req.open("GET", url);
      req.send();
    }

    // Use Template to create HTML element with data
    function createHTMLString(_day) {

        let htmlString = templateString;
        htmlString = htmlString.replace('*dayNumber*', _day.dayNumber);
        htmlString = htmlString.replace('*outComes*', numberWithCommas(_day.outComes));
        htmlString = htmlString.replace('*inComes*', numberWithCommas(_day.inComes));
        htmlString = htmlString.replace('*total*', numberWithCommas(_day.total));
        htmlString = htmlString.replace('*status*', _day.status);
        htmlString = htmlString.replace(/-id-/g, 'id');



        return htmlString;
    }


    return {
        createHTMLString: createHTMLString
    }
}
