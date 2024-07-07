import mongoose from "mongoose";
import { Schema, Types } from "mongoose";
import { getAllWords } from "./words";

interface UWord {
    user: Types.ObjectId,
    number: number,
    word: Types.ObjectId,
    correct: number
  }
interface Iword {
    english: string,
    transcription: string,
    ukrainian: string,
  }

const UserWordSchema = new mongoose.Schema({
    user:         {type: Schema.Types.ObjectId, ref: 'User'},
    number:       {type: Number, required: true},
    word:         {type: Schema.Types.ObjectId, ref: 'Word'},
    correct:      {type: Number, required: true}
});

export const UserWordModel =  mongoose.model<UWord>('UserWord', UserWordSchema);

export const getWordsByUser = async (user:string) => UserWordModel.find({user});

export const getWordByUserNumber = async (user:string, number:number) => UserWordModel.find({user, number});

export const createUserWord = async (data: Record<string, any>) => {
    const word = UserWordModel.create(data);
    return word;
};

export const copyWordsToUser = async (userID:string)=> {
    const allWords = await getAllWords();
        allWords.forEach(async (w)=>{
            const data = {
            user: userID, 
            number: w.number, 
            word: w._id,
            correct: 0,
            };
    const newUserWord = await createUserWord(data);
    })
}

export const increaseCorrectWord = async (user:string, number:number)=>{
    const userWord:any = await UserWordModel.find({user, number});
    userWord.forEach(async (word:any)=>{
        word.correct = word.correct + 1;
        await word.save();
    })
}

export const getFirstUnnown = async (user:string, quantity:number) => UserWordModel.find({user, correct:{$lt:11}}).sort({number:1}).limit(quantity).populate<{ word: Iword }>('word');