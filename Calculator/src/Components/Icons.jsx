import React, { useContext, useEffect, useState } from "react";
import { FaRuler } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { TbSquareRoot } from "react-icons/tb";
import { CalculatorContext } from "./CalculatorContext";
import { PiCalculatorDuotone } from "react-icons/pi";
import { FiMoon, FiSun } from "react-icons/fi";

const Icons = () => {
  const { isPressedHistory, setIsPressedHistory, historyList, setHistoryList, history , isPressedScientfic , setIsPressedScientfic , themeToggled , setThemeToggled} =
    useContext(CalculatorContext);
    
  const element = document.documentElement

  console.log(themeToggled);

  const handleHistoryClick = () => {
    setIsPressedHistory(!isPressedHistory);
  };

  const handleSciteficClick = () => {
    setIsPressedScientfic(!isPressedScientfic)
  }
  const [theme , setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
  

  // Set Adding Theme To LocalStorage
  
  useEffect(() => {
    localStorage.setItem("theme" , theme);
    if(theme === "dark"){
      element.classList.add("dark")
    }
    else{
      element.classList.remove("dark");
    }
  })


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
          {theme === "dark" ? <FiSun onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="text-amber-400 text-2xl cursor-pointer transition-all duration-300 hover:scale-120 hover:rotate-360"/> : <FiMoon onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="text-purple-400 text-2xl cursor-pointer transition-all duration-300 hover:scale-120 hover:rotate-360"/>}
          <FaRuler className="text-2xl cursor-pointer transition-all duration-300 text-[#1aacfe] hover:scale-120" />
          <TbSquareRoot onClick={() => handleSciteficClick()} className="text-2xl text-[#1aacfe] cursor-pointer transition-all duration-300 hover:scale-120" />
        </div>
      </div>
    </div>
  );
};

export default Icons;
