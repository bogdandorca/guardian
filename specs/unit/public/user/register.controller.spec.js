describe('AddUserCtrl', function(){
    var RegisterCtrl, $httpBackend, UserService, scope;
    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function($controller, _$httpBackend_, _UserService_, $rootScope){
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        UserService = _UserService_;
        RegisterCtrl = $controller('RegisterCtrl', {
            $scope: scope
        });
    }));
    var userEndpoint = '/api/users';
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

    describe('register', function(){
        //TODO: migrate to the ValidationService
        it('should check if the email and emailConfirmation match', function(){
            scope.user.email = userList[0].email;
            scope.emailConfirmation = '';

            expect(scope.emailsMatch()).toBe(false);

            scope.emailConfirmation = scope.user.email;
            expect(scope.emailsMatch()).toBe(true);
        });
        it('should check if the password and passwordConfirmation match', function(){
            scope.user.password = userList[0].password;
            scope.passwordConfirmation = '';

            expect(scope.passwordsMatch()).toBe(false);

            scope.passwordConfirmation = scope.user.password;
            expect(scope.passwordsMatch()).toBe(true);
        });
        it('should call the UserService to add the new user\'s data', function(){
            spyOn(UserService, 'addUser');

            scope.register();
            expect(UserService.addUser).toHaveBeenCalled();
        });
    });
    describe('resetUserForm', function(){
        var emptyUser = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };
        it('should reset the user form to the initial value', function(){
            scope.user = userList[0];

            RegisterCtrl.resetUserForm();

            expect(scope.user).toEqual(emptyUser);
        });
    });
});