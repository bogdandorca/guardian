angular.module('app').directive('authLoader', function(AuthService, $timeout){
    var linker = function(scope, element){
        scope.loading = true;
        scope.$watch(function(){
            return AuthService.initialized;
        }, function(){
            $timeout(function(){
                scope.loading = !AuthService.initialized;
            }, 1000);
        });
    };
    return {
        restrict: 'E',
        template: '<div class="loader" ng-show="loading">' +
            '<i class="fa fa-circle-o-notch fa-spin"></i>' +
            '<p>Initializing the application</p>' +
            '</div>',
        link: linker
    };
});