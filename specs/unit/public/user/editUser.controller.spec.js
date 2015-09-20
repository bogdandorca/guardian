describe('EditUserCtrl', function(){
    var EditUserCtrl, $httpBackend, UserService, scope, Reporter;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, _$httpBackend_, _UserService_, $rootScope, _Reporter_){
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        UserService = _UserService_;
        EditUserCtrl = $controller('EditUserCtrl', {
            $scope: scope,
            $rootScope: {
                id: '55f1eee2cfb224140b290f08'
            }
        });
        Reporter = _Reporter_;
    }));

    var userList = [
        {
            _id: "55f1eee2cfb224140b290f08",
            firstName: "",
            lastName: "Admin",
            email: "admin@sparrow.com",
            creationDate: "Thu Sep 10 2015 23:57:03 GMT+0300",
            role: 2
        },
        {
            _id: "55f21320fd03e49411a76de3",
            firstName: "Bogdan",
            lastName: "Dorca",
            email: "bogdandorca@gmail.com",
            creationDate: "Fri Sep 11 2015 02:31:47 GMT+0300",
            role: 0
        }
    ];

    var userEndpoint = '/api/users';

    describe('getUserProfile', function(){
        it('should call the UserService to get the user profile', function(){
            spyOn(UserService, 'getUser');

            scope.userId = userList[0]._id;
            scope.getUserProfile();

            expect(UserService.getUser).toHaveBeenCalled();
        });
    });

    describe('updateUser', function(){
        it('should check if the user details are updated', function(){
            spyOn(Reporter.error, 'custom');

            scope.initialUser = userList[0];
            scope.user = userList[0];

            scope.updateUser();

            expect(Reporter.error.custom).toHaveBeenCalled();
        });
        it('should call the UserService if the user data has been modified', function(){
            spyOn(UserService, 'editUser');

            scope.initialUser = userList[0];
            scope.user = userList[1];

            scope.updateUser();

            expect(UserService.editUser).toHaveBeenCalled();
        });
    });
});