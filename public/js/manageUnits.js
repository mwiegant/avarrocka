dndApp.controller('ManageUnitsController', ['$scope', function ($scope) {

  $scope.availableUnits = [];
  $scope.selectedUnit = null;
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

    $scope.refresh();
  };

  $scope.refresh = function() {
    const sums = unitsClient.calculateSums($scope.selectedUnit);

    $scope.sumAtt = sums.att;
    $scope.sumPwr = sums.pwr;
    $scope.sumMor = sums.mor;
    $scope.sumDef = sums.def;
    $scope.sumTgh = sums.tgh;
  };

  var init = function() {

    unitsClient.loadUnits(null, function(units) {
      $scope.availableUnits = units;
      $scope.$apply();
    });

  };

  init();
}]);
