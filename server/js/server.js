"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var PORT = process.env.PORT || 80;
var BUILD_PATH = process.env.BUILD_PATH || '../client/build';
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.get('/test', function (_, res) { res.json({ PORT: PORT, BUILD_PATH: BUILD_PATH }); });
app.use(express_1.default.static(BUILD_PATH));
app.listen(PORT, function () {
    console.log("express is listening on http://localhost:" + PORT);
});
