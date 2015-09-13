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