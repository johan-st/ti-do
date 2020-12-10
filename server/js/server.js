"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var PORT = process.env.PORT || 80;
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.static(path_1.default.join('..', 'client', 'build')));
app.listen(PORT, function () {
    console.log("express is listening on http://localhost:" + PORT);
});
