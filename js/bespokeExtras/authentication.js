"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticator = void 0;
var jwt = require("jsonwebtoken");
var secret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'dev-secret';
var authenticator = function (req) {
    var token = req.cookies['x-auth-token'];
    if (process.env.DEBUG) {
        var validAuth = { isValid: true, userId: '12345678-1234-1234-1234-123456789abc' };
        console.log('REQUEST BLINDLY AUTHENTICADED IN DEBUG MODE');
        return validAuth;
    }
    if (token) {
        try {
            var verifiedToken = jwt.verify(token, secret);
            if (verifiedToken.userId) {
                var validAuth = {
                    isValid: true,
                    userId: verifiedToken.userId
                };
                return validAuth;
            }
        }
        catch (error) {
            console.log(error);
            var invalidAuth_1 = { isValid: false };
            return invalidAuth_1;
        }
    }
    var invalidAuth = { isValid: false };
    return invalidAuth;
};
exports.authenticator = authenticator;
