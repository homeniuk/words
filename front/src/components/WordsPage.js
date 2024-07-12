import { useEffect }                from 'react';
import { useNavigate }              from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ButtonLogout from './components/ButtonLogout';
import Downloading  from './Downloading';
import ButtonWord from './components/ButtonWord';
import ButtonNext from './components/ButtonNext';

import { getWord } from '../store/WordSlice';

export default function WordsPage() {
  const navigate        = useNavigate();
  const dispatch        = useDispatch();
  const number          = useSelector((state)=>state.words.number);
  const word            = useSelector((state)=>state.words.word);
  const answers         = useSelector((state)=>state.words.answers);
  const answeredWord    = useSelector((state)=>state.words.answeredWord);
  const wasCorrect      = useSelector((state)=>state.words.wasCorrect);

  const isAuth          = useSelector((state)=>state.user.isAuth);

  const isUserDownloading   = useSelector((state)=>state.user.isDownloading);
  const isWordDownloading   = useSelector((state)=>state.words.isDownloading);

  const english         = word?.english;
  const transcription   = word?.transcription;
  const answer          = word?.ukrainian;
  useEffect(() => {
    if (isAuth){
      dispatch(getWord({data:{}}));
    } else {
        navigate("/login");  
    }

  },[isAuth])

  const JSXWords = answers.map((i, index) => {
    if (answeredWord) {
      if (i === answer){
        return <ButtonWord key={index} answer={i} wasAnswered={true} color='green' />
      } else if (i === answeredWord){
        return <ButtonWord key={index} answer={i} wasAnswered={true} color='red' />
      } else {
        return <ButtonWord key={index} answer={i} wasAnswered={true} color='' />
      }
    } else {
      return <ButtonWord key={index} answer={i} wasAnswered={false} color='' />
    }
  })
  
  return (
    <div>
      <ButtonLogout/>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{english}</h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-2 text-center text-2xl leading-4 tracking-tight text-gray-900">{transcription}</h2>
    </div>
  
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        {JSXWords}
        <ButtonNext number={number} wasCorrect={wasCorrect}/>
    </div>
    </div>
    </div>
  );
}
