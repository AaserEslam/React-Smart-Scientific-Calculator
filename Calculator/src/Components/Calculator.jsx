import React, { useState } from "react";
import InputNum from "./InputNum";
import Buttons from "./Buttons";
import { CalculatorContext } from "./CalculatorContext";

const Calculator = () => {
  const [inputBox, setInputBox] = useState("");
  const [resultBox, setResultBox] = useState("");

  return (
    <CalculatorContext.Provider
      value={{
        inputBox,
        setInputBox,
        resultBox,
        setResultBox,
      }}
    >
      <div>
        <div className="bg-[#010101] border-white/60 border-2 shadow-[0_0_35px_5px] rounded-2xl h-135 w-90 p-5">
          <div className="mb-5">
            <InputNum />
          </div>
          <div>
            <Buttons />
          </div>
        </div>
      </div>
    </CalculatorContext.Provider>
  );
};

export default Calculator;
