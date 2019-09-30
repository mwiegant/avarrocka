dndApp.controller('ManageEncountersController', ['$scope', function ($scope) {

  $scope.availableEncounters = [];
  $scope.availableUnits = [];
  $scope.selectedEncounter = null;
  $scope.selectedHostileUnit = null;
  $scope.saveSuccessful = null;
  $scope.saveMessage = null;

  $scope.selectEncounter = function(encounter) {

    // deep copy, so that un-saved changes will completely disappear when a new unit is selected
    $scope.selectedEncounter = Object.assign({}, encounter);

    // shallow copy, so changing the selected hostile unit will immediately persist onto the selected encounter
    $scope.selectedHostileUnit = $scope.selectedEncounter.SelectedHostile;
  };

  $scope.selectHostileUnit = function(hostileUnit) {
    $scope.selectedHostileUnit = hostileUnit;
  };

  $scope.createEncounter = function() {
    $scope.selectedEncounter = {
      _id: -1,
      Name : "",
      Status : "Disabled",
      SelectedHostile : null,
      Rewards : "",
      Deleted : false
    };

    $scope.selectedHostileUnit = null;
  };

  function init() {

    encountersClient.loadEncounters(null, function(encounters) {
      $scope.availableEncounters = encounters;

      // get all the hostile units, so that they are available when editing encounters
      unitsClient.loadHostiles(null, function(units) {
        $scope.availableUnits = units;
        $scope.$apply();
      });

      // per encounter, hostile unit id ---> full hostile unit data
      $scope.availableEncounters.forEach(function(encounter) {

        unitsClient.getHostileUnit(encounter.SelectedHostile, false, function (hostile) {
          encounter.SelectedHostile = hostile;
          $scope.$apply();
        });
      });

      $scope.$apply();
    });
  }

  init();
}]);
