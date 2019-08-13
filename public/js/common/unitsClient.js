/*
  Dedicated client for unit-based operations, to prevent code duplication across controllers.
 */

var unitsClient = {};

unitsClient.loadUnits = function loadUnits(debug, cb) {
  var xhttp = new XMLHttpRequest();
  var unitsInResponse = [];
  var units = [];

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      if (debug === true)
        console.log(`Response from server: ${this.responseText}`);

      unitsInResponse = JSON.parse(this.responseText);

      unitsInResponse.forEach(function(unit) {
        units.push(unit);
      });

      cb(units);
    }
  };
  xhttp.open("GET", "getAllAliveUnits", true);
  xhttp.send();
};





