import React, { useContext } from "react";
import { FiDelete, FiMinus } from "react-icons/fi";
import { CalculatorContext } from "./CalculatorContext";

const RegularBtns = () => {
  const {
    inputBox,
    setInputBox,
    resultBox,
    setResultBox,
    isPressedHistory,
    setIsPressedHistory,
    history,
    historyList,
    setHistoryList,
    isPressedScientfic,
    setIsPressedScientfic,
  } = useContext(CalculatorContext);

  return (
    <div className="bg-red-600 h-40 absolute top-0">
      {/* Calculator Buttons */}
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => resetBtn()}
          className="bg-[#303033]  rounded-full cursor-pointer duration-300 text-[#ec6967] hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          C
        </button>
        <button
          onClick={() => deleteBtn()}
          className="bg-[#303033] rounded-full cursor-pointer duration-300 text-[#ec6967] flex items-center justify-center hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          <FiDelete />
        </button>
        <button
          onClick={() => addOperator("%")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          %
        </button>
        <button
          onClick={() => addOperator("÷")}
          className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          ÷
        </button>
      </div>
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => ClickBtn("7")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          7
        </button>
        <button
          onClick={() => ClickBtn("8")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          8
        </button>
        <button
          onClick={() => ClickBtn("9")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          9
        </button>
        <button
          onClick={() => addOperator("×")}
          className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          ×
        </button>
      </div>
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => ClickBtn("4")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          4
        </button>
        <button
          onClick={() => ClickBtn("5")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          5
        </button>
        <button
          onClick={() => ClickBtn("6")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          6
        </button>
        <button
          onClick={() => addOperator("-")}
          className="bg-[#696970] rounded-full cursor-pointer text-3xl flex items-center justify-center hover:text-[#5cd4c3] hover:shadow-[0_0px_20px_4px] duration-300 active:scale-85"
        >
          <FiMinus />
        </button>
      </div>
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => ClickBtn("1")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          1
        </button>
        <button
          onClick={() => ClickBtn("2")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          2
        </button>
        <button
          onClick={() => ClickBtn("3")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          3
        </button>
        <button
          onClick={() => addOperator("+")}
          className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          +
        </button>
      </div>
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => inputBrackets()}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          ( )
        </button>
        <button
          onClick={() => ClickBtn("0")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300  hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          0
        </button>
        <button
          onClick={() => ClickBtn(".")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] hover:box-sha duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          .
        </button>
        <button
          onClick={() => showResult()}
          className="bg-[#197e70] rounded-full cursor-pointer text-4xl  duration-300 hover:shadow-[0_0px_20px_4px_#81beb6] active:scale-85"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default RegularBtns;
