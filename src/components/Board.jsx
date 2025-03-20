import { useState } from "react";
import "../styles/Board.css";
import { useEffect } from "react";
import Confetti from "./ConfettiBox";
function Board() {
    let addbottles="+";
    const levels = [
        [
            ["red", "green", "blue"],
            ["green", "blue", "red"],
            ["blue", "red", "green"],
            ["", "", ""]
        ],
        [
            ["red", "green", "yellow", "red"],
            ["yellow", "red", "green", "yellow"],
            ["green", "yellow", "red", "green"],
            ["", "", "", ""]
        ],
        [
            ["pink", "gold", "yellow"],
            ["gold", "yellow", "pink"],
            ["yellow", "pink", "gold"],
            ["", "", ""]
        ],
        [
            ["teal", "purple", "orange", "teal"],
            ["orange", "teal", "purple", "orange"],
            ["purple", "orange", "teal", "purple"],
            ["", "", "", ""]
        ],

        [
            ["cyan", "magenta", "lime"],
            ["magenta", "lime", "cyan"],
            ["lime", "cyan", "magenta"],
            ["", "", ""]
        ],
        [
            ["blue", "red", "violet", "gray"],
            ["red", "violet", "gray", "blue"],
            ["violet", "gray", "blue", "red"],
            ["gray", "blue", "red", "violet"],
            ["", "", "", ""]
        ],
        [
            ["turquoise", "silver", "maroon"],
            ["silver", "maroon", "turquoise"],
            ["maroon", "turquoise", "silver"],
            ["", "", ""]
        ],
        [
            ["navy", "beige", "olive", "crimson"],
            ["beige", "olive", "crimson", "navy"],
            ["olive", "crimson", "navy", "beige"],
            ["crimson", "navy", "beige", "olive"],
            ["", "", "", ""]
        ],
        [
            ["lavender", "amber", "peach"],
            ["amber", "peach", "lavender"],
            ["peach", "lavender", "amber"],
            ["", "", ""]
        ],
        [
            ["ruby", "aquamarine", "sapphire", "charcoal"],
            ["aquamarine", "sapphire", "charcoal", "ruby"],
            ["sapphire", "charcoal", "ruby", "aquamarine"],
            ["charcoal", "ruby", "aquamarine", "sapphire"],
            ["", "", "", ""]
        ]
    ];
    let [currentLevel, setCurrentLevel] = useState(0);
    let [undos, setUndos] = useState(5);
    const [bottles, setBottles] = useState(levels[currentLevel]);
    const [selectedColor, setSelectedColor] = useState(null);
    const [sourceBottle, setSourceBottle] = useState(null);
    const [history, setHistory] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false); 
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        if (isGameWon(bottles)) {
            setIsWon(true);
            setShowConfetti(true);  
        }
    }, [bottles]);

    function chooseBottle(bot_no) {
        setBottles((prevBottles) => {
            let newBottles = prevBottles.map((bottle) => [...bottle]);

            if (selectedColor === null) {
                let { color, count } = findTopConsecutiveColors(newBottles[bot_no]);
                if (color) {
                    setSelectedColor(color);
                    setSourceBottle(bot_no);
                }
            } else {
                if (bot_no !== sourceBottle) {
                    let targetBottomIndex = findBottomEmptyIndex(newBottles[bot_no]);
                    let targetTopColorIndex = findTopColorIndex(newBottles[bot_no]);

                    let canMove =
                        targetBottomIndex !== -1 &&
                        (targetTopColorIndex === -1 || newBottles[bot_no][targetTopColorIndex] === selectedColor);

                    if (canMove) {
                        setHistory((prevHistory) => [...prevHistory, prevBottles.map(b => [...b])]);
                        let availableSpace = newBottles[bot_no].filter(color => color === "").length;
                        let { color, count } = findTopConsecutiveColors(newBottles[sourceBottle]);
                        let moveCount = Math.min(count, availableSpace);
                        for (let i = 0; i < moveCount; i++) {
                            newBottles[bot_no][targetBottomIndex + i] = selectedColor;
                        }
                        for (let i = 0; i < moveCount; i++) {
                            let sourceTopIndex = findTopColorIndex(newBottles[sourceBottle]);
                            newBottles[sourceBottle][sourceTopIndex] = "";
                        }
                    }
                }
                setSelectedColor(null);
                setSourceBottle(null);
            }
            return newBottles;
        });
    }
    

    function findTopColorIndex(bottle) {
        for (let i = bottle.length - 1; i >= 0; i--) {
            if (bottle[i] !== "") return i;
        }
        return -1;
    }

    function findBottomEmptyIndex(bottle) {
        for (let i = 0; i < bottle.length; i++) {
            if (bottle[i] === "") return i;
        }
        return -1;
    }

    function isGameWon(bottles) {
        return bottles.every((bottle) => {
            const filledColors = bottle.filter(color => color !== "");
            return filledColors.length === 0 || 
                   (filledColors.length === bottle.length && new Set(filledColors).size === 1);
        });
    }
    function findTopConsecutiveColors(bottle) {
        let color = null;
        let count = 0;
        for (let i = bottle.length - 1; i >= 0; i--) {
            if (bottle[i] === "") continue;
            if (color === null) {
                color = bottle[i];
            }
            if (bottle[i] === color) {
                count++;
            } else {
                break;
            }
        }
        return { color, count };
    }
    function restartGame() {
        setBottles(levels[currentLevel]);
        setSelectedColor(null);
        setSourceBottle(null);
        setHistory([]);
        setUndos(5);
    }

    function undoMove() {
        if (history.length >0 && undos>0) {
            setBottles(history[history.length - 1]); 
            setHistory((prevHistory) => prevHistory.slice(0, -1)); 
            setUndos((prevUndos) => prevUndos - 1);
        }
    }

    function addBottle() {
        setBottles((prevBottles) => [...prevBottles, ["", "", ""]]);
    }
    function nextLevel() {
        if (currentLevel < levels.length - 1) {
            setCurrentLevel((prevLevel) => prevLevel + 1);
            setBottles(levels[currentLevel + 1]);
            setHistory([]);
            setUndos(5);
            setIsWon(false); 
            setShowConfetti(false); 
        } else {
            alert("You have completed all levels!");
        }
    }

    return (
        <div className="B_body">
          {showConfetti && <Confetti nextLevel={nextLevel} currentLevel={currentLevel} />}
            <header className="B_header">Water Sort Puzzle</header>
            <div className="underline"></div>
            <div className="B_bottle_container">
                <h2>Level - {currentLevel+1}</h2>
                <div className="Flex-Container">
                {bottles.map((colors, i) => (
                    <button key={i} onClick={() => chooseBottle(i)}
                    className={i === sourceBottle ? "selected-bottle" : ""}>
                        <Bottles colors={colors} />
                    </button>
                ))}
                </div>
            </div>
            <div className="options">
                <button onClick={restartGame}>
                    <img src="src/assets/reStart.png" className="Restart" alt="Restart" />
                    
                </button>
                <button onClick={addBottle}>
                    <img src="src/assets/Add.png" className="Add" alt="Add" />
                    <div className="popup">{addbottles}</div>
                </button>
                <button onClick={undoMove}>
                    <img src="src/assets/undo.png" className="Undo" alt="Undo" />
                    <div className="popup">{undos}</div>
                </button>
            </div>
        </div>
    );
}

