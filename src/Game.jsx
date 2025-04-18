import { useState, useEffect, useCallback } from "react";
import Player from "./Player.jsx";
import Apple from "./Apple.jsx";
import "./player.css";

export default function Game() {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [direction, setDirection] = useState(null);
    const [dead, setDead] = useState(false);
    const [points, setPoints] = useState(0);
    const [Highscore,setHighscore] = useState(0)
    const [snakeLength, setSnakeLength] = useState(1);
    const [bodyParts, setBodyParts] = useState([]);
    const [positionApple, setPositionApple] = useState({x: 70, y: 140});


    const step = 35;

    function Movement(position, direction) {
        const newPosition = {...position};

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

        return newPosition;
    }

    function CheckWall(position) {
        return (
            position.x < 0 || position.x >= 595 ||
            position.y < 0 || position.y >= 595
        );
    }

    function CreateNewBodyParts(prevPos, bodyParts, snakeLength) {
        const newBody = [prevPos, ...bodyParts];
        if (newBody.length >= snakeLength) {
            newBody.pop();
        }
        return newBody;
    }

    function CheckCollisionWithYourself(position, bodyParts) {
        return bodyParts.some(part => part.x === position.x && part.y === position.y);
    }


    useEffect(() => {
        if (!direction || dead) return;

        const interval = setInterval(() => {
            setPosition(prevPos => {
                const newPosition = Movement(prevPos, direction);

                if (CheckWall(newPosition)) {
                    setDead(true);
                    return prevPos;
                }

                const newBodyParts = CreateNewBodyParts(prevPos, bodyParts, snakeLength);

                if (CheckCollisionWithYourself(newPosition, newBodyParts)) {
                    setDead(true);
                    return prevPos;
                }

                setBodyParts(newBodyParts);
                return newPosition;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [direction, dead, bodyParts, snakeLength]);

    //Steuerung
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

    // Eat Apple
    useEffect(() => {
        if (position.x === positionApple.x && position.y === positionApple.y) {
            const randomX = Math.floor(Math.random() * 17) * 35;
            const randomY = Math.floor(Math.random() * 17) * 35;
            setPositionApple({x: randomX, y: randomY});
            setPoints(prev => prev + 1);
            setSnakeLength(prev => prev + 1);
        }
    }, [position, positionApple]);

    // Dead
    useEffect(() => {
        if (dead) {
            const timer = setTimeout(() => {
                setPosition({x: 0, y: 0});
                setDirection(null);
                setPoints(0);
                setSnakeLength(1);
                setBodyParts([]);
                setDead(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [dead]);

    //set Highscore
    useEffect(() => {
        if(points>Highscore){
            setHighscore(points)
        }
    }, [points,Highscore]);

    return (
        <>
            <div className="game-header">
                <h1>Snake Game</h1>
                <h2>Punkte: {points}</h2>
                <h2>HIghscore: {Highscore}</h2>
            </div>
            <div className="map">
                <Player position={position} dead={dead}/>
                <Apple positionApple={positionApple}/>
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