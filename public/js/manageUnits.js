dndApp.controller('ManageUnitsController', ['$scope', function ($scope) {

  $scope.availableUnits = [];
  $scope.selectedUnit = null;
  $scope.saveSuccessful = null;
  $scope.saveMessage = null;
  $scope.sumAtt = 0;
  $scope.sumPwr = 0;
  $scope.sumMor = 0;
  $scope.sumDef = 0;
  $scope.sumTgh = 0;

  $scope.selectUnit = function(unit) {
    // deep copy, so that un-saved changes will completely disappear when a new unit is selected
    $scope.selectedUnit = Object.assign({}, unit);

    $scope.sumAtt = 0;
    $scope.sumPwr = 0;
    $scope.sumMor = 0;
    $scope.sumDef = 0;
    $scope.sumTgh = 0;

    $scope.refreshSums();
  };

  $scope.refreshSums = function() {
    const sums = unitsClient.calculateSums($scope.selectedUnit);

    $scope.sumAtt = sums.att;
    $scope.sumPwr = sums.pwr;
    $scope.sumMor = sums.mor;
    $scope.sumDef = sums.def;
    $scope.sumTgh = sums.tgh;
  };

  $scope.saveUnit = function() {
    if ($scope.selectedUnit === null)
      alert("Cannot save unit: there is no unit currently selected.");

    // existing units will always have an id greater than 0
    const isNewUnit = $scope.selectedUnit._id <= 0;
    const passedValidation = true;


    // TODO -- add validation here


    if (passedValidation) {
      if (isNewUnit)
        $scope.selectedUnit._id = Date.now();

      unitsClient.saveUnit($scope.selectedUnit, isNewUnit, false, function(response) {
        $scope.saveSuccessful = response.success;

        if (response.success === false) {
          $scope.saveMessage = "Failed to save this unit!";
        }
        else {
          $scope.saveMessage = "Successfully saved this unit!";

          // update the saved unit in the availableUnits list, so the unit's card will update
          for (let i = 0; i < $scope.availableUnits.length; i++) {
            if ($scope.availableUnits[i]._id === $scope.selectedUnit._id) {
              $scope.availableUnits[i] = Object.assign({}, $scope.selectedUnit);
              break;
            }
          }
        }

        $scope.$apply();
      });
    }


  };

  var init = function() {

    unitsClient.loadUnits(null, function(units) {
      $scope.availableUnits = units;
      $scope.$apply();
    });

  };

  init();
}]);
