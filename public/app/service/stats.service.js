angular.module('app').factory('StatsService', function(Reporter, $http){
    return {
        getNumberOfUsers: function(callback){
            $http.get('/api/stats/users/number')
                .success(function(data){
                    callback(data.data);
                })
                .error(function(){
                    Reporter.error.server();
                });
        }
    };
});