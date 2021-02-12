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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockUsers = exports.MockDataWrapper = void 0;
var graphql_1 = require("graphql");
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var mongoUser = process.env.MONGO_USER || '';
var mongoPass = process.env.MONGO_PW || '';
var url = 'mongodb+srv://cluster0.nq5ro.mongodb.net/';
var options = {
    appname: 'ti-do',
    authSource: 'admin',
    wtimeout: 2000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: mongoUser,
        password: mongoPass
    }
};
var MockDataWrapper = /** @class */ (function () {
    function MockDataWrapper() {
        this.options = options;
        this.client = new MongoClient(MockDataWrapper.url, this.options);
    }
    MockDataWrapper.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        resolve();
                    })];
            });
        });
    };
    MockDataWrapper.prototype.userByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var user = exports.mockUsers.find(function (u) { u.email === email; });
                        if (user) {
                            resolve(__assign({}, user));
                        }
                        else {
                            reject(new graphql_1.GraphQLError('failed to get user by email'));
                        }
                    })];
            });
        });
    };
    MockDataWrapper.prototype.userById = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var user = exports.mockUsers.find(function (u) { return u.userId === userId; });
                        if (user) {
                            resolve(__assign({}, user));
                        }
                        else {
                            reject(new graphql_1.GraphQLError('failed to get user by userId'));
                        }
                    })];
            });
        });
    };
    MockDataWrapper.prototype.nodeById = function (nodeId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var node = mockNodes.find(function (n) { return n.nodeId === nodeId; });
                        if (node) {
                            resolve(__assign({}, node));
                        }
                        else {
                            reject(new graphql_1.GraphQLError("Could not authorize read on nodeId:" + nodeId));
                        }
                    })];
            });
        });
    };
    MockDataWrapper.prototype.rootsByOwner = function (ownerId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nodes = mockNodes.filter(function (n) { return n.rootNode && n.metadata.owner === ownerId; });
                        if (nodes) {
                            resolve(nodes);
                        }
                        else {
                            reject(('rootsByOwner rejected'));
                        }
                    })];
            });
        });
    };
    MockDataWrapper.prototype.addListNode = function (listNode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        mockNodes.push(listNode);
                        resolve(_this.nodeById(listNode.nodeId));
                    })];
            });
        });
    };
    MockDataWrapper.prototype.updateListNode = function (listNode) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        var index = mockNodes.findIndex(function (n) { return n.nodeId === listNode.nodeId; });
                        mockNodes[index] = listNode;
                        resolve(_this.nodeById(listNode.nodeId));
                    })];
            });
        });
    };
    MockDataWrapper.prototype.deleteNode = function (nodeId) {
        return new Promise(function (resolve, reject) {
            var index = mockNodes.findIndex(function (n) { return n.nodeId === nodeId; });
            if (index) {
                mockNodes.splice(index, 1);
                resolve(true);
            }
            else {
                reject(new graphql_1.GraphQLError("Could not authorize read on nodeId:" + nodeId));
            }
        });
    };
    MockDataWrapper.prototype.close = function () {
        console.log('close() called on MOCK dataWrapper');
    };
    MockDataWrapper.url = url;
    return MockDataWrapper;
}());
exports.MockDataWrapper = MockDataWrapper;
// MOCK DATA
exports.mockUsers = [{
        userId: '12345678-1234-1234-1234-123456789abc',
        fullName: 'Johan Strand',
        email: 'johan@styldesign.se',
        passwordHash: '72d0585274e2780a551e154eef8217121cf3b35ef2bd65efc9695580fdc51695576ba38f5846d039fbfa97994e0f56b048466d073e52a3c169fee63844e0c00d',
        hashType: 'SHA512',
        hashSalt: 'rYFmMHFM3oCWMETL',
        tagline: 'first man on the baloon',
        avatar: 'https://avatars.dicebear.com/4.1/api/avataaars/jayMan.svg'
    }];
var mockNodes = [];
