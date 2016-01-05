angular.module('directivePractice')
.directive('lessonHider', function(){
  return {
    templateUrl: 'lessonHider.html',
    restrict: 'E',
    scope: {
      lesson: '=',
      dayAlert: '&'
    },
    controller: function($scope, lessonService){
      $scope.getSchedule = lessonService.getSchedule();
    },
    link: function(scope, element, attributes){
      scope.removeLesson = function(){
        element.css('display', 'none');
      };

      var toggle = true;
      scope.checkOr = function(){
        if (toggle === true) {
          element.css('text-decoration', 'none');
          toggle = false;
        }
        else if (toggle === false) {
          element.css('text-decoration', 'line-through');
          toggle = true;
        }
      };

      scope.getSchedule.then(function(response){
        scope.schedule = response.data;

        scope.schedule.forEach(function(scheduleDay){
          if (scheduleDay.lesson === scope.lesson) {
            element.css('text-decoration', 'line-through');
            scope.lessonDay = scheduleDay.weekday;
            return;
          }
        });
      });
    }
  };
});
