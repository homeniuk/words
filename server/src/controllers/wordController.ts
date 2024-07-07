import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError, ServerError, UnauthorizedError } from '../middlewares/ErrorHandler';
import { createWord, getAllWords } from '../db/words';
import { copyWordsToUser, createUserWord, getFirstUnnown, getWordsByUser, increaseCorrectWord } from '../db/userWords';


export const downloadWords = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const {words} = req.body;
        if (!words){
            next (new BadRequestError('There are no array words'));
            return;
        }
        let quantityExist = (await getAllWords()).length;
        for (let i = 0; i <words.length; i++) {
            quantityExist = quantityExist + 1;
            const data = {
                number: quantityExist, 
                english: words[i].english, 
                transcription: words[i].transcription,
                ukrainian: words[i].ukrainian, 
            }
            const newWord = await createWord(data);
        }
        return res.json(words);

    } catch(error) {
        next (new ServerError('Server error'));
    }
} 

const getUserID = (req: express.Request) => {
    let userID:string = '';
    const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader)
            return userID;
        
        const token = authorizationHeader.split(' ')[1];
        if (!token) 
            return userID;

        try {
            const secret = process.env.JWT_SECRET;
            const userData:any = jwt.verify(token, String(secret));
            userID = userData.id;
        } catch (e) {
            return userID;
        }
    return userID;
}

export const getWord = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        let userID = getUserID(req);
        if (!userID) {
            next (new UnauthorizedError('You are not registered'));
            return;
        }
        const {number, success} = req.body;
        if (number && success){
            await increaseCorrectWord(userID, number);
        }

        //get first 20 word
        const quantityTake = Number(process.env.QUANTITY_WORDS_TAKE);
        const unknownWords = await getFirstUnnown(userID, quantityTake);
        if (unknownWords.length == 0)  {
            return res.json({message: "The words have run out"}); 
        } 

        const quantityWords     = unknownWords.length;                          //20
        const quantityWordsRes  = Number(process.env.QUANTITY_WORDS_RESAULT);   //4
        const quantityHave      = (quantityWords < quantityWordsRes) ? quantityWords:quantityWordsRes;
        const wordsMas: number[] = [];
        
        //take 4 or less
        for (let i = 0; i <quantityHave; i++) {
            let exist = true;
            while (exist) {
                const numberWord = getRandomInt(quantityWords);
                if ( !wordsMas.includes(numberWord)){
                    wordsMas.push(numberWord);
                    exist = false;
                }
            }
        }

        const needWordNumber = getRandomInt(quantityHave);
        const PositionAskedWord     = wordsMas[needWordNumber];

        const _number        = unknownWords[PositionAskedWord].number;
        const _word          = unknownWords[PositionAskedWord].word;
        const mas: string[] = [];
        for (const x of wordsMas){
            const answerWord = unknownWords[x].word;
            mas.push(answerWord.ukrainian);
        }

        const Resault = createResult(_number, _word, mas);

        return res.json(Resault);
        
    } catch(error) {
        next (new ServerError('Server error'));
    }
}

function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
}

interface IWord{
    english: string;
    transcription: string;
    ukrainian: string;
}
interface IResault{
    number: number;
    word: IWord;
    answers: string[];
}

const createResult = (_number:number, _word:IWord, mas: string[])=>{
    
    const Resault:IResault = {
        number: _number,
        word: {
            english: _word.english,
            transcription: _word.transcription,
            ukrainian: _word.ukrainian,
        },
        answers: mas
    }
    return Resault;
}