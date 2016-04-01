module.exports = function(context, req) {
    if (req.headers.authorization) {
        var token = req.headers.authorization.replace("Bearer ", "");
        context.res = {
            status: 200,
            body: { message: "greetings guy" }
        }
    } else {
        context.res = {
            status: 401,
            body: "Unauthorized: no access token was passed."
        };
    }
    context.done();
};