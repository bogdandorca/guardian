angular.module('app').controller('ProfileCtrl', function($scope, $routeParams, $location, UserService, Reporter){
    $scope.user = null;
    var userId = $routeParams.id;

    $scope.getUserProfile = function(){
        if(userId && userId.length > 0 && userId !== '#'){
            UserService.getUser(userId, function(user){
                $scope.user = user;
            });
        } else {
            $location.path('/');
        }
    };
    $scope.editUser = function(){
        $location.path('/user/edit/'+userId);
    };

    // DELETE
    $scope.deleteUser = function(){
        UserService.deleteUser($scope.user._id, function(){
            $location.path('/users');
        });
    };
    $scope.promptUserDelete = function(){
        Reporter.prompt.choice({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete user "'+$scope.user.email+'"?'
        }, function(){
            $scope.deleteUser();
        });
    };
});