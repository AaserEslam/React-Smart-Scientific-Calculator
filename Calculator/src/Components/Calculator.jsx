import React from 'react'
import InputNum from './InputNum'
import Buttons from './Buttons'

const Calculator = () => {
  return (
    <div>
        <div className='bg-[#010101] border-white/60 border-2 shadow-[0_0_35px_5px] rounded-2xl h-135 w-90 p-5'>
            <div className='mb-5'>
                <InputNum/>
            </div>
            <div>
                <Buttons/>
            </div>
        </div>
    </div>
  )
}

export default Calculator