import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {registerUser, setError, cleanError} from '../store/UserSlice'
import { useNavigate } from 'react-router-dom';
import Downloading from './Downloading';
import { validateEmailPassword } from '../service/validation';

export default function RegisterPage() {
    const dispatch        = useDispatch();
    const navigate        = useNavigate();
    const isAuth          = useSelector((state)=>state.user.isAuth);
    const isDownloading   = useSelector((state)=>state.user.isDownloading);
    const userError       = useSelector((state)=>state.user.error);

    useEffect(() => {
      if (!isAuth) {
        const token = localStorage.getItem('token');
        if (token){
          navigate("/");
        }
      }
    }, []);

    useEffect(()=>{
      if (isAuth)
        navigate("/");
    },[isAuth])

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function Register(e) {
        const error = validateEmailPassword(email, password);
        if (error){
          dispatch(setError({error}));
        } else {
          dispatch(registerUser({username, email, password}));
        }
    }
    function ToLogin(e) {
      dispatch(cleanError());
      navigate("/login");
    }

    //if (isDownloading)
    //  return (<Downloading/>)
    
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register your account</h2>
        </div>
      
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
                <input value = {username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" type="text" autoComplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
              </div>
            </div>

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
              <button onClick={()=>{Register()}} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
            </div>
            <div className="mt-4">
              <button onClick={()=>{ToLogin()}} className="flex w-full justify-center rounded-md border-indigo-600 border-2 px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go to login</button>
            </div>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-xl font-bold text-red-600">{userError}</h2>
        </div>
      </div>
    );
}
