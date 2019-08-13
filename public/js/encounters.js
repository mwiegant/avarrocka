dndApp.controller('EncountersController', ['$scope', function ($scope) {

  $scope.availableUnits = [];

  var init = function() {

    unitsClient.loadUnits(null, function(units) {
      $scope.availableUnits = units;
      $scope.$apply();
    });

  };

  init();
}]);
