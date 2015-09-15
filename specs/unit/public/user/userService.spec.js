describe('UserService', function(){
    var UserService, Reporter, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_UserService_, _Reporter_, _$httpBackend_){
        UserService = _UserService_;
        Reporter = _Reporter_;
        $httpBackend = _$httpBackend_;
    }));

    // Mock data
    var usersEndpoint = '/api/users';
    var userEndpoint = '/api/user';
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
                .expectGET(usersEndpoint + '/1')
                .respond(200);

            var success;
            UserService.getUsers(1, function(){
                success = true;
            });
            $httpBackend.flush();

            expect(success).toBe(true);
        });
        it('should return a list of users if the request succeeded', function(){
            $httpBackend
                .expectGET(usersEndpoint+'/1')
                .respond(200, userList);

            var expectedUserList;
            UserService.getUsers(1, function(users){
                expectedUserList = users;
            });
            $httpBackend.flush();

            expect(expectedUserList).toEqual(userList);
        });
        it('should return NULL if the request fails', function(){
            $httpBackend
                .expectGET(usersEndpoint+'/1')
                .respond(500, 'Server unavailable');

            var expectedResponse;
            UserService.getUsers(1, function(response){
                expectedResponse = response;
            });
            $httpBackend.flush();

            expect(expectedResponse).toBe(null);
        });
    });
    describe('deleteUser', function(){
        it('should send a notification based on the server response', function(){
            spyOn(Reporter.notification, 'success');
            spyOn(Reporter.error, 'authorization');
            spyOn(Reporter.error, 'server');

            var responseCodesToBeTested = [200, 401, 500],
                responseTriggers = [Reporter.notification.success, Reporter.error.authorization, Reporter.error.server];
            for(var i=0; i<responseCodesToBeTested.length; i++){
                $httpBackend
                    .expectDELETE(userEndpoint+'/55f1eee2cfb224140b290f08')
                    .respond(parseInt(responseCodesToBeTested[i]));

                UserService.deleteUser(userList[0]._id, function(){});
                $httpBackend.flush();

                expect(responseTriggers[i]).toHaveBeenCalled();
            }
        });
    });
    describe('addUser', function(){
        var User = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@user.com',
            password: 'helloWWW',
            role: 0
        };
        it('should send an API request', function(){
            $httpBackend
                .expectPOST(userEndpoint)
                .respond(200, User);

            var success;
            UserService.addUser(User, function(UserResponse){
                success = true;
            });
            $httpBackend.flush();

            expect(success).toBe(true);
        });
        it('should return the User object if the request succeeded', function(){
            $httpBackend
                .expectPOST(userEndpoint)
                .respond(200, User);

            var responseObj;
            UserService.addUser(User, function(UserResponse){
                responseObj = UserResponse;
            });
            $httpBackend.flush();

            expect(responseObj).toEqual(User);
        });
        it('should send a specific message after the request is processed', function(){
            spyOn(Reporter.notification, 'success');
            spyOn(Reporter.error, 'authorization');
            spyOn(Reporter.error, 'server');

            var responseCodesToBeTested = [200, 401, 500],
                responseTriggers = [Reporter.notification.success, Reporter.error.authorization, Reporter.error.server];
            for(var i=0; i<responseCodesToBeTested.length; i++){
                $httpBackend
                    .expectPOST(userEndpoint)
                    .respond(parseInt(responseCodesToBeTested[i]));

                UserService.addUser(User, function(){});
                $httpBackend.flush();

                expect(responseTriggers[i]).toHaveBeenCalled();
            }
        });
    });
    describe('userSearch', function(){
        var searchEndpoint = userEndpoint+'/search/'+userList[0].email;
        it('should send an API call with the search data', function(){
            $httpBackend
                .expectGET(searchEndpoint)
                .respond(200);
            var success;
            UserService.search(userList[0].email, function(){
                success = true;
            });
            $httpBackend.flush();
            expect(success).toBe(true);
        });
        it('should return the user object if the request is successful', function(){
            $httpBackend
                .expectGET(searchEndpoint)
                .respond(200, [userList[0]]);
            var expectedObject;
            UserService.search(userList[0].email, function(user){
                expectedObject = user;
            });
            $httpBackend.flush();
            expect(expectedObject).toEqual([userList[0]]);
        });
        it('should send a notification in case there is a server error', function(){
            spyOn(Reporter.error, 'server');
            $httpBackend
                .expectGET(searchEndpoint)
                .respond(500, 'Server error');
            UserService.search(userList[0].email, function(user){});
            $httpBackend.flush();

            expect(Reporter.error.server).toHaveBeenCalled();
        });
    });
});