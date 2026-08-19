import React, { useContext } from 'react'
import { FaRuler } from 'react-icons/fa';
import { LiaHistorySolid } from "react-icons/lia";
import { TbSquareRoot } from 'react-icons/tb';
import { CalculatorContext } from './CalculatorContext';

const Icons = () => {

    const {isPressed, setIsPressed} = useContext(CalculatorContext);

    const handleHistoryClick = () => {
        setIsPressed(!isPressed);
    }


  return (
    <div className='px-5'>
        <div className='flex items-center justify-between'>
            <LiaHistorySolid onClick={() => handleHistoryClick()} className='text-2xl cursor-pointer transition-all duration-300 hover:scale-120'/>
            <div className='flex items-center gap-4'>
                <FaRuler  className='text-2xl cursor-pointer transition-all duration-300 hover:scale-120'/>
                <TbSquareRoot  className='text-2xl cursor-pointer transition-all duration-300 hover:scale-120'/>
            </div>   
        </div>     
    </div>
  )
}

export default Icons