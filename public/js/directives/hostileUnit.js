/*
  It may be possible at some point that hostile units have a different card layout than normal units.

  To this end, I've built out a separate directive but it calls the same unit.html page as the 'mw-unit' directive
 */
dndApp.directive('mw-hostile-unit', function() {
  return {
    templateUrl: 'partials/directives.unit.html'
  }
});