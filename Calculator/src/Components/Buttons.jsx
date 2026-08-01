import React, { useContext, useEffect } from "react";
import { FiDelete, FiMinus } from "react-icons/fi";
import InputNum from "./InputNum";
import { CalculatorContext } from "./CalculatorContext";

const Buttons = () => {
  const { inputBox, setInputBox, result, setResult } =
    useContext(CalculatorContext);

  const ClickBtn = (value) => {
    setInputBox((v) => v + value);
  };

  const deleteBtn = () => {
    setInputBox((v) => v.slice(0, -1));
  };

  const resetBtn = () => {
    setInputBox("");
    setResult("");
  };


  const calcResult = () => {
    if(!inputBox.trim()){
        setResult('')
        return
    }

    try{
        const sanitziedInput = inputBox.replaceAll("×" , "*").replaceAll("÷" , "/").replaceAll("%" , "/100")

        const calculated = new Function(`return ${sanitziedInput}`)()

        if(isFinite(calculated)){
            setResult(String(calculated))
        }
        else{
            setResult('')
        }
    }catch(error){
        setResult('')
    }
  }

  useEffect(() => {
    calcResult();
  }, [inputBox]);

  console.log(result);

  return (
    <div>
      <div className="text-white font-semibold text-3xl h-80 mt-9 ">
        <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
          <button
            onClick={() => resetBtn()}
            className="bg-[#303033] rounded-full cursor-pointer duration-300 text-[#ec6967] hover:shadow-[0_0px_20px_4px]"
          >
            C
          </button>
          <button
            onClick={() => deleteBtn()}
            className="bg-[#303033] rounded-full cursor-pointer duration-300 text-[#ec6967] flex items-center justify-center hover:shadow-[0_0px_20px_4px]"
          >
            <FiDelete />
          </button>
          <button
            onClick={() => ClickBtn("%")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            %
          </button>
          <button
            onClick={() => ClickBtn("÷")}
            className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            ÷
          </button>
        </div>
        <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
          <button
            onClick={() => ClickBtn("7")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            7
          </button>
          <button
            onClick={() => ClickBtn("8")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            8
          </button>
          <button
            onClick={() => ClickBtn("9")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            9
          </button>
          <button
            onClick={() => ClickBtn("×")}
            className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            ×
          </button>
        </div>
        <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
          <button
            onClick={() => ClickBtn("4")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            4
          </button>
          <button
            onClick={() => ClickBtn("5")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            5
          </button>
          <button
            onClick={() => ClickBtn("6")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            6
          </button>
          <button
            onClick={() => ClickBtn("-")}
            className="bg-[#696970] rounded-full cursor-pointer text-3xl flex items-center justify-center hover:text-[#5cd4c3] hover:shadow-[0_0px_20px_4px] duration-300"
          >
            <FiMinus />
          </button>
        </div>
        <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
          <button
            onClick={() => ClickBtn("1")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            1
          </button>
          <button
            onClick={() => ClickBtn("2")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            2
          </button>
          <button
            onClick={() => ClickBtn("3")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            3
          </button>
          <button
            onClick={() => ClickBtn("+")}
            className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            +
          </button>
        </div>
        <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
          <button
            onClick={() => ClickBtn("")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            ( )
          </button>
          <button
            onClick={() => ClickBtn("0")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300  hover:shadow-[0_0px_20px_4px]"
          >
            0
          </button>
          <button
            onClick={() => ClickBtn(".")}
            className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] hover:box-sha duration-300 hover:shadow-[0_0px_20px_4px]"
          >
            .
          </button>
          <button className="bg-[#197e70] rounded-full cursor-pointer text-4xl  duration-300 hover:shadow-[0_0px_20px_4px_#81beb6]">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
