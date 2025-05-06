import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import { setselectuser } from '../features/data';

const Chatheader = () => {
  const { selectuser } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const SetSelectedUserHandeler = () => {
    dispatch(setselectuser(null))
  }

  return (
    <div className='p-2.5 border-b border-base-300'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-serif font-bold text-white'>{selectuser.username}</h1>
          <IoClose className='text-white size-7' onClick={SetSelectedUserHandeler} />
        </div>
      </div>
    </div>
  )
}

export default Chatheader
