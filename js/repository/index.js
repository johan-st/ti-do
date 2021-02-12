"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDataWrapper = exports.DataWrapper = exports.root = exports.schema = void 0;
var schema_1 = require("./schema");
Object.defineProperty(exports, "schema", { enumerable: true, get: function () { return schema_1.schema; } });
var DataWrapper_1 = require("./DataWrapper");
Object.defineProperty(exports, "DataWrapper", { enumerable: true, get: function () { return DataWrapper_1.DataWrapper; } });
var MockDataWrapper_1 = require("./MockDataWrapper");
Object.defineProperty(exports, "MockDataWrapper", { enumerable: true, get: function () { return MockDataWrapper_1.MockDataWrapper; } });
var resolvers_1 = require("./resolvers");
Object.defineProperty(exports, "root", { enumerable: true, get: function () { return resolvers_1.root; } });
