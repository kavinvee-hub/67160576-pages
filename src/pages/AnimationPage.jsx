import React, { useEffect, useState, useRef } from 'react';
import "../styles/AnimationPage.css";

import fieldImg from '../assets/photo/field.jpg';
import basketballImg from '../assets/photo/pngtree-orange-basketball-png-image_16721120.webp';
import footballImg from '../assets/photo/football2.png';
import volleyballImg from '../assets/photo/volleyball2.jpg';
import humanImg from '../assets/photo/stdempimg.gif';
import cartoonImg from '../assets/photo/cartoon.jpg';

const AnimationPage = () => {
  const ballRef = useRef(null);
  const runBtnRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentType, setCurrentType] = useState(1);
  const position = useRef({ x: 100, y: 100 });
  const velocity = useRef({ dx: 5, dy: 5 });
  const rotation = useRef(0);
  const intervalId = useRef(null);

  // 🧠 map รูป ball
  const ballImages = {
    1: basketballImg,
    2: footballImg,
    3: volleyballImg,
    4: humanImg,
    5: cartoonImg,
  };

  const updateBallType = (type) => {
    setCurrentType(type);
    position.current = { x: 100, y: 100 };
    rotation.current = 0;
    velocity.current = { dx: 5, dy: 5 };

    if (ballRef.current) {
      ballRef.current.style.left = position.current.x + 'px';
      ballRef.current.style.top = position.current.y + 'px';
      ballRef.current.style.transform = 'rotate(0deg)';
    }
  };

  const runClicked = () => {
    setIsRunning((prev) => !prev);
  };

  const process = () => {
    if (!isRunning || currentType === 0 || !ballRef.current) return;

    let { x, y } = position.current;
    let { dx, dy } = velocity.current;

    rotation.current += 10;
    x += dx;
    y += dy;

    const ball = ballRef.current;
    const parent = ball.parentElement;

    if (x <= 0 || x + ball.offsetWidth >= parent.clientWidth) {
      velocity.current.dx = -dx;
    }
    if (y <= 0 || y + ball.offsetHeight >= parent.clientHeight) {
      velocity.current.dy = -dy;
    }

    position.current.x = x;
    position.current.y = y;

    ball.style.left = x + 'px';
    ball.style.top = y + 'px';
    ball.style.transform = `rotate(${rotation.current}deg)`;
  };

  useEffect(() => {
    if (intervalId.current) clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
      process();
    }, 25);
    return () => clearInterval(intervalId.current);
  }, [isRunning, currentType]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        runClicked();
      }
      const key = e.key;
      if (key >= '0' && key <= '5') {
        updateBallType(Number(key));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="animate-cantanner text-center">
      <div
        className="field mb-4"
        id="field"
        style={{
          backgroundImage: `url(${fieldImg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div
          ref={ballRef}
          className="ball"
          style={{
            left: '100px',
            top: '100px',
            backgroundImage: currentType !== 0 ? `url(${ballImages[currentType]})` : 'none',
          }}
        ></div>
      </div>

      <div className="control d-flex justify-content-center flex-wrap gap-2">
        <button
          ref={runBtnRef}
          className="btn btn-success"
          id="runBtn"
          data-type="run"
          onClick={runClicked}
        >
          {isRunning ? (
            <>
              <i className="bi bi-pause-circle"></i>&nbsp;Pause
            </>
          ) : (
            <>
              <i className="bi bi-play-circle"></i>&nbsp;Run
            </>
          )}
        </button>
        {[0, 1, 2, 3, 4, 5].map((type) => (
          <button
            key={type}
            className={`btn ${
              type === 0 ? 'btn-secondary' : 'btn-outline-primary'
            } ${currentType === type ? 'active' : ''}`}
            data-type={type}
            onClick={() => updateBallType(type)}
          >
            {type === 0
              ? 'None'
              : type === 1
              ? 'Basketball'
              : type === 2
              ? 'Football'
              : type === 3
              ? 'Volleyball'
              : type === 4
              ? 'Human'
              : 'Cartoon'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimationPage;
