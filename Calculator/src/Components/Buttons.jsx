import React, { useContext, useEffect } from "react";
import { FiDelete, FiMinus } from "react-icons/fi";
import InputNum from "./InputNum";
import { CalculatorContext } from "./CalculatorContext";

const Buttons = () => {
  const {
    inputBox,
    setInputBox,
    resultBox,
    setResultBox,
    isPressed,
    setIsPressed,history,historyList, setHistoryList
  } = useContext(CalculatorContext);

  const ClickBtn = (value) => {
    setInputBox((v) => v + value);
  };

  const deleteBtn = () => {
    setInputBox((v) => v.slice(0, -1));
  };

  const resetBtn = () => {
    setInputBox("");
    setResultBox("");
  };

  const inputBrackets = () => {
    const openCount = (inputBox.match(/\(/g) || []).length;
    const closeCount = (inputBox.match(/\)/g) || []).length;
    const lastChar = inputBox.slice(-1);

    if (["+", "-", "÷", "×", "(", ")", ""].includes(lastChar)) {
      setInputBox((v) => v + "(");
    } else if (openCount > closeCount && !isNaN(lastChar)) {
      setInputBox((v) => v + ")");
    }
  };

  const showResult = () => {
    if (resultBox) {
      setHistoryList((p) => [...p , history])
      setInputBox(resultBox);
      setResultBox("");
    }
  };

  const calcResult = () => {
    if (!inputBox.trim()) {
      setResultBox("");
      return;
    }

    try {
      //? To Remove The Result Automaticly If There Isn't Any Operator
      const operator = ["+", "-", "×", "÷", "%"].some((op) =>
        inputBox.includes(op),
      );
      const sanitziedInput = inputBox
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("%", "/100")
        .replace(")(", ")*(");

      const calculated = new Function(`return ${sanitziedInput}`)();
      if (isFinite(calculated) && operator) {
        setResultBox(String(calculated));
      } else {
        setResultBox("");
      }
    } catch (error) {
      setResultBox("");
    }
  };

  const clearHistory = () => {
    setHistoryList([])
  }

  const addResultFromHistory = (view) => {
    setInputBox(view);
    setResultBox('')
    setIsPressed(false)
  }

  useEffect(() => {
    calcResult();
  }, [inputBox]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(historyList));
  });

  return (
    <div>
      <div className="text-white font-semibold text-3xl h-80 mt-2 relative">
        {/* History List */}
        
          <div className={`bg-[#010101]  absolute -left-67 ${isPressed && historyList.length > 0? 'left-0' : ''} opacity-100 ${isPressed? 'opacity-0' : ''} w-66 h-84 rounded-bl-2xl text-right transition-all duration-300 ease-in-out border-r-2 border-white/50 px-1`}>
            <ul
              className="p-2 h-65 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#696970] [&::-webkit-scrollbar-thumb]:rounded-full"
            >
                {historyList.map((item , index) => (
                  <div key={index} className="my-6">
                    <li onClick={() => addResultFromHistory(item.input)} className="text-white  text-2xl cursor-pointer p-1">{item.input}</li>
                    <li onClick={() => addResultFromHistory(item.result)} className="text-[#197e70]  text-2xl cursor-pointer p-1">{item.result}</li>
                  </div>
                ))}
            </ul>
            <div className="rounded-bl-2xl flex items-center justify-center py-2">
              <button onClick={() => clearHistory()} className="bg-[#696970] py-3 px-6 rounded-full my-2 text-sm w-40 cursor-pointer hover:scale-105 transition-all duration-400 active:scale-95">
                Clear History
              </button>
            </div>
          </div>
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
            onClick={() => ClickBtn("%")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
          >
            %
          </button>
          <button
            onClick={() => ClickBtn("÷")}
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
            onClick={() => ClickBtn("×")}
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
            onClick={() => ClickBtn("-")}
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
            onClick={() => ClickBtn("+")}
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
    </div>
  );
};

export default Buttons;
