import {useState, useEffect, useCallback} from "react";
import Player from "./Player.jsx";
import "./player.css";
import Apple from "./Apple.jsx";
import Bodys from "./bodys.jsx";
import Body from "./body.jsx";


export default function Game() {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [direction, setDirection] = useState(null);
    const [dead, setDead] = useState(false);
    const [points, setPoints] = useState(0)
    const [positionApple, setPositionApple] = useState({
        x: 70,
        y: 140
    });


    useEffect(() => {
        if (!direction || dead) return;

        const interval = setInterval(() => {
            setPosition(prevPos => {
                const step = 35;
                let newPosition = {...prevPos};

                switch (direction) {
                    case 'up':
                        newPosition.y -= step;
                        break;
                    case 'left':
                        newPosition.x -= step;
                        break;
                    case 'down':
                        newPosition.y += step;
                        break;
                    case 'right':
                        newPosition.x += step;
                        break;
                    default:
                        break;
                }


                if (
                    newPosition.x >= 735 ||
                    newPosition.x <= -35 ||
                    newPosition.y <= -35 ||
                    newPosition.y >= 735
                ) {
                    setDead(true);
                    return prevPos;
                }

                return newPosition;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [direction, dead]);


    const handleKeyPress = useCallback((event) => {
        if (dead) return;

        switch (event.key) {
            case 'w':
                setDirection('up');
                break;
            case 'a':
                setDirection('left');
                break;
            case 's':
                setDirection('down');
                break;
            case 'd':
                setDirection('right');
                break;
            default:
                break;
        }
    }, [dead]);


    useEffect(() => {
        if (dead) {
            const timer = setTimeout(() => {
                setPosition({x: 70, y: 70});
                setDead(false);
                setPoints(0)
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [dead]);


    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);


    useEffect(() => {
        if (position.x === positionApple.x && position.y === positionApple.y) {
            const randomX = Math.floor(Math.random() * 21) * 35;
            const randomY = Math.floor(Math.random() * 21) * 35;
            setPositionApple({x: randomX, y: randomY});
            setPoints(prev => prev + 1);

        }
    }, [position, positionApple]);



    return (
        <>
            <h1>Snake Game</h1>

            <h2>Punkte:{points}</h2>
            <div className="map">
                <Player position={position} dead={dead}/>
                <Apple positionApple={positionApple}/>
                <Bodys/>
            </div>
        </>
    );
}