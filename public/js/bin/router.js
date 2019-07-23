dndApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/encounters', {
          templateUrl: 'partials/encounters.html',
          controller: 'EncountersController'
        })
        .otherwise({
          redirectTo: 'partials/error.html'
        });
  }
]);