describe('UserCtrl', function(){
    var scope, controller, UserService, StatsService, Reporter, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($rootScope, $controller, _UserService_, _Reporter_, _StatsService_, _$httpBackend_){
        scope = $rootScope.$new();
        controller = $controller('UserCtrl', {
            $scope: scope
        });
        UserService = _UserService_;
        Reporter = _Reporter_;
        StatsService = _StatsService_;
        $httpBackend = _$httpBackend_;
    }));

    // Mock data
    var getUsersEndpoint = '/api/users?limit=10&page=1';
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
                .expectGET(getUsersEndpoint)
                .respond(200, userList);

            spyOn(UserService, 'getUsers').and.callThrough();
            scope.users = null;
            scope.getUsers();
            $httpBackend.flush();

            expect(scope.users).toEqual(userList);
        });
        it('should send an error message if the request failed', function(){
            $httpBackend
                .expectGET(getUsersEndpoint)
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
        });
        it('should trigger the prompt message', function(){
            var $event = {
                stopPropagation: function(){}
            };

            spyOn(Reporter.prompt, 'choice');
            scope.promptUserDelete(0, $event);
            expect(Reporter.prompt.choice).toHaveBeenCalled();
        });
        it('should call the UserService.deleteUser with the userId', function(){
            spyOn(UserService, 'deleteUser');
            scope.deleteUser(0);
            expect(UserService.deleteUser).toHaveBeenCalled();
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
        describe('usersNumber', function(){
            it('should call the UserService', function(){
                spyOn(StatsService, 'getNumberOfUsers');

                scope.initializePagination();

                expect(StatsService.getNumberOfUsers).toHaveBeenCalled();
            });
        });
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
                scope.lastPage = 2;
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