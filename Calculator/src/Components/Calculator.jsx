import React, { useState } from "react";
import InputNum from "./InputNum";
import Buttons from "./Buttons";
import { CalculatorContext } from "./CalculatorContext";
import { LiaHistorySolid } from "react-icons/lia";
import Icons from "./Icons";

const Calculator = () => {
  const [inputBox, setInputBox] = useState("");
  const [resultBox, setResultBox] = useState("");
  const [isPressedHistory, setIsPressedHistory] = useState(false);
  const [isPressedScientfic , setIsPressedScientfic] = useState(false)
  const [historyList, setHistoryList] = useState(
    localStorage.length > 0 ? JSON.parse(localStorage.getItem("history")) : [],
  );

    


  const history = {
    input: inputBox,
    result: resultBox,
  };

  return (
    <CalculatorContext.Provider
      value={{
        inputBox,
        setInputBox,
        resultBox,
        setResultBox,
        isPressedHistory,
        setIsPressedHistory,
        history,
        historyList,
        setHistoryList,isPressedScientfic , setIsPressedScientfic
      }}
    >
      <div>
        <div className={`bg-[#f6f8fc] dark:bg-[#17191a] font-Inter rounded-2xl h-140 w-87 py-5 border-2 border-[#c5d9e7] overflow-hidden shadow-[0px_0px_30px_1px_#666]`}>
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
