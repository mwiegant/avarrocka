dndApp.controller('EncountersController', ['$scope', function ($scope) {

  $scope.availableUnits = [];

  function loadUnits() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
        // console.log(`Response from server: ${this.responseText}`);

        var units = JSON.parse(this.responseText);

        // $scope.availableUnits = [];

        units.forEach(function(unit) {
          $scope.availableUnits.push(unit);
        });

        $scope.$apply();
      }
    };
    xhttp.open("GET", "getAllAliveUnits", true);
    xhttp.send();
  }

  /*
    For more information on how to initialize an angular page:
      https://stackoverflow.com/questions/15458609/how-to-execute-angularjs-controller-function-on-page-load
   */
  var init = function() {
    loadUnits();

  };

  init();
}]);
