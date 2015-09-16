describe('RoleFilter', function(){
    var $filter;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    it('should return a role name', function(){
        var testCases = {
            0: 'user',
            1: 'admin',
            2: 'master',
            3: 'none'
        };

        for(var i=0;i<4;i++){
            var result = $filter('RoleFilter')(i);
            expect(result).toEqual(testCases[i]);
        }
    });
});