angular.module('app').controller('UserCtrl', function($scope, $location, UserService, Reporter){
    $scope.users = null;
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 0
    };
    // Pagination
    $scope.page = 1;
    // TODO: dynamically load this
    $scope.lastPage = 2;

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

    $scope.addUser = function(){
        UserService.addUser($scope.user, function(User){
            if(User){
                $scope.user = null;
                $location.path('/users');
            }
        });
    };
    $scope.search = function(input){
        if(input && input.length > 0){
            UserService.search(input, function(userData){
                $scope.users = userData;
            });
        } else {
            $scope.getUsers();
        }
    };
    $scope.toggleRole = function(){
        if($scope.user.role && $scope.user.role === 1){
            $scope.user.role = 0;
        } else {
            $scope.user.role = 1;
        }
    };

    // Pagination
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