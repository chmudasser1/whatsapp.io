import React from 'react';

const Chatpage = () => {
    return (
        <div className='w-full h-screen bg-slate-950 flex'>
            <div className='w-1/4 h-full border-r border-white p-4 pt-10'>
                <h2 className='text-white text-5xl font-serif font-bold text-center'>Users</h2>
                <ul className='text-white'>
                    <li>User 1</li>
                    <li>User 2</li>
                    <li>User 3</li>
                    <li>User 4</li>
                    <li>User 5</li>
                </ul>
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