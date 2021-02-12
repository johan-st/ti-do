"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var graphql_1 = require("graphql");
var fs_1 = require("fs");
exports.schema = graphql_1.buildSchema(fs_1.readFileSync('./src/repository/schema.graphql').toString());
