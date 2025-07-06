import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setselectuser, showUSer } from '../features/data';
import { IoMdContacts, IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import NoChatSelected from './NoChatSelected';
import Chatroom from './Chatroom';
import { useSocketContext } from '../context/Socket';

const Chatpage = () => {
    const dispatch = useDispatch();
    const { chat, loading, error, selectuser } = useSelector((state) => state.app);
    const { socket, onlineuser } = useSocketContext();
    const [showUserList, setShowUserList] = useState(true);

    const handleselectuser = (user) => {
        if (selectuser?._id !== user._id) {
            dispatch(setselectuser(user));
            if (window.innerWidth < 768) { // Hide user list on mobile when chat is selected
                setShowUserList(false);
            }
        } else {
            console.log("User is already selected, skipping dispatch.");
        }
    };

    const handleBackToUserList = () => {
        dispatch(setselectuser(null));
        setShowUserList(true);
    };

    useEffect(() => {
        dispatch(showUSer());
    }, [dispatch]);

    if (loading) {
        return <h1 className='h-screen text-6xl text-red-700 flex justify-center items-center'>Loading...</h1>
    }
    if (error) {
        return <h1 className='h-screen text-6xl text-red-700 flex justify-center items-center'>Error...</h1>
    }

    return (
        <div className='w-full h-full bg-slate-950 flex flex-col md:flex-row'>
            {/* User List - Hidden on mobile/sm when chat is selected, always visible on md/lg */}
            <div className={`md:w-1/4 w-full h-full md:border-r border-white p-4 pt-10 ${showUserList ? 'block' : 'hidden md:block'}`}>
                <div className='flex border-b-2 border-blue-950 mb-4'>
                    <IoMdContacts className='pt-4 pb-4 text-white size-20' />
                    <h1 className='pt-4 pb-4 text-white text-3xl md:text-5xl font-serif font-bold text-center'>Contacts</h1>
                </div>
                {Array.isArray(chat) ? chat.map((user) => (
                    <div key={user._id} className={`py-3 ${selectuser?._id === user._id && "bg-slate-800"}`}>
                        <div className='px-2 flex gap-2 transform hover:scale-105 transition-transform duration-200' onClick={() => handleselectuser(user)}>
                            <div><CgProfile className='pt-2 text-white size-10 cursor-pointer' /></div>
                            <div>
                                <h1 className='pt-2 text-lg md:text-xl text-white cursor-pointer'>{user.username}</h1>
                                <div>
                                    {onlineuser && (() => {
                                        const isonline = onlineuser.includes(user._id);
                                        return (
                                            <div className='text-[13px]'>{isonline ? <p>Online</p> : <p>Offline</p>}</div>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <h1>Something is wrong!</h1>}
            </div>

            {/* Chat Area */}
            <div className='w-full md:w-3/4 h-screen p-4 relative'>
                {selectuser ? (
                    <>
                        {/* Show close button only on mobile/sm */}
                        <button
                            onClick={handleBackToUserList}
                            className='md:hidden absolute top-4 right-8 bg-slate-950 rounded-full p-2 z-10'
                        >
                            <IoMdClose className='text-white size-6' />
                        </button>
                        <Chatroom />
                    </>
                ) : (
                    <NoChatSelected />
                )}
            </div>
        </div>
    );
}

export default Chatpage;
