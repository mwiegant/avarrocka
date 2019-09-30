dndApp.controller('ManageHostilesController', ['$scope', function ($scope) {

  $scope.availableHostiles = [];
  $scope.selectedHostile = null;
  $scope.saveSuccessful = null;
  $scope.saveMessage = null;

  $scope.ancestryOptions = null;
  $scope.experienceOptions = null;
  $scope.equipmentOptions = null;
  $scope.unitTypeOptions = null;
  $scope.size = null; // unsure if I need this...will keep for now

  $scope.selectedAncestry = null;
  $scope.selectedExperience = null;
  $scope.selectedEquipment = null;
  $scope.selectedUnitType = null;

  $scope.sumAtt = 0;
  $scope.sumPwr = 0;
  $scope.sumMor = 0;
  $scope.sumDef = 0;
  $scope.sumTgh = 0;

  $scope.selectHostile = function(hostile) {
    $scope.saveSuccessful = null;
    $scope.saveMessage = null;

    // deep copy, so that un-saved changes will completely disappear when a new hostile unit is selected
    $scope.selectedHostile = Object.assign({}, hostile);

    loadSelectedKeywords(hostile.Keywords);

    $scope.sumAtt = 0;
    $scope.sumPwr = 0;
    $scope.sumMor = 0;
    $scope.sumDef = 0;
    $scope.sumTgh = 0;

    $scope.refreshSums();
  };

  $scope.refreshSums = function() {
    const sums = unitsClient.calculateSums($scope.selectedHostile);

    $scope.sumAtt = sums.att;
    $scope.sumPwr = sums.pwr;
    $scope.sumMor = sums.mor;
    $scope.sumDef = sums.def;
    $scope.sumTgh = sums.tgh;
  };

  $scope.refreshKeywords = function() {
    // TODO - fix this code (for whatever reason, the selected options are not being updated in the model)

    let keywords = "";

    keywords += $scope.selectedAncestry.key;
    keywords += " " + $scope.selectedExperience.key;
    keywords += " " + $scope.selectedEquipment.key;
    keywords += " " + $scope.selectedUnitType.key;

    $scope.selectedHostile.Keywords = keywords;
  };

  $scope.createHostile = function() {
    $scope.selectedHostile = {
      _id: -1,
      Name : "",
      Keywords : "",
      ATT : 0,
      DEF : 0,
      PWR : 0,
      TGH : 0,
      MOR : 0,
      MAX_STR : 4,
      STR : 4,
      MAN_ATT : 0,
      MAN_DEF : 0,
      MAN_PWR : 0,
      MAN_TGH : 0,
      MAN_MOR : 0,
      Alive: true
    };

    $scope.sumAtt = 0;
    $scope.sumPwr = 0;
    $scope.sumMor = 0;
    $scope.sumDef = 0;
    $scope.sumTgh = 0;
  };

  $scope.saveHostile = function() {
    if ($scope.selectedHostile === null)
      alert("Cannot save hostile unit: there is no hostile unit currently selected.");

    // existing hostile units will always have an id greater than 0
    const isNewHostile = $scope.selectedHostile._id <= 0;

    if (isValidPortrait()) {
      if (isNewHostile)
        $scope.selectedHostile._id = Date.now();

      unitsClient.saveHostile($scope.selectedHostile, isNewHostile, false, function(response) {
        $scope.saveSuccessful = response.success;

        if (response.success === false) {
          $scope.saveMessage = "Failed to save this hostile unit!";
        }
        else {
          $scope.saveMessage = "Successfully saved this hostile unit!";

          if (isNewHostile) {
            $scope.availableHostiles.push(Object.assign({}, $scope.selectedHostile));
          }
          else {
            // update the saved hostile unit in the availableHostiles list, so the unit's card will update
            for (let i = 0; i < $scope.availableHostiles.length; i++) {
              if ($scope.availableHostiles[i]._id === $scope.selectedHostile._id) {
                $scope.availableHostiles[i] = Object.assign({}, $scope.selectedHostile);
                break;
              }
            }
          }
        }

        $scope.$apply();
      });
    }
  };

  function isValidPortrait() {
    let isValid = false;

    if ($scope.selectedHostile.Name === undefined || $scope.selectedHostile.Name.length == 0) {
      $scope.saveSuccessful = false;
      $scope.saveMessage = "Error saving hostile unit: the hostile unit must have a name.";
    }

    // TODO -- add validation for keywords once that functionality is working
    // else if () {}

    else {
      isValid = true;
    }


    return isValid;
  }

  function loadSelectedKeywords(_keywords) {
    const ANCESTRY = 0;
    const EXPERIENCE = 1;
    const EQUIPMENT = 2;
    const UNIT_TYPE = 3;

    // keywords should always have this order: Ancestry Experience Equipment UnitType
    const keywords = _keywords.split(" ");

    for (let i = 0; i < unitConstants.ancestry.length; i++) {
      if (unitConstants.ancestry[i].key == keywords[ANCESTRY]) {
        $scope.selectedAncestry = unitConstants.ancestry[i];
      }
    }

    for (let i = 0; i < unitConstants.experience.length; i++) {
      if (unitConstants.experience[i].key == keywords[EXPERIENCE]) {
        $scope.selectedExperience = unitConstants.experience[i];
      }
    }

    for (let i = 0; i < unitConstants.equipment.length; i++) {
      if (unitConstants.equipment[i].key == keywords[EQUIPMENT]) {
        $scope.selectedEquipment = unitConstants.equipment[i];
      }
    }

    for (let i = 0; i < unitConstants.unitType.length; i++) {
      if (unitConstants.unitType[i].key == keywords[UNIT_TYPE]) {
        $scope.selectedUnitType = unitConstants.unitType[i];
      }
    }
  }

  function init() {

    // load constants into the scope, so drop-downs will be populated
    $scope.ancestryOptions = unitConstants.ancestry;
    $scope.experienceOptions = unitConstants.experience;
    $scope.equipmentOptions = unitConstants.equipment;
    $scope.unitTypeOptions = unitConstants.unitType;

    unitsClient.loadHostiles(null, function(hostiles) {
      $scope.availableHostiles = hostiles;
      $scope.$apply();
    });
  }

  init();
}]);
