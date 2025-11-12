import { useState, useEffect } from "react";
import "../styles/Calculator.css";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const handleInput = (value) => {
    if (value === "C" || value === "AC") {
      setDisplay("0");
      setExpression("");
      setWaitingForNewNumber(false);
      return;
    }

    if (value === "=") {
      try {
        const result = eval(expression);
        setDisplay(String(result));
        setExpression(String(result));
        setWaitingForNewNumber(true);
      } catch {
        setDisplay("Error");
        setExpression("");
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      if (/[+\-*/]$/.test(expression)) {
        setExpression(expression.slice(0, -1) + value);
      } else {
        setExpression(expression + value);
      }
      setWaitingForNewNumber(true);
      return;
    }

    if (waitingForNewNumber) {
      setDisplay(value === "." ? "0." : value);
      setExpression(expression + value);
      setWaitingForNewNumber(false);
    } else {
      if (display === "0" && value !== ".") {
        setDisplay(value);
        setExpression(expression + value);
      } else {
        setDisplay(display + value);
        setExpression(expression + value);
      }
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      const key = e.key;
      if ("0123456789".includes(key)) handleInput(key);
      else if (key === "+") handleInput("+");
      else if (key === "-") handleInput("-");
      else if (key === "*" || key === "x") handleInput("*");
      else if (key === "/") handleInput("/");
      else if (key === "Enter") handleInput("=");
      else if (key === "Escape") handleInput("C");
      else if (key === "." ) handleInput(".");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="calc-body">
      <div className="calc-display">{display}</div>

      <div className="calc-row">
        <button className="btn-func">MC</button>
        <button className="btn-func">MR</button>
        <button className="btn-func">M+</button>
        <button className="btn-func">M-</button>
        <button className="btn-clear" onClick={() => handleInput("C")}>CE</button>
      </div>

      <div className="calc-row">
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("/")}>÷</button>
        <button>√</button>
      </div>

      <div className="calc-row">
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("*")}>×</button>
        <button>%</button>
      </div>

      <div className="calc-row">
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("-")}>−</button>
        <button>1/x</button>
      </div>

      <div className="calc-row">
        <button onClick={() => handleInput("0")}>0</button>
        <button>.</button>
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleInput("=")} className="btn-equal">=</button>
      </div>
    </div>
  );
}
