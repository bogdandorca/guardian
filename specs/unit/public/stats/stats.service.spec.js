describe('StatsService', function(){
    var StatsService, Reporter, $httpBackend;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_StatsService_, _Reporter_, _$httpBackend_){
        StatsService = _StatsService_;
        Reporter = _Reporter_;
        $httpBackend = _$httpBackend_;
    }));

    var statsEndpoint = '/api/stats';

    describe('getNumberOfUsers', function(){
        it('should return the total number of users', function(){
            $httpBackend
                .expectGET(statsEndpoint+'/users/number')
                .respond(200, 120);
            var success;
            StatsService.getNumberOfUsers(function(number){
                success = number;
            });
            $httpBackend.flush();

            expect(success).toBe(120);
        });
        it('should send an error if the request fails', function(){
            spyOn(Reporter.error, 'server');
            $httpBackend
                .expectGET(statsEndpoint+'/users/number')
                .respond(500);
            var success;
            StatsService.getNumberOfUsers(function(){});
            $httpBackend.flush();

            expect(Reporter.error.server).toHaveBeenCalled();
        });
    });
});