angular.module('app').factory('Reporter', function(){
    return {
        error: {
            server: function(){
                swal({
                    title: 'Server error!',
                    text: 'Unfortunately your request could not be processed by our server. Please try again.',
                    type: 'error',
                    animation: 'slide-from-top',
                    confirmButtonText: 'Damn!'
                });
            },
            authorization: function(){
                swal({
                    title: 'Not Authorized!',
                    text: 'Unfortunately you are not authorized to so this.',
                    type: 'error',
                    animation: 'slide-from-top',
                    confirmButtonText: 'You are right :('
                });
            }
        },
        prompt: {
            choice: function(message, callback){
                swal({
                    title: message.title,
                    text: message.text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#D9534F",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, callback);
            }
        },
        notification: {
            success: function(message){
                swal({
                    title: "Good job!",
                    text: message,
                    type: "success"
                });
            }
        }
    };
});