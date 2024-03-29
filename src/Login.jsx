import {useEffect, useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// /for starting server : json-server --watch db.json --port 3001

const Login = () => {

  const [loginData,setLoginData] = useState({
    username:"",
    password:""
  });
  
  const navigate = useNavigate();

  //when redirected to login page it clears all sessionStorage data which disables user to navigate to the home page .
  useEffect(()=>{
    sessionStorage.clear();
    console.log("sessionStorageCleared");
  },[])
  
  // using techniques like hashing and salting passwords before storing them and when comparing them during login.
  
  const proceedLogin = ()=>{

    let usernameValid = false;
    let passwordValid = false;
    
    axios
    .get('http://localhost:3001/users')
    .then((resp)=>{
      // console.log(resp);
      resp.data.map((user) => {
        if (user.username === loginData.username) {
          usernameValid = true;
          sessionStorage.setItem("username",loginData.username)
          if (user.password === loginData.password) {
            passwordValid = true;
            sessionStorage.setItem("password",loginData.password)
          };
        };
      });

      if (!usernameValid) {
        toast.error("Username is wrong.");
      } else if (!passwordValid) {
        toast.error("Password is wrong.");
      } else {
        toast.success("Login Successful!");
        navigate('/');
      }
    })
    .catch((err)=>{
      console.log(err);
    });    
  };  
 
  const onChangeLogin = (e)=>{
    const {name,value} = e.target;
    setLoginData((prevState)=>({
      ...prevState,
      [name]:value,
    }));
  };


  const disableLoginBtn = ()=>{
    if(loginData.username.trim() === "" || loginData.password.trim() === ""){
      return true;
    }else{
      return false;
    }
  };


  return (
    <>
      <div className='text-center text-3xl font-mono text-green-500 font-bold mt-20'>
        Login to you account.
      </div>
      <div className="flex flex-col items-center pt-10 pb-2">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block mb-1 font-mono text-base font-bold"
          >
            Username
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 outline"
            name="username"
            value={loginData.username}
            onChange={onChangeLogin}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 font-mono text-base font-bold"
          >
            Password
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 outline"
            value={loginData.password}
            name="password"
            onChange={onChangeLogin}
          />
        </div>
      </div>
      <div className='flex justify-center space-x-6'>
        <div>
          <button 
          className={`${disableLoginBtn()?"bg-green-300":"bg-green-500"} px-5 py-2 rounded-xl font-mono text-base font-bold`} 
          onClick={proceedLogin}
          disabled={disableLoginBtn()}
          >
            Login
          </button>
        </div>
        <div>
        <Link to='/register'>
          <button className="px-5 py-2 bg-green-500 rounded-xl font-mono text-base font-bold">
            New User
          </button>
        </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
