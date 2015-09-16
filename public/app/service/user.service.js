angular.module('app').factory('UserService', function($http, Reporter){
    return {
        getUsers: function(page, callback){
            $http.get('/api/users/'+page)
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
        },
        addUser: function(User, callback){
            $http.post('/api/user', User)
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
            $http.get('/api/user/search/'+data)
                .success(function(user){
                    callback(user);
                })
                .error(function(){
                    Reporter.error.server();
                });
        }
    };
});