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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
var dotenv = require("dotenv");
var uuid = require("uuid");
dotenv.config();
var resolvers_1 = require("./resolvers");
var MockDataWrapper_1 = require("./MockDataWrapper");
var DataWrapper_1 = require("./DataWrapper");
var db;
process.on('beforeExit', function () { db.close(); });
// const auth: ValidAuthentication = { isValid: true, userId: uuid.v4() }
var auth = { isValid: true, userId: '12345678-1234-1234-1234-123456789abc' };
var context;
var values;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var rootNode, user, childNode1, childNode2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // [ARRANGE]
                if (process.env.MOCK_DATA) {
                    console.log('USING MOCK DB');
                    db = new MockDataWrapper_1.MockDataWrapper();
                }
                else {
                    console.log('USING PROD DB');
                    db = new DataWrapper_1.DataWrapper();
                }
                return [4 /*yield*/, db.connect()];
            case 1:
                _a.sent();
                context = { auth: auth, db: db };
                console.log(context.auth);
                return [4 /*yield*/, resolvers_1.root.createRootNode({
                        listNode: { title: 'ROOT', notes: 'should not persist after test is completed' }
                    }, context)];
            case 2:
                rootNode = _a.sent();
                return [4 /*yield*/, resolvers_1.root.user({ userId: auth.userId }, context)];
            case 3:
                user = _a.sent();
                return [4 /*yield*/, resolvers_1.root.createChildNode({
                        listNode: { title: 'LEAF', notes: 'should not persist after test is completed' },
                        parentId: rootNode.nodeId
                    }, context)];
            case 4:
                childNode1 = _a.sent();
                return [4 /*yield*/, resolvers_1.root.createChildNode({
                        listNode: { title: 'LEAF', notes: 'should not persist after test is completed' },
                        parentId: rootNode.nodeId
                    }, context)];
            case 5:
                childNode2 = _a.sent();
                values = {
                    nodes: [childNode1, childNode2],
                    fullRoot: __assign(__assign({}, rootNode), { subNodes: [childNode1, childNode2] }),
                    user: user
                };
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ((_a = context.db.nodes) === null || _a === void 0 ? void 0 : _a.deleteMany({ 'metadata.owner': auth.userId }))];
            case 1:
                res = _b.sent();
                console.log('cleanup deletedCount:', res === null || res === void 0 ? void 0 : res.deletedCount);
                db.close();
                return [2 /*return*/];
        }
    });
}); });
// afterEach(async () => {
//   const res = await context.db.nodes?.find({}).toArray()
//   console.log(res)
// })
test('NEW ROOT: should create and return a root node', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // [ASSERT]
        // TODO: these can be better
        expect.assertions(7);
        expect(values.fullRoot.nodeId).toBeDefined();
        expect(values.fullRoot.completed).toBeDefined();
        expect(values.fullRoot.title).toBeDefined();
        expect(values.fullRoot.notes).toBeDefined();
        expect(values.fullRoot.rootNode).toBeDefined();
        expect(values.fullRoot.subNodes).toBeDefined();
        expect(values.fullRoot.completed).toBeDefined();
        return [2 /*return*/];
    });
}); });
test('NEW CHILD: should create, attatch to parent and return a child node', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // [ASSERT]
        // TODO: these can be better
        expect.assertions(14);
        expect(values.nodes[0].nodeId).toBeDefined();
        expect(values.nodes[0].completed).toBeDefined();
        expect(values.nodes[0].title).toBeDefined();
        expect(values.nodes[0].notes).toBeDefined();
        expect(values.nodes[0].rootNode).toBeDefined();
        expect(values.nodes[0].subNodes).toBeDefined();
        expect(values.nodes[0].completed).toBeDefined();
        expect(values.nodes[1].nodeId).toBeDefined();
        expect(values.nodes[1].completed).toBeDefined();
        expect(values.nodes[1].title).toBeDefined();
        expect(values.nodes[1].notes).toBeDefined();
        expect(values.nodes[1].rootNode).toBeDefined();
        expect(values.nodes[1].subNodes).toBeDefined();
        expect(values.nodes[1].completed).toBeDefined();
        return [2 /*return*/];
    });
}); });
test('USER: should return users own Profile if authenticated', function () { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.myProfile({}, context)
                // [ASSERT]
            ];
            case 1:
                user = _a.sent();
                // [ASSERT]
                expect.assertions(1);
                expect(user).toMatchObject(values.user);
                return [2 /*return*/];
        }
    });
}); });
test('NODE: should return node by ID if authorized', function () { return __awaiter(void 0, void 0, void 0, function () {
    var roots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.node({ nodeId: values.fullRoot.nodeId }, context)
                // [ASSERT] 
            ];
            case 1:
                roots = _a.sent();
                // [ASSERT] 
                expect.assertions(1);
                expect(roots).toMatchObject(values.fullRoot);
                return [2 /*return*/];
        }
    });
}); });
test('ROOTS: should return an authenticated users root nodes', function () { return __awaiter(void 0, void 0, void 0, function () {
    var expectedRootWithChildren, myRoots;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                expectedRootWithChildren = __assign(__assign({}, values.fullRoot), { subNodes: [values.nodes[0].nodeId, values.nodes[1].nodeId] });
                return [4 /*yield*/, resolvers_1.root.rootNodes({}, context)
                    // [ASSERT]
                ];
            case 1:
                myRoots = _a.sent();
                // [ASSERT]
                expect.assertions(1);
                expect(myRoots).toMatchObject([expectedRootWithChildren]);
                return [2 /*return*/];
        }
    });
}); });
test('(IN)COMPLETE: should mark a node as completed or incompleted and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
    var complete1, complete2, incomplete1, incomplete2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.markNodeComplete({ nodeId: values.nodes[0].nodeId }, context)];
            case 1:
                complete1 = _a.sent();
                return [4 /*yield*/, resolvers_1.root.markNodeComplete({ nodeId: values.nodes[1].nodeId }, context)];
            case 2:
                complete2 = _a.sent();
                return [4 /*yield*/, resolvers_1.root.markNodeIncomplete({ nodeId: values.nodes[0].nodeId }, context)];
            case 3:
                incomplete1 = _a.sent();
                return [4 /*yield*/, resolvers_1.root.markNodeIncomplete({ nodeId: values.nodes[1].nodeId }, context)
                    // [ASSERT]
                    // expect.assertions(4)
                ];
            case 4:
                incomplete2 = _a.sent();
                // [ASSERT]
                // expect.assertions(4)
                expect(complete1).toHaveProperty('completed', true);
                expect(complete2).toHaveProperty('completed', true);
                expect(incomplete1).toHaveProperty('completed', false);
                expect(incomplete2).toHaveProperty('completed', false);
                return [2 /*return*/];
        }
    });
}); });
test('META READER: should return node with user added or removed as reader when appropriate', function () { return __awaiter(void 0, void 0, void 0, function () {
    var added, removed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.addReader({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)];
            case 1:
                added = _a.sent();
                return [4 /*yield*/, resolvers_1.root.removeReader({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
                    // [ASSERT]
                ];
            case 2:
                removed = _a.sent();
                // [ASSERT]
                expect.assertions(2);
                expect(added).toHaveProperty('metadata.readers', [values.user.userId]);
                expect(removed).toHaveProperty('metadata.readers', []);
                return [2 /*return*/];
        }
    });
}); });
test('META WRITER: should return node with user added or removed as writer when appropriate', function () { return __awaiter(void 0, void 0, void 0, function () {
    var added, removed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.addWriter({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)];
            case 1:
                added = _a.sent();
                return [4 /*yield*/, resolvers_1.root.removeWriter({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
                    // [ASSERT]
                ];
            case 2:
                removed = _a.sent();
                // [ASSERT]
                expect.assertions(2);
                expect(added).toHaveProperty('metadata.writers', [values.user.userId]);
                expect(removed).toHaveProperty('metadata.writers', []);
                return [2 /*return*/];
        }
    });
}); });
test('META ADMIN: should return node with user added or removed as admin when appropriate', function () { return __awaiter(void 0, void 0, void 0, function () {
    var added, removed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.addAdmin({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)];
            case 1:
                added = _a.sent();
                return [4 /*yield*/, resolvers_1.root.removeAdmin({ nodeId: values.nodes[0].nodeId, userId: values.user.userId }, context)
                    // [ASSERT]
                ];
            case 2:
                removed = _a.sent();
                // [ASSERT]
                expect.assertions(2);
                expect(added).toHaveProperty('metadata.admins', [values.user.userId]);
                expect(removed).toHaveProperty('metadata.admins', []);
                return [2 /*return*/];
        }
    });
}); });
test('DELETE: return a node that henceforth can not be found', function () { return __awaiter(void 0, void 0, void 0, function () {
    var deleted, tryDeleted;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, resolvers_1.root.deleteNode({ nodeId: values.nodes[1].nodeId }, context)];
            case 1:
                deleted = _a.sent();
                if (deleted === undefined) {
                    throw new Error('failed on delete');
                }
                tryDeleted = resolvers_1.root.node({ nodeId: deleted.nodeId }, context);
                // [ASSERT]
                expect.assertions(2);
                expect(deleted).toMatchObject(values.nodes[1]);
                return [4 /*yield*/, expect(tryDeleted).rejects.toThrow("Could not authorize read on nodeId:" + deleted.nodeId)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
test('TRANSFER OWNERSHIP: should return node with new OWNER', function () { return __awaiter(void 0, void 0, void 0, function () {
    var newOwner, newOwnerContext, postTransfer, newOwnerRoots;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newOwner = __assign(__assign({}, values.user), { userId: uuid.v4() });
                newOwnerContext = __assign(__assign({}, context), { auth: __assign(__assign({}, context.auth), { userId: newOwner.userId }) });
                return [4 /*yield*/, resolvers_1.root.transferOwnership({ nodeId: values.fullRoot.nodeId, userId: newOwner.userId }, context)];
            case 1:
                postTransfer = _b.sent();
                return [4 /*yield*/, resolvers_1.root.rootNodes({}, newOwnerContext)
                    // [ASSERT]
                ];
            case 2:
                newOwnerRoots = _b.sent();
                // [ASSERT]
                expect.assertions(1);
                expect(postTransfer).toMatchObject(newOwnerRoots[0]);
                return [4 /*yield*/, ((_a = context.db.nodes) === null || _a === void 0 ? void 0 : _a.deleteMany({ 'metadata.owner': newOwner.userId }))];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
