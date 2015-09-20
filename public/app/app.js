angular.module('app', ['ngRoute']).config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: './partials/dashboard',
            controller: 'DashboardCtrl'
        })
        .when('/users', {
            templateUrl: './partials/users',
            controller: 'UserCtrl'
        })
        .when('/user/create', {
            templateUrl: './partials/addUser',
            controller: 'AddUserCtrl'
        })
        .when('/user/:id', {
            templateUrl: './partials/profile',
            controller: 'ProfileCtrl'
        })
        .when('/user/edit/:id', {
            templateUrl: './partials/editUser',
            controller: 'EditUserCtrl'
        })
        .when('/login', {
            templateUrl: './public/login'
        })
        .otherwise({
            templateUrl: './partials/404'
        });

    $locationProvider.html5Mode(true);
});
angular.module('app').controller('AddUserCtrl', function($scope, UserService, $location){
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 0
    };
    $scope.addUser = function(){
        UserService.addUser($scope.user, function(User){
            if(User){
                $scope.user = null;
                $location.path('/users');
            }
        });
    };

    $scope.toggleRole = function(){
        if($scope.user.role && $scope.user.role === 1){
            $scope.user.role = 0;
        } else {
            $scope.user.role = 1;
        }
    };
});
angular.module('app').controller('DashboardCtrl', function($scope){
    $scope.message = 'Working!!!';
});
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
    $scope.getUserInfo = function(index){
        if($scope.users[index] && $scope.users[index].role === 0){
            $location.path('/user/'+$scope.users[index]._id);
        }
    };
    // EDIT
    $scope.editUser = function(index, $event){
        $location.path('user/edit/'+$scope.users[index]._id);
        $event.stopPropagation();
    };
    // DELETE
    $scope.deleteUser = function(index){
        UserService.deleteUser($scope.users[index]._id, function(){
            $scope.users.splice(index, 1);
        });
    };
    $scope.promptUserDelete = function(index, $event){
        Reporter.prompt.choice({
            title: 'Are you sure?',
            text: 'Are you sure you want to delete user "'+$scope.users[index].email+'"?'
        }, function(){
            $scope.deleteUser(index);
        });
        $event.stopPropagation();
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
angular.module('app').filter('MomentParse', function(){
    return function(date){
        if(date && moment(date, 'X').isValid()){
            return moment(date, 'X').format('Do MMMM YYYY');
        } else if(!date) {
            return 'Not available';
        } else {
            return date;
        }
    };
});
angular.module('app').filter('RoleFilter', function(){
    return function(role){
        var roleNames = {
            0: 'user',
            1: 'admin',
            2: 'master'
        };

        return roleNames[role] ? roleNames[role] : 'none';
    };
});
angular.module('app').factory('Reporter', function(){
    return {
        error: {
            server: function(){
                swal({
                    title: 'Server error!',
                    text: 'Unfortunately your request could not be processed by our server. Please try again.',
                    type: 'error',
                    animation: 'slide-from-top',
                    confirmButtonText: 'Damn!'
                });
            },
            authorization: function(){
                swal({
                    title: 'Not Authorized!',
                    text: 'Unfortunately you are not authorized to so this.',
                    type: 'error',
                    animation: 'slide-from-top',
                    confirmButtonText: 'You are right :('
                });
            },
            custom: function(data){
                swal({
                    title: data.title,
                    text: data.text,
                    type: 'error',
                    animation: 'slide-from-top',
                    confirmButtonText: 'You are right :('
                });
            }
        },
        prompt: {
            choice: function(message, callback){
                swal({
                    title: message.title,
                    text: message.text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#D9534F",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, callback);
            }
        },
        notification: {
            success: function(message){
                swal({
                    title: "Good job!",
                    text: message,
                    type: "success"
                });
            }
        }
    };
});
angular.module('app').factory('StatsService', function(Reporter, $http){
    return {
        getNumberOfUsers: function(callback){
            $http.get('/api/stats/users/number')
                .success(function(data){
                    callback(data);
                })
                .error(function(){
                    Reporter.error.server();
                });
        }
    };
});
angular.module('app').factory('UserService', function($http, $location, Reporter){
    return {
        usersPerPage: 10,
        getUsers: function(page, callback){
            $http.get('/api/users?limit='+this.usersPerPage+'&page='+page)
                .success(function(users){
                    callback(users);
                })
                .error(function(){
                    callback(null);
                });
        },
        getUser: function(userId, callback){
            if(userId && userId.length > 0 && userId !== '#'){
                $http.get('/api/users/'+userId)
                    .success(function(user){
                        callback(user);
                    })
                    .error(function(err, responseCode){
                        $location.path('/');
                        switch(responseCode){
                            case 400:
                                Reporter.error.custom({
                                    title: 'Not found',
                                    text: 'This is not the user you are looking for'
                                });
                                break;
                            case 401:
                                Reporter.error.authorization();
                                break;
                            default:
                                Reporter.error.server();
                                break;
                        }
                    });
            } else {
                $location.path('/');
                Reporter.error.custom({
                    title: 'What user ID?',
                    text: 'Mate, you have forgot to send the user ID :\'('
                });
            }
        },
        deleteUser: function(userId, callback){
            $http.delete('/api/users/' + userId)
                .success(function(){
                    Reporter.notification.success('The user has been successfully deleted');
                    callback();
                })
                .error(function(data, responseCode){
                    if(responseCode === 401){
                        Reporter.error.authorization();
                    } else {
                        Reporter.error.server();
                    }
                });
        },
        addUser: function(User, callback){
            $http.post('/api/users', User)
                .success(function(User){
                    callback(User);
                    Reporter.notification.success('The user has been successfully added');
                })
                .error(function(data, responseCode){
                    callback();
                    if(responseCode === 401){
                        Reporter.error.authorization();
                    } else if(responseCode === 403) {
                        Reporter.error.custom({
                            title: 'Umm.. mate...',
                            text: 'The email address is already used. Try another.'
                        });
                    } else{
                        Reporter.error.server();
                    }
                });
        },
        search: function(data, callback){
            $http.get('/api/users/search/'+data)
                .success(function(user){
                    callback(user);
                })
                .error(function(){
                    Reporter.error.server();
                });
        },
        editUser: function(User){
            $http.put('/api/users', User)
                .success(function(){
                    Reporter.notification.success('You have edited a user!');
                    $location.path('/user/'+User._id);
                })
                .error(function(err, responseCode){
                    if(responseCode === 401){
                        Reporter.error.authorization();
                    } else if(responseCode === 400){
                        Reporter.error.custom({
                            title: 'Oupss!',
                            text: err
                        });
                    } else {
                        Reporter.error.server();
                    }
                });
        }
    };
});