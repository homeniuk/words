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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWord = exports.downloadWords = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ErrorHandler_1 = require("../middlewares/ErrorHandler");
const words_1 = require("../db/words");
const userWords_1 = require("../db/userWords");
const downloadWords = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { words } = req.body;
        if (!words) {
            next(new ErrorHandler_1.BadRequestError('There are no array words'));
            return;
        }
        let quantityExist = (yield (0, words_1.getAllWords)()).length;
        for (let i = 0; i < words.length; i++) {
            quantityExist = quantityExist + 1;
            const data = {
                number: quantityExist,
                english: words[i].english,
                transcription: words[i].transcription,
                ukrainian: words[i].ukrainian,
            };
            const newWord = yield (0, words_1.createWord)(data);
        }
        return res.json(words);
    }
    catch (error) {
        next(new ErrorHandler_1.ServerError('Server error'));
    }
});
exports.downloadWords = downloadWords;
const getWord = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            next(new ErrorHandler_1.UnauthorizedError('You are not registered'));
            return;
        }
        const token = authorizationHeader.split(' ')[1];
        if (!token) {
            next(new ErrorHandler_1.UnauthorizedError('You are not registered'));
            return;
        }
        let userID = '';
        try {
            const userData = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
            userID = userData.id;
        }
        catch (e) {
            next(new ErrorHandler_1.UnauthorizedError('You are not registered'));
            return;
        }
        const { number, word, success } = req.body;
        if (number) {
            yield (0, userWords_1.increaseCorrect)(userID, number);
        }
        //get first 20 word
        let unKnownWords = (0, userWords_1.getFirstUnnown)(userID, 20);
        if (!unKnownWords) {
            const allUserWords = (0, userWords_1.getUserWords)(userID);
            if (!allUserWords) { //maybe first time
                const allWords = yield (0, words_1.getAllWords)();
                allWords.forEach((w) => __awaiter(void 0, void 0, void 0, function* () {
                    const data = {
                        user: userID,
                        number: w.number,
                        word: w._id,
                        correct: 0,
                    };
                    const newUserWord = yield (0, userWords_1.createUserWord)(data);
                }));
                unKnownWords = (0, userWords_1.getFirstUnnown)(userID, 20);
            }
            else { //or end
                return res.json({ message: "The words have run out" });
            }
        }
        return res.json(unKnownWords);
    }
    catch (error) {
        next(new ErrorHandler_1.ServerError('Server error'));
    }
});
exports.getWord = getWord;
//# sourceMappingURL=wordController.js.map