import axios from "axios";
import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState([]);

  useEffect(()=>{
    let username = sessionStorage.getItem('username');    
    // If username is not found in sessionStorage, navigate back to login
    if(!username){
      navigate('/login')
    }else{
      axios.get(`http://localhost:3001/users?username=${username}`).then((resp)=>{
        console.log(resp.data[0]);
        setLoggedInUser(resp.data[0])
      }).catch((err)=>{
        console.log(err);
      });
    };         
  },[]);


  return (
    <>
      <div className="flex justify-between px-10 py-5 bg-lime-500 text-white text-xl font-mono font-semibold">
        <Link to="/">Home</Link>
        <Link to="/login">Logout</Link>        
      </div>
      <h1 className="font-bold text-3xl mt-10 text-center">Welcome {loggedInUser.fullname}!</h1>
      
      <div className="mt-10 flex justify-center">
        <div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Username:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.username}</div>
        </div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Fullname:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.fullname}</div>
        </div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Email:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.email}</div>
        </div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Password:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.password}</div>
        </div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Phone No:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.phoneNo}</div>
        </div>
        <div className="flex flex-row">
          <label className="block font-mono text-lg">Gender:</label>
          <div className="text-xl font-mono font-semibold">{loggedInUser.gender}</div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home;