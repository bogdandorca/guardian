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