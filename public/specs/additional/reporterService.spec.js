describe('Reporter', function(){
    var Reporter;

    beforeEach(angular.mock.module('app'));
    beforeEach(inject(function(_Reporter_){
        Reporter = _Reporter_;
    }));

    describe('Error', function(){
        describe('Server', function(){
            var Error = {
                title: 'Server error!',
                text: 'Unfortunately your request could not be processed by our server. Please try again.',
                type: 'error',
                animation: 'slide-from-top',
                confirmButtonText: 'Damn!'
            };

            it('should call the reporting service with the specific object', function(){
                spyOn(window, 'swal');

                Reporter.error.server();

                expect(window.swal).toHaveBeenCalledWith(Error);
            });
        });
        describe('Authorization', function(){
            var Error = {
                title: 'Not Authorized!',
                text: 'Unfortunately you are not authorized to so this.',
                type: 'error',
                animation: 'slide-from-top',
                confirmButtonText: 'You are right :('
            };
            it('should call the reporting service with the specific object', function(){
                spyOn(window, 'swal');
                Reporter.error.authorization();

                expect(window.swal).toHaveBeenCalledWith(Error);
            });
        });
    });
    describe('Prompt', function(){
        describe('Choice', function(){
            var promptParams = {
                title: 'Are you sure?',
                text: 'Are you sure you want to delete user "test@email.com"?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#D9534F',
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            };
            var promptCallback = function(){

            };

            it('should call the reporting service with the specific object', function(){
                spyOn(window, 'swal');
                Reporter.prompt.choice({
                    title: promptParams.title,
                    text: promptParams.text
                }, promptCallback);

                expect(window.swal).toHaveBeenCalledWith(promptParams, promptCallback);
            });
        });
    });
    describe('Notification', function(){
        describe('Success', function(){
            var Message = {
                title: "Good job!",
                text: "The user has been successfully deleted.",
                type: "success"
            };
            it('should call swal with the specific message', function(){
                spyOn(window, 'swal');
                Reporter.notification.success("The user has been successfully deleted.");
                expect(window.swal).toHaveBeenCalledWith(Message);
            });
        });
    });
});