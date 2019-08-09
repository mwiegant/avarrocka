dndApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/encounters', {
          templateUrl: 'partials/encounters.html',
          controller: 'EncountersController'
        })
        .when('/manage-units', {
          templateUrl: 'partials/manage-units.html',
          controller: 'ManageUnitsController'
        })
        .when('/manage-encounters', {
          templateUrl: 'partials/manage-encounters.html',
          controller: 'ManageEncountersController'
        })
        .when('/manage-hostiles', {
          templateUrl: 'partials/manage-hostiles.html',
          controller: 'ManageHostilesController'
        })
        .when('/', {})
        .otherwise({
          redirectTo: 'partials/error.html',
          templateUrl: 'partials/error.html'
        });
  }
]);