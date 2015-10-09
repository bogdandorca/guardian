angular.module('app').factory('AuthService', function($http, $q, Reporter){
    return {
        user: null,
        initialized: false,
        getUser: function(){
            return this.user;
        },
        initUserSession: function(){
            var deferred = $q.defer();
            if(this.user !== null){
                deferred.resolve(this.user.data);
            } else {
                var that = this;
                $http.get('/api/users/info/profile')
                    .success(function (user) {
                        deferred.resolve(user.data);
                        that.user = user;
                    })
                    .error(function(){
                        deferred.reject();
                    });
            }
            this.initialized = true;
            return deferred.promise;
        },
        login: function(userCredentials){
            var deferred = $q.defer();
            var that = this;
            $http.post('/auth/login', userCredentials)
                .success(function(user){
                    deferred.resolve(user.data);
                    that.user = user;
                })
                .error(function(){
                    deferred.resolve(null);
                });
            return deferred.promise;
        },
        logout: function(){
            var deferred = $q.defer();
            var that = this;
            $http.delete('/auth/logout')
                .success(function(){
                    deferred.resolve();
                    that.user = null;
                })
                .error(function(err){
                    deferred.reject();
                    Reporter.error.custom({
                        title: 'Server error',
                        text: 'Unfortunately we have not been able to log you out. You are stuck here forever.'
                    });
                });
            return deferred.promise;
        },
        isLoggedIn: function(){
            return (this.user !== null);
        }
    };
});