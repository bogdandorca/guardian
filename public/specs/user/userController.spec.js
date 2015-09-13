describe('UserCtrl', function(){
    var scope, controller, UserService, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($rootScope, $controller, _UserService_, _$httpBackend_){
        scope = $rootScope.$new();
        controller = $controller('UserCtrl', {
            $scope: scope
        });
        UserService = _UserService_;
        $httpBackend = _$httpBackend_;
    }));

    // Mock data
    var usersEndpoint = '/api/users';
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
        it('should send the user an error message if the request was rejected', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(500);

            spyOn(UserService, 'getUsers').and.callThrough();
            spyOn(toastr, 'error');

            // scope.getUsers() si already called when loading the controller
            //scope.getUsers();
            $httpBackend.flush();

            expect(toastr.error).toHaveBeenCalledWith('Your request could not be processed');
        });
    });
});