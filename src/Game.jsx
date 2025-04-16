import { useState, useEffect, useCallback } from "react";
import Player from "./Player.jsx";
import Apple from "./Apple.jsx";
import "./player.css";

export default function Game() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [direction, setDirection] = useState(null);
    const [dead, setDead] = useState(false);
    const [points, setPoints] = useState(0);
    const [snakeLength, setSnakeLength] = useState(1);
    const [bodyParts, setBodyParts] = useState([]);
    const [positionApple, setPositionApple] = useState({ x: 70, y: 140 });


    useEffect(() => {
        if (!direction || dead) return;

        const interval = setInterval(() => {
            setPosition(prevPos => {
                const step = 35;
                let newPosition = { ...prevPos };

                switch (direction) {
                    case "up":
                        newPosition.y -= step;
                        break;
                    case "down":
                        newPosition.y += step;
                        break;
                    case "left":
                        newPosition.x -= step;
                        break;
                    case "right":
                        newPosition.x += step;
                        break;
                }


                if (
                    newPosition.x < 0 || newPosition.x >= 595 ||
                    newPosition.y < 0 || newPosition.y >= 595
                ) {
                    setDead(true);
                    return prevPos;
                }

                setBodyParts(prev => {
                    const updated = [prevPos, ...prev];
                    if (updated.length >= snakeLength) {
                        updated.pop(); // Nur entfernen, wenn die Länge überschritten wird
                    }
                    return updated;
                });

                return newPosition;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [direction, dead, snakeLength]);

    // Tastatursteuerung
    const handleKeyPress = useCallback((event) => {
        if (dead) return;

        switch (event.key) {
            case "w":
                setDirection("up");
                break;
            case "a":
                setDirection("left");
                break;
            case "s":
                setDirection("down");
                break;
            case "d":
                setDirection("right");
                break;
        }
    }, [dead]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);


    useEffect(() => {
        if (position.x === positionApple.x && position.y === positionApple.y) {
            const randomX = Math.floor(Math.random() * 17) * 35;
            const randomY = Math.floor(Math.random() * 17) * 35;
            setPositionApple({ x: randomX, y: randomY });
            setPoints(prev => prev + 1);
            setSnakeLength(prev => prev + 2);
            console.log(bodyParts.length)
           // console.log(snakeLength)// Korrekte Erhöhung der Länge
        }
    }, [position, positionApple]    );


    useEffect(() => {
        if (dead) {
            const timer = setTimeout(() => {
                setPosition({ x: 0, y: 0 });
                setDirection(null);
                setPoints(0);
                setSnakeLength(1); // Zurücksetzen auf 1
                setBodyParts([]);
                setDead(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [dead]);

    return (
        <>
            <h1>Snake Game</h1>
            <h2>Punkte: {points}</h2>
            <div className="map">
                <Player position={position} dead={dead} />
                <Apple positionApple={positionApple} />
                {bodyParts.map((part, index) => (
                    <div
                        key={index}
                        className="bodys"
                        style={{
                            left: `${part.x}px`,
                            top: `${part.y}px`,
                            position: "absolute"
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
}