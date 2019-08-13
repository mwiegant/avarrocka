dndApp.controller('ManageUnitsController', ['$scope', function ($scope) {

  $scope.availableUnits = [];
  $scope.selectedUnit = null;

  $scope.selectUnit = function(unit) {
    $scope.selectedUnit = unit;

    // TODO - update fields in the unit-portrait, once that UI is built out

  };

  var init = function() {

    unitsClient.loadUnits(null, function(units) {
      $scope.availableUnits = units;
      $scope.$apply();
    });

  };

  init();
}]);
