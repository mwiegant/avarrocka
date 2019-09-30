dndApp.controller('ManageUnitsController', ['$scope', function ($scope) {

  $scope.availableUnits = [];
  $scope.selectedUnit = null;
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

  $scope.selectUnit = function(unit) {
    $scope.saveSuccessful = null;
    $scope.saveMessage = null;

    // deep copy, so that un-saved changes will completely disappear when a new unit is selected
    $scope.selectedUnit = Object.assign({}, unit);

    loadSelectedKeywords(unit.Keywords);

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

  $scope.refreshKeywords = function() {
    // TODO - fix this code (for whatever reason, the selected options are not being updated in the model)

    let keywords = "";

    keywords += $scope.selectedAncestry.key;
    keywords += " " + $scope.selectedExperience.key;
    keywords += " " + $scope.selectedEquipment.key;
    keywords += " " + $scope.selectedUnitType.key;

    $scope.selectedUnit.Keywords = keywords;
  };

  $scope.createUnit = function() {
    $scope.selectedUnit = {
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

  $scope.saveUnit = function() {
    if ($scope.selectedUnit === null)
      alert("Cannot save unit: there is no unit currently selected.");

    // existing units will always have an id greater than 0
    const isNewUnit = $scope.selectedUnit._id <= 0;

    if (isValidPortrait()) {
      if (isNewUnit)
        $scope.selectedUnit._id = Date.now();

      unitsClient.saveUnit($scope.selectedUnit, isNewUnit, false, function(response) {
        $scope.saveSuccessful = response.success;

        if (response.success === false) {
          $scope.saveMessage = "Failed to save this unit!";
        }
        else {
          $scope.saveMessage = "Successfully saved this unit!";

          if (isNewUnit) {
            $scope.availableUnits.push(Object.assign({}, $scope.selectedUnit));
          }
          else {
            // update the saved unit in the availableUnits list, so the unit's card will update
            for (let i = 0; i < $scope.availableUnits.length; i++) {
              if ($scope.availableUnits[i]._id === $scope.selectedUnit._id) {
                $scope.availableUnits[i] = Object.assign({}, $scope.selectedUnit);
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

    if ($scope.selectedUnit.Name === undefined || $scope.selectedUnit.Name.length == 0) {
      $scope.saveSuccessful = false;
      $scope.saveMessage = "Error saving unit: the unit must have a name.";
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

    unitsClient.loadUnits(null, function(units) {
      $scope.availableUnits = units;
      $scope.$apply();
    });
  }

  init();
}]);
