var generateMessageTemplate = function(status, data){
    var errorStatus = (status !== 200);
    return {
        error: errorStatus,
        status: status,
        data: data
    };
};

module.exports = {
    success: function(res, data){
        var message = generateMessageTemplate(200, data);
        res.status(200).send(message);
    },
    error: {
        custom: function(res, status, data){
            var message = generateMessageTemplate(status, data);
            res.status(status).send(message);
        },
        badRequest: function(res){
            // 400
            var message = generateMessageTemplate(400, 'Bad request');
            res.status(400).send(message);
        },
        unauthorized: function(res){
            // 401
            var message = generateMessageTemplate(401, 'Unauthorized');
            res.status(401).send(message);
        },
        forbidden: function(res){
            // 403
            var message = generateMessageTemplate(403, 'Forbidden');
            res.status(403).send(message);
        },
        internalServerError: function(res){
            // 500
            var message = generateMessageTemplate(400, 'Internal server error');
            res.status(500).send(message);
        },
        notImplemented: function(res){
            // 501
            var message = generateMessageTemplate(501, 'Not implemented');
            res.status(501).send(message);
        },
        serviceUnavailable: function(res){
            // 503
            var message = generateMessageTemplate(503, 'Service unavailable');
            res.status(503).send(message);
        }
    }
};