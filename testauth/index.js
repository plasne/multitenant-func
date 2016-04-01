var nJwt = require("njwt");

module.exports = function(context, req) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.replace("Bearer ", "");
        var jwtKey = process.env.jwtKey;
        try {
            nJwt.verify(token, jwtKey, function(err, verified) {
                context.log("here-01");
                if (err) {
                    context.log(err);
                    context.log("here-03");
                    context.res = {
                        status: 401,
                        body: "Unauthorized: the access token could not be verified."
                    }
                } else {
                    context.log("here-02");
                    context.log(verified.body.sub);
                    context.res = {
                        status: 200,
                        body: { message: "greetings " + verified.body.sub }
                    }
                }
            });
        } catch(e) {
            context.log(e);
        }
    } else {
        context.res = {
            status: 401,
            body: "Unauthorized: no access token was passed."
        };
    }
    context.done();
};