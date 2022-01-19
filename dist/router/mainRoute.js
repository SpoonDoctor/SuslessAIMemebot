"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var commandHandler_1 = require("../commandHandler");
var router = express.Router();
exports.router = router;
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.post('/', function (req, res) {
    var messageText = req.body.text;
    if (req.body && messageText.indexOf('/meme') !== -1 && req.body.sender_type === "user") {
        commandHandler_1.handleCommand(messageText);
    }
    else if (req.body && messageText.indexOf('/acronym') !== -1 && req.body.sender_type === "user") {
        commandHandler_1.handleAcronym(messageText);
    }
    res.sendStatus(200);
});
