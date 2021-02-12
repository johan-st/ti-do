"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
var express_1 = require("express");
var route = express_1.Router();
exports.route = route;
var handler = function (req, res) {
    console.log('main handler');
};
route.post('/login', handler);
