angular.module('app').directive('userSearchBar', function(UserService){
    var linker = function(scope, element){
        scope.search = function(input){
            if(input && input.length > 0){
                UserService.search(input, function(userData){
                    scope.users = userData;
                });
            } else {
                scope.getUsers();
            }
        };
    };
    return {
        restrict: 'E',
        template: '<input type="text" ng-model="searchInput" ng-change="search(searchInput)" placeholder="Search by email" class="form-control">',
        link: linker
    };
});