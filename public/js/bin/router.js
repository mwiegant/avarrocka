dndApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
        .when('/encounters', {
          templateUrl: 'partials/encounters.html',
          controller: 'EncountersController'
        })
        .when('/', {})
        .otherwise({
          redirectTo: 'partials/error.html'
        });
  }
]);