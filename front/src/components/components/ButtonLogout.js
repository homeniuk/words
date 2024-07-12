import { useDispatch } from 'react-redux';
import { logout } from '../../store/UserSlice';

function ButtonLogout() {
  const dispatch = useDispatch();

  function handleClick(e) {
    dispatch(logout());
  }
  
    return (
      <button className="right-0 absolute my-2 bg-blue-300 rounded-lg px-4 py-2 mr-4 mt-4
      hover:bg-blue-600 active:bg-blue-900" 
      onClick={() => handleClick()}> 
        Logout
     </button>
  );
  }
  
  export default ButtonLogout;