import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {loginUser, getUser, setError, cleanError} from '../store/UserSlice'
import { useNavigate } from 'react-router-dom';
import Downloading from './Downloading';
import { validateEmailPassword } from '../service/validation';

export default function LoginPage() {
    const dispatch        = useDispatch();
    const navigate        = useNavigate();
    const isAuth          = useSelector((state)=>state.user.isAuth);
    const isDownloading   = useSelector((state)=>state.user.isDownloading);
    const userError       = useSelector((state)=>state.user.error);
    

    useEffect(() => {
      if (!isAuth) {
        //const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (token){
          dispatch(getUser({token: token}));
        }
      }
    }, []);
    
    useEffect(()=>{
      if (isAuth)
        navigate("/");
    },[isAuth])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Login(e) {
        const error = validateEmailPassword(email, password);
        if (error){
          dispatch(setError({error}));
        } else {
          dispatch(loginUser({email, password}));
        }
    }

    function ToRegister(e) {
      dispatch(cleanError());
      navigate("/register");
    }

    //if (isDownloading)
    //  return (<Downloading/>)
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input value = {email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
              </div>
            </div>
      
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input value = {password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
              </div>
            </div>
      
            <div className="mt-4">
              <button onClick={()=>{Login()}} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
            <div className="mt-4">
              <button onClick={()=>{ToRegister()}} className="flex w-full justify-center rounded-md border-indigo-600 border-2 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go to registering</button>
            </div>
         
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold text-red-600">{userError}</h2>
        </div>
      </div>
    );
  }