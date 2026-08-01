import React from 'react'

const InputNum = () => {
  return (
    <div>
        <div>
            <input autoCorrect='off' autoCapitalize='off' spellCheck="false" type="text" className='transition-all duration-300 ease-in-out w-full h-25 outline-0 border-none  text-right text-white font-semibold text-5xl px-3'/>
        </div>
        <div>
            <input autoCorrect='off' autoCapitalize='off' spellCheck="false" type="text" className='transition-all duration-300 ease-in-out w-full h-10 outline-0 border-none font-medium  text-right text-gray-400 px-3 text-lg'/>
        </div>
    </div>
  )
}

export default InputNum