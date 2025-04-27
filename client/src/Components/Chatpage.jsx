import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setselectuser, showUSer } from '../features/data';
import { IoMdContacts } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa";
import Chatheader from './chatheader';
import NewChat from './NewChat';
import NoChatSelected from './NoChatSelected';
import Chatroom from './Chatroom';

const Chatpage = () => {
    const dispatch = useDispatch();
    const { chat, loading, error, selectuser } = useSelector((state) => state.app);
    const handleselectuser = (user) => {
        console.log("handleselectuser called with:", user);
        if (selectuser?._id !== user._id) { // Prevent redundant dispatch
            console.log("Dispatching setselectuser for user:", user);
            dispatch(setselectuser(user)); // Dispatch the action with the user object
        } else {
            console.log("User is already selected, skipping dispatch.");
        }
    };
    useEffect(() => {
        dispatch(showUSer());
    }, [dispatch]);
    if (loading) {
        return <h1 className='h-screen text-6xl text-red-700  flex justify-center items-center '>Loading...</h1>
    }
    if (error) {
        return <h1 className='h-screen text-6xl text-red-700  flex justify-center items-center '>error...</h1>
    }
    return (
        <div className='w-full h-screen bg-slate-950 flex'>
            <div className='w-1/4 h-full border-r border-white p-4 pt-10'>
                <div className='flex border-b-2 border-blue-950'>
                    <IoMdContacts className='pt-4 pb-4 text-white size-20' />
                    <h1 className='pt-4 pb-4 text-white text-5xl font-serif font-bold text-center'>Contact</h1>
                </div>
                {Array.isArray(chat) ? chat.map((user) => (
                    <div key={user._id} className={` py-3 ${selectuser?._id === user._id && "bg-slate-800"}`}>
                        <div className='px-2 flex gap-2 transform hover:scale-105 transition-transform duration-200' onClick={() => handleselectuser(user)} >
                            <div><CgProfile className='pt-2 text-white size-10 cursor-pointer' /></div>
                            <h1 className='pt-2 text-xl text-white cursor-pointer' >{user.username}</h1>
                        </div>
                    </div>
                )) : <h1>Something is wrong!</h1>}
            </div>
            <div className='w-3/4 h-full p-4'>
                {selectuser ? <Chatroom /> : <NoChatSelected />}
            </div>
        </div>
    );
}

export default Chatpage;