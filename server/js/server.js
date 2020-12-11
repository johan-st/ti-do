"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 80;
var BUILD_DIR = process.env.BUILD_DIR || '../client/build';
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/test', function (_, res) { res.json(__assign({}, process.env)); });
app.use(express_1.default.static(BUILD_DIR));
app.listen(PORT, function () {
    console.log("express is listening on http://localhost:" + PORT);
});
