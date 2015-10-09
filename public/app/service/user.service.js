angular.module('app').factory('UserService', function($http, $q, $location, Reporter){
    return {
        usersPerPage: 10,
        getUsers: function(page, callback){
            $http.get('/api/users?limit='+this.usersPerPage+'&page='+page)
                .success(function(users){
                    callback(users.data);
                })
                .error(function(){
                    callback(null);
                });
        },
        getUser: function(userId, callback){
            if(userId && userId.length > 0 && userId !== '#'){
                $http.get('/api/users/'+userId)
                    .success(function(user){
                        callback(user.data);
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
            var deferred = $q.defer();
            $http.post('/api/users', User)
                .success(function(User){
                    deferred.resolve(User.data);
                })
                .error(function(data, responseCode){
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
                    deferred.reject();
                });
            return deferred.promise;
        },
        search: function(data, callback){
            $http.get('/api/users/search/'+data)
                .success(function(user){
                    callback(user.data);
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