export default Board;

function Bottles({ colors }) {
    const bottleHeight = 320;
    const numColors = colors.length;
    const layerHeight = bottleHeight / numColors;

    return (
        <>
            <svg height={400} width={160}>
                {colors.map((color, index) => {
                    if (!color) return null;
                    const topY = 360 - (index + 1) * layerHeight -2;
                    if (index === 0) {
                        return (
                            <g key={index}>
                                <rect x="30" y={topY} width="90" height={layerHeight - 20} fill={color} stroke="none" />
                                <path
                                    d={`
                                        M 30 ${topY + layerHeight - 25} 
                                        C 30 ${topY + layerHeight + 20}, 
                                          120 ${topY + layerHeight + 20}, 
                                          120 ${topY + layerHeight - 25} 
                                        L 30 ${topY + layerHeight - 20} 
                                        Z
                                    `}
                                    fill={color}
                                    stroke="none"
                                />
                            </g>
                        );
                    } else {
                        return (
                            <rect
                                key={index}
                                x="30"
                                y={topY}
                                width="90"
                                height={layerHeight+1}
                                fill={color}
                            />
                        );
                    }
                })}
                <polygon points="30,40 30,340" stroke="white"></polygon>
                <path d="M30 340 C30 380, 120 380, 120 340" stroke="white" strokeWidth={1} fill="none" />
                <polygon points="120,40 120,340" stroke="white"></polygon>
                <polygon points="35,40 35,340" stroke="white"></polygon>
                <path d="M35 340 C40 380, 115 380, 115 335" stroke="white" strokeWidth={1} fill="none" />
                <polygon points="115,40 115,340" stroke="white"></polygon>
                <polygon points="20,35 130,35 130,30 20,30" fill="none" stroke="white"></polygon>
            </svg>
        </>
    );
}


