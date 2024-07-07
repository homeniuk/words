"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWord = exports.getAllWords = exports.WordModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const WordSchema = new mongoose_1.default.Schema({
    number: { type: Number, required: true },
    english: { type: String, required: true },
    transcription: { type: String, required: true },
    ukrainian: { type: String, required: true }
});
exports.WordModel = mongoose_1.default.model('Word', WordSchema);
const getAllWords = () => exports.WordModel.find();
exports.getAllWords = getAllWords;
const createWord = (data) => {
    const word = exports.WordModel.create(data);
    return word;
};
exports.createWord = createWord;
//# sourceMappingURL=words.js.map