import React, { useState } from "react";
import InputNum from "./InputNum";
import Buttons from "./Buttons";
import { CalculatorContext } from "./CalculatorContext";
import { LiaHistorySolid } from "react-icons/lia";
import Icons from "./Icons";

const Calculator = () => {
  const [inputBox, setInputBox] = useState("");
  const [resultBox, setResultBox] = useState("");
  const [resultList, setResultList] = useState(localStorage.length > 0 ? JSON.parse(localStorage.getItem("results")) : []);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <CalculatorContext.Provider
      value={{
        inputBox,
        setInputBox,
        resultBox,
        setResultBox,
        resultList,
        setResultList,
        isPressed,
        setIsPressed,
      }}
    >
      <div>
        <div className="bg-[#010101] border-white/60 overflow-hidden border-2 shadow-[0_0_35px_5px] rounded-2xl h-140 w-90 py-5">
          <div className="mb-3">
            <div className="text-white">
              <Icons />
            </div>
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
