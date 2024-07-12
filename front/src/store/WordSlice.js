import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import { WordAPI } from '../api/wordAPI.js';

const wordsSlice = createSlice({
    name: "words",
    initialState: {
        number: 0,
        word: {},
        answers: [],
        answeredWord: '',
        wasCorrect: false,
        isDownloading: false,
        error: '',
    },
    reducers:{
        toAnswer(state, action){
            state.answeredWord = action.payload.answer;
            if  (action.payload.answer === state.word?.ukrainian)
                state.wasCorrect = true
        },
    },
    extraReducers: (builder)=>{
        builder
        //getWord
        .addCase(getWord.pending, (state)=> {
            state.isDownloading = true;
            state.error         = '';
        })
        .addCase(getWord.fulfilled, (state, action)=> {
            state.isDownloading = false;
            state.answeredWord  = '';
            state.wasCorrect    = false;
            state.number        = action.payload.number;
            state.word          = action.payload.word;
            state.answers       = action.payload.answers;
        })
        .addCase(getWord.rejected, (state, action)=> {
            state.isDownloading = false;
            if (action.payload.message)
                state.error = action.payload.message    
        })
    }
});

export const {toAnswer} = wordsSlice.actions;

export default wordsSlice.reducer;

export const getWord = createAsyncThunk(
    'words/getWord',
    async function(inputParametr, {rejectWithValue}) {
        try {
            const response = await WordAPI.getWordOnServer(inputParametr.data);
            return response.data;
 
        } catch(e) {
            return rejectWithValue('Server error');
        }
    }
);

