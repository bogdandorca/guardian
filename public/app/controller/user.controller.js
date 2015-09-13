angular.module('app').controller('UserCtrl', function($scope, UserService, Reporter){
    $scope.users = null;

    $scope.getUsers = function(){
        UserService.getUsers(function(response){
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


    $scope.getUsers();
});