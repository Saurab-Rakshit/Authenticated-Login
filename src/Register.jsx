import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullname: "",
    phoneNo: "",
    address: "",
    email: "",
    country: "",
    gender: "",
  });

  const handleEvents = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleGender = (e) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      gender: e.target.value,
    }));
  };

  const postData = async () => {
    await axios
      .post("http://localhost:3001/users", userData)
      .then((response)=>{
        console.log(response);
        toast.success("Post Request Successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: "Bounce",
        });
        navigate("/login");
      })
      .catch((error)=>{
        console.log(error);
        toast.error(`Post request failed!`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: "Bounce",
        });
      });
  };

  const handleSubmitEvent = ()=>{
    if(userData.username == "" || userData.password == "" || userData.fullname == "" || userData.phoneNo == "" || userData.address == "" || userData.email == "" || userData.country == "" || userData.gender == ""){
      return true;
    }else{
      return false;
    }
  }

  return (
    <>
      <div className="text-center text-3xl font-bold text-emerald-400 mt-10">
        <h1>User Registration</h1>
      </div>
      <div className="grid grid-cols-2 gap-4 mx-72 text-base font-semibold mt-10 p-5 bg-slate-100 rounded-t-xl">
        <div>
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            name="username"
            value={userData.username}
            onChange={handleEvents}
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.password}
            name="password"
          />
        </div>
        <div>
          <label htmlFor="username" className="block">
            Fullname
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.fullname}
            name="fullname"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Phone No.
          </label>
          <input
            type="text"
            id="password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.phoneNo}
            name="phoneNo"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Address
          </label>
          <textarea
            type="text"
            id="password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.address}
            name="address"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Email
          </label>
          <input
            type="text"
            id="password"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.email}
            name="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block">
            Country
          </label>
          <select
            id="country"
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            onChange={handleEvents}
            value={userData.country}
            name="country"
          >
            <option value="">Select Options</option>
            <option value="sweden">Sweden</option>
            <option value="malta">Malta</option>
            <option value="portugal">Portugal</option>
            <option value="india">India</option>
          </select>
        </div>
        {/* //!gender starts */}
        <div className="space-y-3">
          <label htmlFor="gender">Gender</label> <br />
          <input
            type="radio"
            name="gender"
            value="male"
            checked={userData.gender === "male"}
            onChange={handleGender}
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            name="gender"
            value="female"
            className="ml-2"
            checked={userData.gender === "female"}
            onChange={handleGender}
          />
          <label htmlFor="female">Female</label>
        </div>
        {/* //!gender ends */}
      </div>
      <div className="text-center mx-72 rounded-b-xl bg-slate-100 pb-5 space-x-5">
        <button          
          className={`${handleSubmitEvent()?"bg-slate-400" : "bg-blue-500"} text-white p-2 text-xl font-semibold rounded-md`}
          onClick={postData}
          disabled={handleSubmitEvent()}
        >
          Submit
        </button>
        <Link to='/login'>
          <button className="bg-green-500 py-2 px-5 text-white p-2 text-xl font-semibold rounded-md">Back</button>
        </Link>
      </div>
    </>
  );
};

export default Register;
