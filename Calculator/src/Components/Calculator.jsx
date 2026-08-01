import React from 'react'
import InputNum from './InputNum'
import Buttons from './Buttons'

const Calculator = () => {
  return (
    <div>
        <div className='bg-[#010101] rounded-lg h-130 w-90 p-5'>
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