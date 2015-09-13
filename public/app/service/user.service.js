angular.module('app').factory('UserService', function($http){
    return {
        getUsers: function(callback){
            $http.get('/api/users')
                .success(function(users){
                    callback(users);
                })
                .error(function(err){
                    callback(null);
                });
        }
    };
});