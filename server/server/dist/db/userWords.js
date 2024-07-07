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
exports.increaseCorrect = exports.createUserWord = exports.getUserWord = exports.getFirstUnnown = exports.getUserWords = exports.UserWordModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const UserWordSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
    number: { type: Number, required: true },
    word: { type: mongoose_2.Schema.Types.ObjectId, ref: 'Word' },
    /*english:      {type: String, required: true},
    transcription:{type: String, required: true},
    ukrainian:    {type: String, required: true},*/
    correct: { type: Number, required: true }
});
exports.UserWordModel = mongoose_1.default.model('UserWord', UserWordSchema);
const getUserWords = (user) => exports.UserWordModel.find({ user });
exports.getUserWords = getUserWords;
const getFirstUnnown = (user, quantity) => exports.UserWordModel.find({ user, correct: { $lt: 11 } }).sort({ number: 1 }).limit(quantity).populate('word');
exports.getFirstUnnown = getFirstUnnown;
//export const getUserWord = (user:Schema.Types.ObjectId, number:number) => UserWordModel.find({user, number});
const getUserWord = (user, number) => exports.UserWordModel.find({ user, number });
exports.getUserWord = getUserWord;
const createUserWord = (data) => {
    const word = exports.UserWordModel.create(data);
    return word;
};
exports.createUserWord = createUserWord;
const increaseCorrect = (user, number) => __awaiter(void 0, void 0, void 0, function* () {
    const userWord = yield exports.UserWordModel.find({ user, number });
    userWord.correct = userWord.correct + 1;
    yield userWord.save();
});
exports.increaseCorrect = increaseCorrect;
//# sourceMappingURL=userWords.js.map