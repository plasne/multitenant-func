var nJwt = require("njwt");

module.exports = function(context, req) {
    if (req.headers.authorization) {
        try {
            
            // verify the token
            var token = req.headers.authorization.replace("Bearer ", "");
            var jwtKey = process.env.jwtKey;
            var verified = nJwt.verify(token, jwtKey);

            // build the response
            var role = "none";
            if (verified.body.scope) {
                if (verified.body.scope.indexOf("users") > -1) role = "user";
                if (verified.body.scope.indexOf("admins") > -1) role = "admin";
            }
            
            // respond
            context.res = {
                status: 200,
                body: {
                    "id": verified.body.sub,
                    "role": role,
                    "rights": (verified.body.rights) ? verified.body.rights : "none"
                }
            };
            
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