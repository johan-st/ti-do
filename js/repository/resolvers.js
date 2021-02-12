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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = void 0;
var uuid = require("uuid");
var graphql_1 = require("graphql");
var bespokeExtras_1 = require("../bespokeExtras");
// TODO: who should be able to get a users data?
var getUser = function (args, context) {
    if (!context.auth.isValid) {
        throw new graphql_1.GraphQLError('getUser: Request can not be Authenticated');
    }
    return context.db.userById(args.userId);
};
// TODO: who should be able to get a users data?
var getMyProfile = function (args, context) {
    if (!context.auth.isValid) {
        throw new graphql_1.GraphQLError('getUser: Request can not be Authenticated');
    }
    return context.db.userById(context.auth.userId);
};
// TODO: typing
var getNode = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (bespokeExtras_1.canRead(context.auth.userId, node)) {
                            var subNodesProms = node.subNodes.map(function (sn) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(typeof sn === 'string')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, context.db.nodeById(sn)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                        case 2: return [2 /*return*/, sn];
                                    }
                                });
                            }); });
                            Promise.all(subNodesProms).then(function (subs) {
                                resolve(__assign(__assign({}, node), { subNodes: subs }));
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                        else {
                            reject(new graphql_1.GraphQLError("Could not authorize read on nodeId:" + args.nodeId));
                        }
                    })];
        }
    });
}); };
var getRoots = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!context.auth.isValid) {
            throw new graphql_1.GraphQLError('getNode: Request can not be Authenticated');
        }
        return [2 /*return*/, context.db.rootsByOwner(context.auth.userId)];
    });
}); };
var createRootNode = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var metadata, newNode, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!context.auth.isValid) {
                    throw new graphql_1.GraphQLError('createRootNode: Request can not be Authenticated');
                }
                metadata = {
                    owner: context.auth.userId,
                    readers: [],
                    writers: [],
                    admins: []
                };
                newNode = __assign(__assign({}, args.listNode), { rootNode: true, subNodes: [], nodeId: uuid.v4(), completed: false, metadata: metadata });
                return [4 /*yield*/, context.db.addListNode(newNode)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var createChildNode = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var parent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!context.auth.isValid) {
                    throw new graphql_1.GraphQLError('createChildNode: Request can not be Authenticated');
                }
                return [4 /*yield*/, context.db.nodeById(args.parentId)];
            case 1:
                parent = _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (bespokeExtras_1.canWrite(context.auth.userId, parent)) {
                            var metadata = {
                                owner: context.auth.userId,
                                readers: [],
                                writers: [],
                                admins: []
                            };
                            var newNode = __assign(__assign({}, args.listNode), { rootNode: false, subNodes: [], nodeId: uuid.v4(), completed: false, metadata: metadata });
                            var result = context.db.addListNode(newNode);
                            result.then(function (childNode) {
                                parent.subNodes = __spreadArrays(parent.subNodes, [childNode.nodeId]);
                                context.db.updateListNode(parent).then(function () {
                                    resolve(childNode);
                                }).catch(function (err) {
                                    reject(err);
                                });
                            });
                        }
                    })];
        }
    });
}); };
var deleteNode = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (bespokeExtras_1.canDelete(context.auth.userId, node)) {
                            context.db.deleteNode(args.nodeId)
                                .then(function (res) {
                                if (res) {
                                    resolve(node);
                                }
                                else {
                                    reject(new graphql_1.GraphQLError('Could not delete node'));
                                }
                            });
                        }
                    })];
        }
    });
}); };
var markNodeComplete = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canWrite(context.auth.userId, node)) {
                    node.completed = true;
                    return [2 /*return*/, context.db.updateListNode(node)];
                }
                return [2 /*return*/];
        }
    });
}); };
var markNodeIncomplete = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canWrite(context.auth.userId, node)) {
                    node.completed = false;
                    return [2 /*return*/, context.db.updateListNode(node)];
                }
                return [2 /*return*/];
        }
    });
}); };
var addReader = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canRead(context.auth.userId, node)) {
                    if (node.metadata.readers.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    node.metadata.readers.push(args.userId);
                    return [2 /*return*/, context.db.updateListNode(node)];
                }
                return [2 /*return*/];
        }
    });
}); };
var removeReader = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node, index, newReaders, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canAdmin(context.auth.userId, node)) {
                    if (!node.metadata.readers.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    index = node.metadata.readers.indexOf(args.userId);
                    newReaders = node.metadata.readers.splice(index, 0);
                    newNode = __assign(__assign({}, node), { metadata: __assign(__assign({}, node.metadata), { readers: newReaders }) });
                    return [2 /*return*/, context.db.updateListNode(newNode)];
                }
                return [2 /*return*/];
        }
    });
}); };
var addWriter = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canAdmin(context.auth.userId, node)) {
                    if (node.metadata.writers.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    node.metadata.writers.push(args.userId);
                    return [2 /*return*/, context.db.updateListNode(node)];
                }
                return [2 /*return*/];
        }
    });
}); };
var removeWriter = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node, index, newWriters, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canAdmin(context.auth.userId, node)) {
                    if (!node.metadata.writers.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    index = node.metadata.writers.indexOf(args.userId);
                    newWriters = node.metadata.writers.splice(index, 0);
                    newNode = __assign(__assign({}, node), { metadata: __assign(__assign({}, node.metadata), { writers: newWriters }) });
                    return [2 /*return*/, context.db.updateListNode(newNode)];
                }
                return [2 /*return*/];
        }
    });
}); };
var addAdmin = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canAdmin(context.auth.userId, node)) {
                    if (node.metadata.admins.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    node.metadata.admins.push(args.userId);
                    return [2 /*return*/, context.db.updateListNode(node)];
                }
                return [2 /*return*/];
        }
    });
}); };
var removeAdmin = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node, index, newAdmins, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (bespokeExtras_1.canAdmin(context.auth.userId, node)) {
                    if (!node.metadata.admins.includes(args.userId)) {
                        return [2 /*return*/, node];
                    }
                    index = node.metadata.admins.indexOf(args.userId);
                    newAdmins = node.metadata.admins.splice(index, 0);
                    newNode = __assign(__assign({}, node), { metadata: __assign(__assign({}, node.metadata), { admins: newAdmins }) });
                    return [2 /*return*/, context.db.updateListNode(newNode)];
                }
                return [2 /*return*/];
        }
    });
}); };
var transferOwnership = function (args, context) { return __awaiter(void 0, void 0, void 0, function () {
    var node, newNode;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, context.db.nodeById(args.nodeId)];
            case 1:
                node = _a.sent();
                if (node) {
                    if (node.metadata.owner === args.userId) {
                        return [2 /*return*/, node];
                    }
                    newNode = __assign(__assign({}, node), { metadata: __assign(__assign({}, node.metadata), { owner: args.userId }) });
                    return [2 /*return*/, context.db.updateListNode(newNode)];
                }
                return [2 /*return*/];
        }
    });
}); };
// Root resolver
exports.root = {
    user: getUser,
    myProfile: getMyProfile,
    node: getNode,
    rootNodes: getRoots,
    createRootNode: createRootNode,
    createChildNode: createChildNode,
    deleteNode: deleteNode,
    markNodeComplete: markNodeComplete,
    markNodeIncomplete: markNodeIncomplete,
    addReader: addReader,
    removeReader: removeReader,
    addWriter: addWriter,
    removeWriter: removeWriter,
    addAdmin: addAdmin,
    removeAdmin: removeAdmin,
    transferOwnership: transferOwnership
};
