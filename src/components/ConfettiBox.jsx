import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/ConfettiBox.css";
const Confetti = ({ nextLevel ,currentLevel}) => { 
    const navigate=useNavigate();
    const [confettiPieces, setConfettiPieces] = useState([]);

  useEffect(() => {

    const confettiArray = Array.from({ length: 1000 }, (_, index) => ({
      id: index,
      xStart: Math.random() * window.innerWidth, 
      yStart: window.innerHeight,
      xMove: (Math.random() - 0.5) * 400, 
      yMove: -Math.random() * 700 - 100, 
      delay: Math.random() * 1.5, 
      color: `hsl(${Math.random() * 660}, 100%, 60%)`, 
    }));

    setConfettiPieces(confettiArray);
  }, []);


  

  return (
    <div className="confetti-container">
        <div className="completed"> level {currentLevel + 1+" "}completed<br/>🎉 Sucessfully 🎉 
            <div className="flexy">
                <button className="homepage" onClick={()=>navigate("/")}><img src="./src/assets/homepage.png"></img></button>
                <button className="arrow" onClick={nextLevel}><img src="./src/assets/right-arrow.png"></img></button>
            </div>
        </div>
      {confettiPieces.map(({ id, xStart, yStart, xMove, yMove, delay, color }) => (
        <div
          key={id}
          className="confetti"
          style={{
            left: `${xStart}px`,
            top: `${yStart}px`,
            backgroundColor: color,
            animationDelay: `${delay}s`,
            "--x-move": `${xMove}px`,
            "--y-move": `${yMove}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
