angular.module('app').factory('UserService', function($http, Reporter){
    return {
        getUsers: function(callback){
            $http.get('/api/users')
                .success(function(users){
                    callback(users);
                })
                .error(function(){
                    callback(null);
                });
        },
        deleteUser: function(userId, callback){
            $http.delete('/api/user/' + userId)
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
        }
    };
});