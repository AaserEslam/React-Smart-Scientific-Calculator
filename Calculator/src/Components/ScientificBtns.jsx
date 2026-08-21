import React from "react";
import { FiDelete } from "react-icons/fi";
import { HiSwitchHorizontal } from "react-icons/hi";

const ScientificBtns = () => {
  return (
    <div className="bg-green-600 top-0">
      <div className="w-80 mx-auto mt-3 h-14 grid grid-cols-4 gap-6">
        <button
          onClick={() => resetBtn()}
          className="bg-[#303033]  rounded-full cursor-pointer duration-300 text-[#ec6967] hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          <HiSwitchHorizontal />
        </button>
        <button
          onClick={() => deleteBtn()}
          className="bg-[#303033] rounded-full cursor-pointer duration-300 text-[#ec6967] flex items-center justify-center hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          Rad
        </button>
        <button
          onClick={() => addOperator("%")}
          className="bg-[#303033] rounded-full cursor-pointer hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          
        </button>
        <button
          onClick={() => addOperator("÷")}
          className="bg-[#696970] rounded-full cursor-pointer text-4xl hover:text-[#5cd4c3] duration-300 hover:shadow-[0_0px_20px_4px] active:scale-85"
        >
          ÷
        </button>
      </div>
    </div>
  );
};

export default ScientificBtns;
