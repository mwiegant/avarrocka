/*
  Dedicated client for unit-based operations, to prevent code duplication across controllers.
 */

var unitsClient = {};

/* hostile unit endpoints */
unitsClient.loadHostiles = function(debug, cb) {
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
  xhttp.open("GET", "getAllAliveHostiles", true);
  xhttp.send();
};

unitsClient.getHostileUnit = function(hostileUnitId, debug, cb) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      if (debug === true)
        console.log(`Response from server: ${this.responseText}`);

      let response = JSON.parse(this.responseText);

      if (response.err) {
        console.log(`error from server: ${response.err}`);
      }

      cb(response.unit);
    }
  };
  xhttp.open("GET", `getHostileUnit/${hostileUnitId}`, true);
  xhttp.send();
};

unitsClient.saveHostile = function(_hostile, isNewHostile, debug, cb) {
  let xhttp = new XMLHttpRequest();
  let hostile = Object.assign({}, _hostile);

  delete hostile.$$hashKey;

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      if (debug === true)
        console.log(`Response from server: ${this.responseText}`);

      let response = JSON.parse(this.responseText);

      cb(response);
    }
  };

  if (isNewHostile)
    xhttp.open("POST", "saveHostile", true);
  else
    xhttp.open("POST", "updateHostile", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(hostile));
};

/* unit endpoints */
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

unitsClient.saveUnit = function(_unit, isNewUnit, debug, cb) {
  let xhttp = new XMLHttpRequest();
  let unit = Object.assign({}, _unit);

  delete unit.$$hashKey;

  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {

      if (debug === true)
        console.log(`Response from server: ${this.responseText}`);

      let response = JSON.parse(this.responseText);

      cb(response);
    }
  };

  if (isNewUnit)
    xhttp.open("POST", "saveUnit", true);
  else
    xhttp.open("POST", "updateUnit", true);

  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify(unit));
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





