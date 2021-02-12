"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var express_graphql_1 = require("express-graphql");
var repository_1 = require("./repository");
var routes_1 = require("./routes");
var bespokeExtras_1 = require("./bespokeExtras");
var repository_2 = require("./repository");
var PORT = process.env.PORT || 80;
var BUILD_DIR = process.env.BUILD_DIR || '../client/build';
var db;
if (process.env.MOCK_DATA) {
    console.log('USING MOCK DB');
    db = new repository_2.MockDataWrapper();
}
else {
    console.log('USING PROD DB');
    db = new repository_2.DataWrapper();
}
db.connect();
process.on('beforeExit', function () { db.close(); });
var app = express();
// TODO: be more selecvtive when handling cors
// TODO: typechecking for cors module
app.use(cors());
// TODO:  body parser is deprecated
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/test', function (req, res) { res.json(req); });
app.post('/test', function (req, res) { res.json(req.body); });
// Protected routes 
app.use(function (req, res, next) {
    var auth = bespokeExtras_1.authenticator(req);
    if (auth.isValid) {
        console.log(auth);
        app.get('/login', routes_1.mainRoute);
        app.use('/gql', express_graphql_1.graphqlHTTP({
            schema: repository_1.schema,
            rootValue: repository_1.root,
            graphiql: true,
            context: { auth: auth, db: db }
        }));
    }
    next();
});
app.post('/login', routes_1.loginRoute);
app.use(express.static(BUILD_DIR));
app.listen(PORT, function () {
    console.log("express is listening on http://localhost:" + PORT);
});
