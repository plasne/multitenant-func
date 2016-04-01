var nJwt = require("njwt");

module.exports = function(context, req) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.replace("Bearer ", "");
        var jwtKey = process.env.jwtKey;
        context.log(process.env);
        context.log(jwtKey);
        nJwt.verify(token, jwtKey, function(err, verified) {
            if (err) {
                context.log(err);
                context.res = {
                    status: 401,
                    body: "Unauthorized: the access token could not be verified."
                }
            } else {
                context.res = {
                    status: 200,
                    body: { message: "greetings " + verified.body.sub }
                }
            }
        });
    } else {
        context.res = {
            status: 401,
            body: "Unauthorized: no access token was passed."
        };
    }
    context.done();
};