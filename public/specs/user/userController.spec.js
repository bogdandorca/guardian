describe('UserCtrl', function(){
    var scope, controller, UserService, Reporter, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($rootScope, $controller, _UserService_, _Reporter_, _$httpBackend_){
        scope = $rootScope.$new();
        controller = $controller('UserCtrl', {
            $scope: scope
        });
        UserService = _UserService_;
        Reporter = _Reporter_;
        $httpBackend = _$httpBackend_;
    }));

    // Mock data
    var usersEndpoint = '/api/users';
    var userEndpoint = '/api/user';
    var deleteUserEndpoint = '/api/user/55f1eee2cfb224140b290f08';
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

    describe('getUsers', function(){
        it('should call the UserService.getUsers function', function(){
            spyOn(UserService, 'getUsers');
            scope.getUsers(function(){});

            expect(UserService.getUsers).toHaveBeenCalled();
        });
        it('should append the lists of users to the scope', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(200, userList);

            spyOn(UserService, 'getUsers').and.callThrough();
            scope.users = null;
            // scope.getUsers() si already called when loading the controller
            //scope.getUsers();
            $httpBackend.flush();

            expect(scope.users).toEqual(userList);
        });
        it('should send an error message if the request failed', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(500);

            spyOn(UserService, 'getUsers').and.callThrough();
            spyOn(Reporter.error, 'server');

            // scope.getUsers() si already called when loading the controller
            //scope.getUsers();
            $httpBackend.flush();

            expect(Reporter.error.server).toHaveBeenCalled();
        });
    });
    describe('deleteUser', function(){
        beforeEach(function(){
            scope.users = userList;
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(200, userList);
            $httpBackend.flush();
        });
        it('should trigger the prompt message', function(){
            spyOn(Reporter.prompt, 'choice');
            scope.promptUserDelete(0);
            expect(Reporter.prompt.choice).toHaveBeenCalled();
        });
        it('should call the UserService.deleteUser with the userId', function(){
            spyOn(UserService, 'deleteUser');
            scope.deleteUser(0);
            expect(UserService.deleteUser).toHaveBeenCalled();
        });
    });
});