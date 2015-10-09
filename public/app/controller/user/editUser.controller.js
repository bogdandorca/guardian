angular.module('app').controller('EditUserCtrl', function($scope, UserService, Reporter, $routeParams, $location){
    $scope.userId = $routeParams.id;
    $scope.initialUser = null;
    $scope.user = null;

    $scope.getUserProfile = function(){
        if($scope.userId && $scope.userId.length > 0 && $scope.userId !== '#'){
            UserService.getUser($scope.userId, function(User){
                initialUser = User;
                $scope.user = User;
            });
        } else {
            $location.path('/');
        }
    };

    $scope.toggleRole = function(){
        if($scope.user.role && $scope.user.role === 1){
            $scope.user.role = 0;
        } else {
            $scope.user.role = 1;
        }
    };

    $scope.updateUser = function(){
        if($scope.user != $scope.initialUser){
            UserService.editUser($scope.user);
        } else {
            Reporter.error.custom({
                title: 'The user was not updated',
                text: 'The user details were not updated so the user info was not forwarded.'
            });
        }
    };
});