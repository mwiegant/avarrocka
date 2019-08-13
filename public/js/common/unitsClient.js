/*
  Dedicated client for unit-based operations, to prevent code duplication across controllers.
 */

var unitsClient = {};

unitsClient.loadUnits = function(debug, cb) {
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

unitsClient.calculateSums = function(unit) {
  let sums = {};

  sums.att = unit.ATT + unit.MAN_ATT;
  sums.pwr = unit.PWR + unit.MAN_PWR;
  sums.mor = unit.MOR + unit.MAN_MOR;
  sums.def = unit.DEF + unit.MAN_DEF;
  sums.tgh = unit.TGH + unit.MAN_TGH;

  return sums;
};





