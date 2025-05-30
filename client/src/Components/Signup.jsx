
import React, { useState } from 'react';
import bg from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Signup = () => {
    const [username, setUsernameSignup] = useState('');
    const [email, setEmailSignup] = useState('');
    const [password, setPasswordSignup] = useState('');
    const navigate = useNavigate();
    const toggleForm = () => {
        navigate("/")
    }
    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const signupData = {
            username,
            email,
            password
        }
        axios.post(`${import.meta.env.VITE_REACT_APP_SEVER_BASEURL}/api/signup`, signupData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(console.log("WOW"))
        console.log("Signup Data", signupData);
        // Clear input fields
        setUsernameSignup('');
        setEmailSignup('');
        setPasswordSignup('');
    }
    return (
        <div className="relative w-full h-screen">
            <img
                src={bg}
                alt="background"
                className='w-full h-full object-cover absolute'
            />
            <div className="absolute w-full h-full flex items-center justify-center ">
                <div className='border border-black rounded-3xl backdrop-blur-sm px-4 py-4'>
                    <div>
                        <h1 className="text-white text-5xl font-bold text-center mb-4">Sign Up</h1>
                        <form onSubmit={handleSignupSubmit}>
                            <label className='text-3xl text-white font-bold'>Username</label><br />
                            <input className='rounded-lg px-2 w-80 py-2' placeholder='username' type="text" required value={username} onChange={(e) => setUsernameSignup(e.target.value)} /><br />
                            <label className='text-3xl text-white font-bold'>Email</label><br />
                            <input className='rounded-lg px-2 w-80 py-2' placeholder='email' type="email" required value={email} onChange={(e) => setEmailSignup(e.target.value)} /><br />
                            <label className='text-3xl text-white font-bold'>Password</label><br />
                            <input className='rounded-lg px-2 w-80 py-2' placeholder='password' type="password" required value={password} onChange={(e) => setPasswordSignup(e.target.value)} /><br />
                            <div className='flex mt-4 gap-16'>
                                <button type="button" className='ml-12 bg-green-500 text-white px-4 py-3 text-lg rounded-xl' onClick={toggleForm}>Login</button>
                                <button type="submit" className='bg-green-500 text-white px-4 py-3 text-lg rounded-xl'>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Signup
