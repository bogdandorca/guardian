describe('UserService', function(){
    var UserService, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_UserService_, _$httpBackend_){
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
        it('should send a HTTP call to the specific endpoint', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(200);

            var success;
            UserService.getUsers(function(){
                success = true;
            });
            $httpBackend.flush();

            expect(success).toBe(true);
        });
        it('should return a list of users if the request succeeded', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(200, userList);

            var expectedUserList;
            UserService.getUsers(function(users){
                expectedUserList = users;
            });
            $httpBackend.flush();

            expect(expectedUserList).toEqual(userList);
        });
        it('should return NULL if the request fails', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(500, 'Server unavailable');

            var expectedResponse;
            UserService.getUsers(function(response){
                expectedResponse = response;
            });
            $httpBackend.flush();

            expect(expectedResponse).toBe(null);
        });
    });
});