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
    var usersEndpoint = '/api/users/1';
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
            scope.getUsers();
            $httpBackend.flush();

            expect(scope.users).toEqual(userList);
        });
        it('should send an error message if the request failed', function(){
            $httpBackend
                .expectGET(usersEndpoint)
                .respond(500);

            spyOn(UserService, 'getUsers').and.callThrough();
            spyOn(Reporter.error, 'server');

            scope.getUsers();
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
            scope.getUsers();
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
    describe('search', function(){
        var searchEndpoint = userEndpoint+'/search/'+userList[0].email;
        it('should call the UserService', function(){
            spyOn(UserService, 'search');
            scope.search(userList[0].email);

            expect(UserService.search).toHaveBeenCalledWith(userList[0].email, jasmine.any(Function));
        });
        it('should assign the result to the scope', function(){
            spyOn(UserService, 'search').and.callThrough();
            $httpBackend
                .expectGET(searchEndpoint)
                .respond(200, [userList[0]]);
            scope.search(userList[0].email);
            $httpBackend.flush();

            expect(scope.users).toEqual([userList[0]]);
        });
        it('should reset the search in case the input is empty', function(){
            spyOn(scope, 'getUsers');
            scope.search('');
            expect(scope.getUsers).toHaveBeenCalled();
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
    describe('pagination', function(){
        var nextPage = 2;
        it('should change the scope.page', function(){
            scope.page = 1;
            scope.goToPage(nextPage);
            expect(scope.page).toEqual(2);
        });
        it('should call the scope.getUsers', function(){
            spyOn(scope, 'getUsers');
            scope.goToPage(nextPage);

            expect(scope.getUsers).toHaveBeenCalled();
        });
    });
    describe('pageIterator', function(){
        describe('previousPage', function(){
            it('should iterate through the page number <<reversed>>', function(){
                scope.page = 2;
                scope.previousPage();

                expect(scope.page).toEqual(1);
            });
            it('should stop at 1', function(){
                scope.page = 1;
                scope.previousPage();

                expect(scope.page).toEqual(1);
            });
            it('should call the scope.getUsers', function(){
                scope.page = 2;
                spyOn(scope, 'getUsers');
                scope.previousPage();

                expect(scope.getUsers).toHaveBeenCalled();
            });
        });
        describe('previousPage', function(){
            it('should iterate through the page number <<reversed>>', function(){
                scope.page = 1;
                scope.nextPage();

                expect(scope.page).toEqual(2);
            });
            it('should stop at the max number of pages', function(){
                scope.lastPage = 2;
                scope.page = 2;
                scope.nextPage();

                expect(scope.page).toEqual(2);
            });
            it('should call the scope.getUsers', function(){
                scope.page = 1;
                scope.lastPage = 2;
                spyOn(scope, 'getUsers');
                scope.nextPage();

                expect(scope.getUsers).toHaveBeenCalled();
            });
        });
    });
});