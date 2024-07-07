import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    number:       {type: Number, required: true},
    english:      {type: String, required: true},
    transcription:{type: String, required: true},
    ukrainian:    {type: String, required: true}
});

export const WordModel =  mongoose.model('Word', WordSchema);

export const getAllWords = () => WordModel.find();

export const createWord = (data: Record<string, any>) => {
    const word = WordModel.create(data);
    return word;
};
