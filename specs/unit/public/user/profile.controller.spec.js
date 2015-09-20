describe('ProfileCtrl', function(){
    var ProfileCtrl, UserService, scope, Reporter;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, $rootScope, _UserService_, _Reporter_){
        scope = $rootScope.$new();
        ProfileCtrl = $controller('ProfileCtrl', {
            $scope: scope,
            $routeParams: {
                id: '55f1eee2cfb224140b290f08'
            }
        });
        UserService = _UserService_;
        Reporter = _Reporter_;
    }));

    describe('getUserProfile', function(){
        it('should call the UserService to get the user profile', function(){
            spyOn(UserService, 'getUser');

            scope.getUserProfile();

            expect(UserService.getUser).toHaveBeenCalled();
        });
    });
});