import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { showUSer } from '../features/data';

const Chatpage = () => {
    const dispatch = useDispatch();
    const { chat, loading } = useSelector((state) => state.app)
    useEffect(() => {
        dispatch(showUSer());
    }, [])

    return (
        <div className='w-full h-screen bg-slate-950 flex'>
            <div className='w-1/4 h-full border-r border-white p-4 pt-10'>
            {Array.isArray(chat) ? chat.map((user, index) => (
                    <div key={user._id} className='border-2 px-2 py-2 border-blue-950 '>
                        {/* <h1 className='text-2xl text-blue-600 text-center border-b-2 border-black'>{user.id}</h1> */}
                        <h1 className='pt-2 text-lg'>First-Name: {user.username}</h1>
                        </div>
                )) : <h1>Something is wrong!</h1>}
            </div>

            <div className='w-3/4 h-full p-4'>
                <div className='pt-10'>
                    <h1 className='text-white text-5xl font-serif font-bold text-center'>Chat Room</h1>
                </div>
                <div className=''>
                    <div className='  rounded-3xl p-4'>
                        <div className='text-white'>User  1: Hello!</div>
                        <div className='text-white'>User  2: Hi there!</div>
                        <div className='text-white'>User  3: How's it going?</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chatpage;