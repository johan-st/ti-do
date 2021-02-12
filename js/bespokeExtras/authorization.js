"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canWrite = exports.canRead = exports.canDelete = exports.canAdmin = void 0;
var canRead = function (userId, node) {
    return (node === null || node === void 0 ? void 0 : node.metadata.owner) === userId
        || (node === null || node === void 0 ? void 0 : node.metadata.readers.includes(userId))
        || (node === null || node === void 0 ? void 0 : node.metadata.writers.includes(userId))
        || (node === null || node === void 0 ? void 0 : node.metadata.admins.includes(userId))
        ? true : false;
};
exports.canRead = canRead;
var canWrite = function (userId, node) {
    return (node === null || node === void 0 ? void 0 : node.metadata.owner) === userId
        || (node === null || node === void 0 ? void 0 : node.metadata.writers.includes(userId))
        || (node === null || node === void 0 ? void 0 : node.metadata.admins.includes(userId))
        ? true : false;
};
exports.canWrite = canWrite;
var canAdmin = function (userId, node) {
    return (node === null || node === void 0 ? void 0 : node.metadata.owner) === userId
        || (node === null || node === void 0 ? void 0 : node.metadata.admins.includes(userId))
        ? true : false;
};
exports.canAdmin = canAdmin;
var canDelete = function (userId, node) {
    return (node === null || node === void 0 ? void 0 : node.metadata.owner) === userId
        || (node === null || node === void 0 ? void 0 : node.metadata.writers.includes(userId))
        || (node === null || node === void 0 ? void 0 : node.metadata.admins.includes(userId))
        ? true : false;
};
exports.canDelete = canDelete;
