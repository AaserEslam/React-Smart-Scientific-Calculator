import React, { useContext, useEffect, useState } from "react";
import { FiDelete, FiMinus } from "react-icons/fi";
import InputNum from "./InputNum";
import { CalculatorContext } from "./CalculatorContext";
import { HiOutlineSwitchHorizontal, HiSwitchHorizontal } from "react-icons/hi";
import { TbSquareRoot } from "react-icons/tb";
import { evaluate } from "mathjs";

const Buttons = () => {
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

  const [isRad, setIsRad] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);

  const ClickBtn = (value) => {
    if (value === ".") {
      if (!inputBox) {
        setInputBox("0.");
        return;
      }

      const endWithOperator = /[+\-×÷]$/.test(inputBox);
      if (endWithOperator) {
        setInputBox((v) => v + "0.");
        return;
      }
      const currentNumber = inputBox.split(/[+\-÷×(]/).pop();
      if (!currentNumber.includes(".")) {
        setInputBox((v) => v + ".");
      }
      return;
    }

    if (inputBox === "0") {
      if (value === "0") return;
      setInputBox(value);
      return;
    }

    const endWithOperatorZero = /[+\-×(]0$/.test(inputBox);

    if (endWithOperatorZero) {
      if (value === "0") return;
      if (value === ".") {
        setInputBox(inputBox + ".");
        return;
      }
      setInputBox(inputBox.slice(0, -1) + value);
      return;
    }

    setInputBox((v) => v + value);
  };

  const addOperator = (op) => {
    if (!inputBox) return;
    const endWithOperator = /[+\-×÷]$/.test(inputBox);
    if (endWithOperator) {
      setInputBox(inputBox.slice(0, -1) + op);
      return;
    }

    setInputBox((o) => o + op);
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

  const handleSci = (func) => {
    switch (func) {
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
      case "asin":
      case "acos":
      case "atan":
      case "sinh":
      case "cosh":
      case "tanh":
      case "asinh":
      case "acosh":
      case "atanh":
      case "cbrt":
        setInputBox((p) => p + `${func}(`);
        break;
      case "√":
        setInputBox((p) => p + "√(");
        break;
      case "π":
        setInputBox((p) => p + "π");
        break;
      case "e":
        setInputBox((p) => p + "e");
        break;
      case "!":
        if (inputBox) setInputBox((p) => p + "!");
        break;
      case "| x |":
      case "abs":
        setInputBox((p) => p + "abs(");
        break;
      case "1÷":
        setInputBox((p) => p + "1/");
        break;
      case "^(2)":
        if (inputBox) setInputBox((p) => p + "^(2)");
        break;
      case "^(3)":
        if (inputBox) setInputBox((p) => p + "^(3)");
        break;
      case "2^(":
        setInputBox((p) => p + "2^(");
        break;
      case "^(":
        if (inputBox) setInputBox((p) => p + "^(");
        break;
      case "e^(":
        setInputBox((p) => p + "e^(");
        break;
      case "(-":
        setInputBox((p) => p + "(-");
        break;
      default:
        break;
    }
  };

  const showResult = () => {
    if (resultBox) {
      setHistoryList((p) => [...p, history]);
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
      const operator = [
        "+",
        "-",
        "x",
        "×",
        "÷",
        "/",
        "%",
        "sin",
        "cos",
        "tan",
        "asin",
        "acos",
        "atan",
        "sinh",
        "cosh",
        "tanh",
        "asinh",
        "acosh",
        "atanh",
        "ln",
        "log",
        "sqrt",
        "cbrt",
        "√",
        "π",
        "pi",
        "abs",
        "^",
        "e",
        "!",
      ].some((op) => inputBox.includes(op));

      let sanitizedInput = inputBox
        .replaceAll("x", "*")
        .replaceAll("×", "*")
        .replaceAll("÷", "/")
        .replaceAll("%", "/100")
        .replaceAll("(-", "(-1*")
        .replace(/√(\d+(\.\d+)?)/g, "sqrt($1)")
        .replaceAll("√", "sqrt")
        .replace(/(\d)\s*π/g, "$1*pi")
        .replaceAll("π", "pi")
        .replace(/(\d)\s*e/g, "$1*e")
        .replace(/ln\(/g, "log(");

      const openBrackets = (sanitizedInput.match(/\(/g) || []).length;
      const closeBrackets = (sanitizedInput.match(/\)/g) || []).length;
      if (openBrackets > closeBrackets) {
        sanitizedInput += ")".repeat(openBrackets - closeBrackets);
      }

      if (!isRad) {
        sanitizedInput = sanitizedInput

          .replace(/(?<!a)sin\(([^)]+)\)/g, "sin($1 deg)")
          .replace(/(?<!a)cos\(([^)]+)\)/g, "cos($1 deg)")
          .replace(/(?<!a)tan\(([^)]+)\)/g, "tan($1 deg)");
        console.log(sanitizedInput);
      }

      let calculated = evaluate(sanitizedInput);

      if (!isRad && typeof calculated === "number") {
        const hasInverseTrig = /(?<![a-z])(asin|acos|atan)(?![a-z])/i.test(
          inputBox,
        );

        if (hasInverseTrig) {
          calculated = (calculated * 180) / Math.PI;
        }
      }

      if (isFinite(calculated) && operator) {
        const finalResult = parseFloat(calculated.toFixed(8));
        setResultBox(String(finalResult));
      } else {
        setResultBox("");
      }
    } catch (error) {
      setResultBox("");
    }
  };

  const clearHistory = () => {
    setHistoryList([]);
  };

  const addResultFromHistory = (view) => {
    setInputBox(view);
    setResultBox("");
    setIsPressedHistory(false);
  };

  useEffect(() => {
    calcResult();
  }, [inputBox, isRad]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(historyList));
  });

  const regularRowStyle = `grid grid-cols-4 gap-2 transition-all duration-300 ${
    isPressedScientfic ? "h-8" : "h-14"
  }`;

  const numBtnStyle = `w-full h-full rounded-2xl inset-shadow-white/20 inset-shadow-sm bg-white dark:bg-[#0c151b] dark:shadow-none text-[#555] dark:text-white shadow-[0px_6px_5px_0px_#bec0c4] border-1 border-gray-400/30 dark:border-0 font-bold cursor-pointer flex items-center justify-center active:scale-95 transition-all ${
    isPressedScientfic ? "text-sm" : "text-2xl"
  }`;

  const opBtnStyle = `w-full h-full rounded-2xl inset-shadow-white/30 inset-shadow-sm bg-[#c6d9e5] dark:bg-[#033159] text-[#555] dark:text-white dark:shadow-none shadow-[0px_6px_5px_0px_#bec0c4] font-bold cursor-pointer dark:border-0  flex items-center border-1 border-gray-400/30 justify-center active:scale-95 transition-all ${
    isPressedScientfic ? "text-sm" : "text-2xl"
  }`;

  const sciBtnStyle = `w-full h-full rounded-2xl bg-[#21232d] text-[#555] text-xs flex items-center  justify-center inset-shadow-white/20 inset-shadow-sm bg-white dark:bg-[#0c151b] dark:shadow-none text-[#555] font-bold dark:text-white shadow-[0px_6px_5px_0px_#bec0c4] active:scale-95 transition-all cursor-pointer`;

  return (
    <div>
      <div className="text-white font-semibold text-3xl h-80 mt-2 relative">
        {/* History List */}
        <div
          className={`bg-[#f6f8fc] dark:bg-[#17191a]  absolute z-50 -left-67 ${isPressedHistory && historyList.length > 0 ? "left-0" : ""} opacity-100 ${isPressedHistory ? "opacity-0" : ""} w-63.5 h-84 rounded-bl-2xl text-right transition-all duration-300 ease-in-out border-r-2 border-gray-300/40 px-1`}
        >
          <ul className="p-2 h-65 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#696970] [&::-webkit-scrollbar-thumb]:rounded-full">
            {historyList.map((item, index) => (
              <div key={index} className="mb-10">
                <li
                  onClick={() => addResultFromHistory(item.input)}
                  className="text-[#555] dark:text-white  text-2xl cursor-pointer p-1"
                >
                  {item.input}
                </li>
                <li
                  onClick={() => addResultFromHistory(item.result)}
                  className="text-[#1aacfe]  text-2xl cursor-pointer p-1"
                >
                  {item.result}
                </li>
              </div>
            ))}
          </ul>
          <div className="rounded-bl-2xl flex  items-center justify-center py-2">
            <button
              onClick={() => clearHistory()}
              className="bg-[#0092ff] shadow-[0px_0px_10px_4px_#7acdfb] ring-2 ring-blue-300 py-3 px-6 rounded-full my-2 text-sm w-40 cursor-pointer hover:scale-105 transition-all duration-400 active:scale-95"
            >
              Clear History
            </button>
          </div>
        </div>

        <div className="w-80 mx-auto mt-2 flex flex-col justify-end transition-all duration-300">
          {/* Scitefic Buttons */}
          <div
            className={`flex flex-col gap-2 transition-all duration-300 ease-in-out transform origin-top ${
              isPressedScientfic
                ? "max-h-96 opacity-100 translate-y-0 mb-2"
                : "max-h-0 opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div className="grid grid-cols-4 gap-2 h-7">
              <button
                onClick={() => setIsSwitched(!isSwitched)}
                className={`${sciBtnStyle} flex justify-center items-center`}
              >
                <HiOutlineSwitchHorizontal />
              </button>
              <button onClick={() => setIsRad(!isRad)} className={sciBtnStyle}>
                {isRad ? "Deg" : "Rad"}
              </button>

              {isSwitched ? (
                <button
                  onClick={() => handleSci("cbrt(")}
                  className={sciBtnStyle}
                >
                  <sup>3</sup>
                  <TbSquareRoot />
                </button>
              ) : (
                <button onClick={() => handleSci("√")} className={sciBtnStyle}>
                  <TbSquareRoot />
                </button>
              )}

              {isSwitched ? (
                <button
                  onClick={() => handleSci("2^(")}
                  className={sciBtnStyle}
                >
                  2<sup>x</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("| x |")}
                  className={sciBtnStyle}
                >
                  | x |
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 h-7">
              {isSwitched ? (
                <button
                  onClick={() => handleSci("asin")}
                  className={sciBtnStyle}
                >
                  sin<sup>-1</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("sin")}
                  className={sciBtnStyle}
                >
                  sin
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("acos")}
                  className={sciBtnStyle}
                >
                  cos<sup>-1</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("cos")}
                  className={sciBtnStyle}
                >
                  cos
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("atan")}
                  className={sciBtnStyle}
                >
                  tan<sup>-1</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("tan")}
                  className={sciBtnStyle}
                >
                  tan
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("^(3)")}
                  className={sciBtnStyle}
                >
                  x<sup>3</sup>
                </button>
              ) : (
                <button onClick={() => handleSci("π")} className={sciBtnStyle}>
                  π
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 h-7">
              {isSwitched ? (
                <button
                  onClick={() => handleSci("sinh")}
                  className={sciBtnStyle}
                >
                  sinh
                </button>
              ) : (
                <button onClick={() => handleSci("ln")} className={sciBtnStyle}>
                  ln
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("cosh")}
                  className={sciBtnStyle}
                >
                  cosh
                </button>
              ) : (
                <button
                  onClick={() => handleSci("log")}
                  className={sciBtnStyle}
                >
                  log
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("tanh")}
                  className={sciBtnStyle}
                >
                  tanh
                </button>
              ) : (
                <button onClick={() => handleSci("1÷")} className={sciBtnStyle}>
                  1/x
                </button>
              )}
              {isSwitched ? (
                <button onClick={() => handleSci("!")} className={sciBtnStyle}>
                  x!
                </button>
              ) : (
                <button onClick={() => handleSci("e")} className={sciBtnStyle}>
                  e
                </button>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 h-7">
              {isSwitched ? (
                <button
                  onClick={() => handleSci("asinh")}
                  className={sciBtnStyle}
                >
                  sinh<sup>-1</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("e^(")}
                  className={sciBtnStyle}
                >
                  e<sup>x</sup>
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("acosh")}
                  className={sciBtnStyle}
                >
                  cosh<sup>-1</sup>
                </button>
              ) : (
                <button
                  onClick={() => handleSci("^(2)")}
                  className={sciBtnStyle}
                >
                  x<sup>2</sup>
                </button>
              )}
              {isSwitched ? (
                <button
                  onClick={() => handleSci("atanh")}
                  className={sciBtnStyle}
                >
                  tanh<sup>-1</sup>
                </button>
              ) : (
                <button onClick={() => handleSci("^(")} className={sciBtnStyle}>
                  x<sup>y</sup>
                </button>
              )}
              <button onClick={() => handleSci("(-")} className={sciBtnStyle}>
                +/-
              </button>
            </div>
          </div>

          {/*Regular Buttons*/}
          <div
            className={`flex flex-col transition-all duration-300 ${isPressedScientfic ? "gap-1.5" : "gap-3"}`}
          >
            <div className={regularRowStyle}>
              <button onClick={resetBtn} className={`${opBtnStyle} `}>
                C
              </button>
              <button onClick={deleteBtn} className={`${opBtnStyle}`}>
                <FiDelete />
              </button>
              <button onClick={() => addOperator("%")} className={opBtnStyle}>
                %
              </button>
              <button onClick={() => addOperator("÷")} className={opBtnStyle}>
                ÷
              </button>
            </div>

            <div className={regularRowStyle}>
              <button onClick={() => ClickBtn("7")} className={numBtnStyle}>
                7
              </button>
              <button onClick={() => ClickBtn("8")} className={numBtnStyle}>
                8
              </button>
              <button onClick={() => ClickBtn("9")} className={numBtnStyle}>
                9
              </button>
              <button onClick={() => addOperator("×")} className={opBtnStyle}>
                ×
              </button>
            </div>

            <div className={regularRowStyle}>
              <button onClick={() => ClickBtn("4")} className={numBtnStyle}>
                4
              </button>
              <button onClick={() => ClickBtn("5")} className={numBtnStyle}>
                5
              </button>
              <button onClick={() => ClickBtn("6")} className={numBtnStyle}>
                6
              </button>
              <button onClick={() => addOperator("-")} className={opBtnStyle}>
                -
              </button>
            </div>

            <div className={regularRowStyle}>
              <button onClick={() => ClickBtn("1")} className={numBtnStyle}>
                1
              </button>
              <button onClick={() => ClickBtn("2")} className={numBtnStyle}>
                2
              </button>
              <button onClick={() => ClickBtn("3")} className={numBtnStyle}>
                3
              </button>
              <button onClick={() => addOperator("+")} className={opBtnStyle}>
                +
              </button>
            </div>

            <div className={regularRowStyle}>
              <button onClick={() => inputBrackets()} className={numBtnStyle}>
                ( )
              </button>
              <button onClick={() => ClickBtn("0")} className={numBtnStyle}>
                0
              </button>
              <button onClick={() => ClickBtn(".")} className={numBtnStyle}>
                .
              </button>
              <button
                onClick={() => showResult()}
                className={`w-full h-full rounded-2xl bg-[#0092ff] text-white border-2 border-white/70 dark:border-0 shadow-[0px_6px_5px_0px_#bec0c4] dark:shadow-none dark:inset-shadow-white/70 inset-shadow-sm font-semibold cursor-pointer active:scale-95 transition-all flex items-center justify-center ${isPressedScientfic ? "text-sm" : "text-2xl"}`}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buttons;