var nJwt = require("njwt");

module.exports = function(context, req) {
    if (req.headers.authorization) {
        try {
            var token = req.headers.authorization.replace("Bearer ", "");
            var jwtKey = process.env.jwtKey;
            var verified = nJwt.verify(token, jwtKey);
            context.log(verified.body.sub);
            context.res = {
                status: 200,
                body: { message: "greetings " + verified.body.sub }
            }
        } catch(e) {
            context.res = {
                status: 401,
                body: "Unauthorized: the access token could not be verified."
            }
        }
    } else {
        context.res = {
            status: 401,
            body: "Unauthorized: no access token was passed."
        };
    }
    context.done();
};