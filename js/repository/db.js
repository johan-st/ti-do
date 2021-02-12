"use strict";
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
exports.DataWrapper = void 0;
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
var DataWrapper = /** @class */ (function () {
    function DataWrapper() {
        this.options = options;
        this.client = new MongoClient(DataWrapper.url, this.options);
    }
    DataWrapper.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, this.client.connect()
                        .then(function () {
                        _this.users = _this.client.db('tido').collection('users');
                        _this.nodes = _this.client.db('tido').collection('nodes');
                    })];
            });
        });
    };
    DataWrapper.prototype.userByEmail = function (email) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.users) === null || _a === void 0 ? void 0 : _a.findOne({ email: email }))];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    DataWrapper.prototype.userById = function (userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.users) === null || _a === void 0 ? void 0 : _a.findOne({ userId: userId }))];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    DataWrapper.prototype.nodeById = function (nodeId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.findOne({ nodeId: nodeId }))];
                    case 1:
                        list = _b.sent();
                        return [2 /*return*/, list];
                }
            });
        });
    };
    DataWrapper.prototype.rootsByOwner = function (ownerId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var listNodes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.find({ rootNode: true, 'metadata.owner': ownerId }).toArray())];
                    case 1:
                        listNodes = _b.sent();
                        // TODO: row below ok?
                        return [2 /*return*/, listNodes];
                }
            });
        });
    };
    DataWrapper.prototype.addListNode = function (listNode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.insertOne(listNode))];
                    case 1:
                        r = _b.sent();
                        if (r === null || r === void 0 ? void 0 : r.result.ok) {
                            return [2 /*return*/, listNode];
                        }
                        throw new Error('Could not add node');
                }
            });
        });
    };
    DataWrapper.prototype.updateListNode = function (listNode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.replaceOne({ nodeId: listNode.nodeId }, listNode))];
                    case 1:
                        r = _b.sent();
                        if (r) {
                            return [2 /*return*/, listNode];
                        }
                        throw new Error('Could not update node');
                }
            });
        });
    };
    DataWrapper.prototype.deleteNode = function (nodeId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var r;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this.nodes) === null || _a === void 0 ? void 0 : _a.findOneAndDelete({ nodeId: nodeId }))];
                    case 1:
                        r = _b.sent();
                        return [2 /*return*/, (r === null || r === void 0 ? void 0 : r.ok) ? true : false];
                }
            });
        });
    };
    DataWrapper.prototype.close = function () {
        this.client.close();
    };
    DataWrapper.url = url;
    return DataWrapper;
}());
exports.DataWrapper = DataWrapper;
