module.exports = function (db) {
    return {
        requireAuthentication: function (req, res, next) {
            var token = req.get('Auth');
            console.log('require authentication');
            db.user.findByToken(token).then(function (user) {
                console.log('middleware, user is ', user);
                req.user = user;
                next();
            }, function () {
                console.log('something went wrong in middleware');
                res.status(401).send();
            });
        }
    };
};