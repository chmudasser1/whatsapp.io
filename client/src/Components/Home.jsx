import React, { useState } from 'react';
import bg from "../assets/background.jpg";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { showUSer } from '../features/data';
const Home = () => {
    const [email, setEmailLogin] = useState('');
    const [password, setPasswordLogin] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password
        };
        console.log("Login Data", loginData);
        axios.post("http://localhost:8000/api/login", loginData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('socket')}`,
            },
            withCredentials: true,
        }).then(response => {
            if (response.data.msg === "Success") {
                const header = response.data.token;
                Cookies.set("socket", header)
                console.log("Token in the header:", header)
                dispatch(showUSer());
                navigate("/chat")
                console.log("Navigated to chat page:")
            }
        }

        )
        // Clear input fields
        setEmailLogin('');
        setPasswordLogin('');
    }
    const toggleForm = () => {
        navigate("/signup")
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
                        <h1 className="text-white text-5xl font-bold text-center mb-4">Login</h1>
                        <form onSubmit={handleLoginSubmit}>
                            <label className='text-3xl text-white font-bold'>Email</label><br />
                            <input className='rounded-lg px-2 w-80 py-2' placeholder='email' type="email" required value={email} onChange={(e) => setEmailLogin(e.target.value)} /><br />
                            <label className='text-3xl text-white font-bold'>Password</label><br />
                            <input className='rounded-lg px-2 w-80 py-2' placeholder='password' type="password" required value={password} onChange={(e) => setPasswordLogin(e.target.value)} /><br />
                            <div className='flex mt-4 gap-16'>
                                <button type="submit" className='ml-12 bg-green-500 text-white px-4 py-3 text-lg rounded-xl'>Login</button>
                                <button type="button" className='bg-green-500 text-white px-4 py-3 text-lg rounded-xl' onClick={toggleForm}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;