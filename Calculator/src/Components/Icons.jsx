import React, { useContext } from "react";
import { FaRuler } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { TbSquareRoot } from "react-icons/tb";
import { CalculatorContext } from "./CalculatorContext";
import { PiCalculatorDuotone } from "react-icons/pi";

const Icons = () => {
  const { isPressedHistory, setIsPressedHistory, historyList, setHistoryList, history , isPressedScientfic , setIsPressedScientfic} =
    useContext(CalculatorContext);

  const handleHistoryClick = () => {
    setIsPressedHistory(!isPressedHistory);
  };

  const handleSciteficClick = () => {
    setIsPressedScientfic(!isPressedScientfic)
  }

  return (
    <div className="px-5">
      <div className="flex items-center justify-between">
        {isPressedHistory && historyList.length > 0 ? (
          <PiCalculatorDuotone
            onClick={() => handleHistoryClick()}
            className="text-2xl cursor-pointer text-[#1aacfe] transition-all duration-300 hover:scale-120"
          />
        ) : (
          <LiaHistorySolid
            onClick={() => handleHistoryClick()}
            className={`${historyList.length > 0 ? "text-[#1aacfe]" : "text-[#ade1ff]/70"} text-2xl cursor-pointer transition-all duration-300 hover:scale-120`}
          />
        )}

        <div className="flex items-center gap-4">
          <FaRuler className="text-2xl cursor-pointer transition-all duration-300 text-[#1aacfe] hover:scale-120" />
          <TbSquareRoot onClick={() => handleSciteficClick()} className="text-2xl text-[#1aacfe] cursor-pointer transition-all duration-300 hover:scale-120" />
        </div>
      </div>
    </div>
  );
};

export default Icons;
