import React, { useState } from "react";
import InputNum from "./InputNum";
import Buttons from "./Buttons";
import { CalculatorContext } from "./CalculatorContext";

const Calculator = () => {
  const [inputBox, setInputBox] = useState("");
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <CalculatorContext.Provider
      value={{
        inputBox,
        setInputBox,
        result,
        setResult,
        num1,
        setNum1,
        num2,
        setNum2,
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
