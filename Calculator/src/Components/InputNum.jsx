import React, { useContext, useState } from "react";
import { CalculatorContext } from "./CalculatorContext";

const InputNum = () => {
  const {
    inputBox,
    setInputBox,
    resultBox,
    setResultBox,
    resultList,
    setResultList,
    isPressedScientfic,
    setIsPressedScientfic,
  } = useContext(CalculatorContext);

  return (
    <div className="px-5">
      <div className="mt-6">
        <input
          key={inputBox}
          autoCorrect="off"
          readOnly
          disabled
          value={inputBox}
          onChange={(e) => setInputBox(e.target.value)}
          autoCapitalize="off"
          spellCheck="false"
          type="text"
          className={` w-full h-25 outline-0 border-none tabular-nums text-right text-[#444] dark:text-white font-semibold  px-3 scroll-smooth animate-[scale_0.15s_ease-in-out]  ${inputBox.length > 10 ? "text-3xl" : "text-5xl"} transition-all duration-500`}
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
          className="transition-all duration-300 ease-in-out w-full h-10 outline-0 border-none  text-right text-[#0092ff]/80 font-semibold px-3 text-lg"
        />
      </div>
    </div>
  );
};

export default InputNum;
