dndApp.controller('ManageEncountersController', ['$scope', function ($scope) {

  $scope.availableEncounters = [];
  $scope.selectedEncounter = null;
  $scope.saveSuccessful = null;
  $scope.saveMessage = null;

  var init = function() {

    encountersClient.loadEncounters(null, function(encounters) {
      $scope.availableEncounters = encounters;

      // per encounter, per SelectedHostile, get the name of the hostile unit
      $scope.availableEncounters.forEach(function(encounter) {

        for (let i = 0; i < encounter.SelectedHostiles.length; i++) {
          unitsClient.getHostileUnit(encounter.SelectedHostiles[i], false, function(hostile) {
            encounter.SelectedHostiles[i] = hostile.Name;
            $scope.$apply();
          });
        }



      });

      $scope.$apply();
    });
  };

  init();
}]);
