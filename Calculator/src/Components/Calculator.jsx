import React from 'react'
import InputNum from './InputNum'
import Buttons from './Buttons'

const Calculator = () => {
  return (
    <div>
        <div className='bg-gray-900 rounded-lg h-130 w-100 p-5'>
            <div>
                <InputNum/>
            </div>
            <div className='h-75 mt-10'>
                <Buttons/>
            </div>
        </div>
    </div>
  )
}

export default Calculator