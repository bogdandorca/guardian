angular.module('app').controller('UserCtrl', function($scope, $location, UserService, StatsService, Reporter){
    $scope.users = null;
    // Pagination
    var usersPerPage = 10;
    $scope.page = 1;
    $scope.lastPage = 1;
    $scope.getPagesArray = function(){
        return new Array($scope.lastPage);
    };

    $scope.rowDisplayRules = function(role){
        var classes = ['clickable', 'blue-background', 'red-background'];
        return classes[role];
    };

    $scope.getUsers = function(){
        UserService.getUsers($scope.page, function(response){
            if(response){
                $scope.users = response;
            } else {
                Reporter.error.server();
            }
        });
    };
    // DELETE
    $scope.deleteUser = function(index){
        UserService.deleteUser($scope.users[index]._id, function(){
            $scope.users.splice(index, 1);
        });
    };
    $scope.promptUserDelete = function(index){
        Reporter.prompt.choice({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete user "'+$scope.users[index].email+'"?'
        }, function(){
            $scope.deleteUser(index);
        });
    };
    // Pagination
    $scope.initializePagination = function(){
        StatsService.getNumberOfUsers(function(data){
            $scope.lastPage = Math.ceil(parseInt(data)/usersPerPage);
        });
    };
    $scope.goToPage = function(page){
        $scope.page = page;
        $scope.getUsers();
    };
    $scope.previousPage = function(){
        if($scope.page > 1){
            $scope.page--;
            $scope.getUsers();
        }
    };
    $scope.nextPage = function(){
        if($scope.page < $scope.lastPage){
            $scope.page++;
            $scope.getUsers();
        }
    };
});