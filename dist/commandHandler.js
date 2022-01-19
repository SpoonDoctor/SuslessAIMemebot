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
var memeGen_1 = require("./memeGen");
var axios_1 = require("axios");
var acronymresolver = require("acronymresolver");
function randomEnumKey() {
    var IDKeys = Object.keys(memeGen_1.ImageID).filter(function (x) { return !(parseInt(x) >= 0); });
    var randomIndex = Math.floor(Math.random() * IDKeys.length);
    return IDKeys[randomIndex];
}
function handleAcronym(messageText) {
    return __awaiter(this, void 0, void 0, function () {
        var acronymText, groupmeText, groupmeMessageContent, gmReqOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    acronymText = messageText.substring('/acronym '.length).trim().toUpperCase();
                    groupmeText = "Acronym is too long. Must be under 15 chars.";
                    if (acronymText.length < 15) {
                        groupmeText = acronymresolver(acronymText);
                    }
                    else if (acronymText.length == 0) {
                        groupmeText = "You forgot the acronym, bonehead.";
                    }
                    if (!(groupmeText.trim() !== '')) return [3 /*break*/, 2];
                    groupmeMessageContent = {
                        'bot_id': process.env.BOT_ID,
                        'text': groupmeText
                    };
                    gmReqOptions = {
                        method: 'POST',
                        baseURL: 'https://api.groupme.com/v3/bots/post',
                        data: groupmeMessageContent,
                        headers: { "content-type": "application/json" }
                    };
                    return [4 /*yield*/, axios_1.default.request(gmReqOptions).catch(function (error) {
                            console.log(error);
                        })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
exports.handleAcronym = handleAcronym;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function handleCommand(messageText) {
    return __awaiter(this, void 0, void 0, function () {
        var groupMeText, IDKeys, _i, IDKeys_1, templateType, templateType, templateId, groupmeMessageContent, gmReqOptions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupMeText = '';
                    if (!(messageText.indexOf('-templates') !== -1)) return [3 /*break*/, 1];
                    groupMeText = 'The following meme templates are currently supported: ';
                    IDKeys = Object.keys(memeGen_1.ImageID).filter(function (x) { return !(parseInt(x) >= 0); });
                    for (_i = 0, IDKeys_1 = IDKeys; _i < IDKeys_1.length; _i++) {
                        templateType = IDKeys_1[_i];
                        groupMeText += (templateType + '  ');
                    }
                    return [3 /*break*/, 7];
                case 1:
                    if (!(messageText.length > 6)) return [3 /*break*/, 5];
                    templateType = messageText.substring('/meme '.length).trim().toUpperCase();
                    templateId = memeGen_1.ImageID[templateType];
                    if (!templateId) return [3 /*break*/, 3];
                    return [4 /*yield*/, memeGen_1.getAIMeme(templateId)];
                case 2:
                    groupMeText = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    groupMeText = 'Bad template name';
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, memeGen_1.getAIMeme(memeGen_1.ImageID[randomEnumKey()])];
                case 6:
                    groupMeText = _a.sent();
                    _a.label = 7;
                case 7:
                    if (!(groupMeText !== '')) return [3 /*break*/, 9];
                    groupmeMessageContent = {
                        'bot_id': process.env.BOT_ID,
                        'text': groupMeText
                    };
                    gmReqOptions = {
                        method: 'POST',
                        baseURL: 'https://api.groupme.com/v3/bots/post',
                        data: groupmeMessageContent,
                        headers: { "content-type": "application/json" }
                    };
                    return [4 /*yield*/, axios_1.default.request(gmReqOptions).catch(function (error) {
                            console.log(error);
                        })];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.handleCommand = handleCommand;
