import React, { useState } from 'react';
import bg from "../assets/background.jpg";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [usernameSignup, setUsernameSignup] = useState('');
    const [emailSignup, setEmailSignup] = useState('');
    const [passwordSignup, setPasswordSignup] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            emailLogin,
            passwordLogin
        };
        console.log("Login Data", loginData);

        // Clear input fields
        setEmailLogin('');
        setPasswordLogin('');
        navigate('/chat')
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const signupData = {
            usernameSignup,
            emailSignup,
            passwordSignup
        };
        console.log("Signup Data", signupData);

        // Clear input fields
        setUsernameSignup('');
        setEmailSignup('');
        setPasswordSignup('');
        setIsLogin(true)
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
                    {isLogin ? (
                        <div>
                            <h1 className="text-white text-5xl font-bold text-center mb-4">Login</h1>
                            <form onSubmit={handleLoginSubmit}>
                                <label className='text-3xl text-white font-bold'>Email</label><br />
                                <input className='rounded-lg px-2 w-80 py-2' placeholder='email' type="email" required value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} /><br />
                                <label className='text-3xl text-white font-bold'>Password</label><br />
                                <input className='rounded-lg px-2 w-80 py-2' placeholder='password' type="password" required value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} /><br />
                                <div className='flex mt-4 gap-16'>
                                    <button type="submit" className='ml-12 bg-green-500 text-white px-4 py-3 text-lg rounded-xl'>Login</button>
                                    <button type="button" className='bg-green-500 text-white px-4 py-3 text-lg rounded-xl' onClick={toggleForm}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-white text-5xl font-bold text-center mb-4">Sign Up</h1>
                            <form onSubmit={handleSignupSubmit}>
                                <label className='text-3xl text-white font-bold'>Username</label><br />
                                <input className='rounded-lg px-2 w-80 py-2' placeholder='username' type="text" required value={usernameSignup} onChange={(e) => setUsernameSignup(e.target.value)} /><br />
                                <label className='text-3xl text-white font-bold'>Email</label><br />
                                <input className='rounded-lg px-2 w-80 py-2' placeholder='email' type="email" required value={emailSignup} onChange={(e) => setEmailSignup(e.target.value)} /><br />
                                <label className='text-3xl text-white font-bold'>Password</label><br />
                                <input className='rounded-lg px-2 w-80 py-2' placeholder='password' type="password" required value={passwordSignup} onChange={(e) => setPasswordSignup(e.target.value)} /><br />
                                <div className='flex mt-4 gap-16'>
                                    <button type="button" className='ml-12 bg-green-500 text-white px-4 py-3 text-lg rounded-xl' onClick={toggleForm}>Login</button>
                                    <button type="submit" className='bg-green-500 text-white px-4 py-3 text-lg rounded-xl'>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;