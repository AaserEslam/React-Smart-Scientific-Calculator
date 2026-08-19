import React, { useContext, useState } from "react";
import { CalculatorContext } from "./CalculatorContext";

const InputNum = () => {
  const { inputBox, setInputBox, result, setResult, resultBox, setResultBox ,isCalculated, setIsCalculated} =
    useContext(CalculatorContext);

  return (
    <div>
      <div>
        <input
          autoCorrect="off"
          readOnly
          disabled
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
          autoCapitalize="off"
          spellCheck="false"
          type="text"
          className="transition-all duration-300 ease-in-out w-full h-25 outline-0 border-none  text-right text-white font-semibold text-5xl px-3"
        />
      </div>
      <div>
        <input
          autoCorrect="off"
          disabled
          readOnly
          value={resultBox}
          autoCapitalize="off"
          spellCheck="false"
          type="text"
          className="transition-all duration-300 ease-in-out w-full h-10 outline-0 border-none font-medium  text-right text-gray-400 px-3 text-lg"
        />
      </div>
    </div>
  );
};

export default InputNum;
