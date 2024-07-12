import {useDispatch, useSelector} from 'react-redux';
import {getWord} from '../../store/WordSlice';

function ButtonNext(props) {
  const dispatch    = useDispatch();
  const number      = props.number;
  const wasCorrect  = props.wasCorrect;
  
  function handleClick(e) {
    const data = {number, success: wasCorrect};
    dispatch(getWord({data}));
  }


  return (
        <button className="mt-10 w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold
         leading-6 shadow-sm bg-teal-100 hover:bg-teal-300 border-2 "
        onClick={() => handleClick()}>
            next word
        </button>
  );
  }
  
  export default ButtonNext;