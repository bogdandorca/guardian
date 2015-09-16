describe('AddUserCtrl', function(){
    var AddUserCtrl, $httpBackend, UserService, scope;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, _$httpBackend_, _UserService_, $rootScope){
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        UserService = _UserService_;
        AddUserCtrl = $controller('AddUserCtrl', {
            $scope: scope
        });
    }));
    var userEndpoint = '/api/user';

    describe('addUser', function(){
        it('should call the UserService to add the new user\'s data', function(){
            spyOn(UserService, 'addUser');

            scope.addUser();
            expect(UserService.addUser).toHaveBeenCalled();
        });
        it('should clear the User object after the user has been added', function(){
            spyOn(UserService, 'addUser').and.callThrough();
            $httpBackend
                .expectPOST(userEndpoint)
                .respond(200, 'not null');
            scope.user = 'not null';

            scope.addUser();
            $httpBackend.flush();

            expect(scope.user).toBe(null);
        });

    });
    describe('toggleRole', function(){
        it('should set toggle the user\' role', function(){
            var possibilities = [0, 1];
            var expectedResults = [1, 0];

            for(var i=0; i<possibilities.length; i++){
                scope.user.role = possibilities[i];
                scope.toggleRole();

                expect(scope.user.role).toEqual(expectedResults[i]);
            }
        });
    });
});