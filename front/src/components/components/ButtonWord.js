import {useDispatch, useSelector} from 'react-redux';
import {toAnswer} from '../../store/WordSlice';

function ButtonWord(props) {
  const dispatch    = useDispatch();
  const answer      = props.answer;
  const wasAnswered = props.wasAnswered;
  const color       = props.color;
  
  function handleClick(e) {
    if (!wasAnswered)
      dispatch(toAnswer({answer}));
  }

  let wasAnsweredStyle = '';
  let toHoverStyle = '';
  if (color) {
    wasAnsweredStyle = color === 'green' ? ' bg-green-400 ' : ' bg-red-400 ';
  } 
  if (!wasAnswered)
    toHoverStyle = ' hover:bg-indigo-200';

  const classDef = "mt-1 w-full justify-center rounded-md px-3 py-2.5 text-sm font-semibold leading-6 shadow-sm border-2 "
  const styleClass = classDef + wasAnsweredStyle + toHoverStyle;
    
  return (
        <button className={styleClass}
        onClick={() => handleClick()}>
            {answer}
        </button>
  );
  }
  
  export default ButtonWord;