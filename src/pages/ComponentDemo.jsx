import React, { useState, useEffect } from "react";
import "../styles/ComponentDemo.css";

// Counter Component
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="box">
      <h3 className="box-title">COUNTER</h3>
      <div className="inner-box">
        <div className="btn-group">
          <button className="btn red" onClick={() => setCount(count - 1)}>−</button>
          <div className="value-box gray">{count}</div>
          <button className="btn green" onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
    </div>
  );
};

// Timer Component
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  const reset = () => setSeconds(0);
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec.toString().padStart(2, "0")}s` : `${sec}s`;
  };

  return (
    <div className="box">
      <h3 className="box-title">TIMER</h3>
      <div className="inner-box">
        <div className="value-box gray">{formatTime(seconds)}</div>
        <div className="btn-group">
          <button className="btn red" onClick={reset}>⟳ Reset</button>
          <button
            className={`btn ${running ? "yellow" : "green"}`}
            onClick={() => setRunning(!running)}
          >
            {running ? "❚❚ Pause" : "▶ Run"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Add Component
const Add = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  return (
    <div className="box">
      <h3 className="box-title blue">ADD</h3>
      <div className="inner-box">
        <div className="sum blue">A + B = {a + b}</div>
        <div className="row">
          <div className="col">
            <h5 className="gray">A = {a}</h5>
            <div className="btn-group">
              <button className="btn red" onClick={() => setA(a - 1)}>−</button>
              <div className="value-box gray">{a}</div>
              <button className="btn green" onClick={() => setA(a + 1)}>+</button>
            </div>
          </div>
          <div className="col">
            <h5 className="gray">B = {b}</h5>
            <div className="btn-group">
              <button className="btn red" onClick={() => setB(b - 1)}>−</button>
              <div className="value-box gray">{b}</div>
              <button className="btn green" onClick={() => setB(b + 1)}>+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Temperatures Component
const Temperatures = () => {
  const [celsius, setCelsius] = useState(25);
  const fahrenheit = (celsius * 9) / 5 + 32;
  const kelvin = celsius + 273.15;

  return (
    <div className="box">
      <h3 className="box-title blue">TEMPERATURES</h3>
      <div className="inner-box">
        <div className="row">
          <div className="col">
            <div className="value-box blue">{celsius.toFixed(2)} °C</div>
            <h5 className="gray">CELSIUS</h5>
            <div className="btn-group">
              <button className="btn red" onClick={() => setCelsius(celsius - 1)}>−</button>
              <div className="value-box gray">{celsius.toFixed(2)}</div>
              <button className="btn green" onClick={() => setCelsius(celsius + 1)}>+</button>
            </div>
          </div>
          <div className="col">
            <div className="value-box blue">{fahrenheit.toFixed(2)} °F</div>
            <h5 className="gray">FAHRENHEIT</h5>
          </div>
          <div className="col">
            <div className="value-box blue">{kelvin.toFixed(2)} °K</div>
            <h5 className="gray">KELVIN</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ComponentDemo = () => {
  return (
    <div className="component-demo">
      <Counter />
      <Timer />
      <Add />
      <Temperatures />
    </div>
  );
};

export default ComponentDemo;
