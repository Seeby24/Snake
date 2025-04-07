import {useState, useEffect} from "react";
import Player from "./Player.jsx";
import "./player.css";

export default function Game() {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [key, setKey] = useState("x")

    let [dead, setDead] = useState(false)

    const handleKeyPress = (event) => {
        const step = 35;
        let newPosition = {...position};

        switch (event.key) {
            case 'w':
                newPosition.y -= step;
                setKey("y")
                break;
            case 'a':
                newPosition.x -= step;
                setKey("-x")
                break;
            case 's':
                newPosition.y += step;
                setKey("-y")
                break;
            case 'd':
                newPosition.x += step;
                setKey("x")
                break;
            default:
                break;
        }
        if (newPosition.x >= 735 || newPosition.x <= -35 || newPosition.y <= -35 || newPosition.y >= 735) {
            setDead(true);
            return;
        }

        while (dead) {
            if (key === "x") {
                newPosition.x += 35;
                setTimeout(1000)
            }
            if (key === "-x") {
                newPosition.x -= 35;
                setTimeout(1000)
            }
            if (key === "y") {
                newPosition.y += 35;
                setTimeout(1000)
            }
            if (key === "-y") {
                newPosition.x -= 35;
                setTimeout(1000)
            }


            setPosition(newPosition);
        }
        ;

        useEffect(() => {
            if (dead) {
                setPosition({x: 0, y: 0});
                setDead(false);
            }
        }, [dead]);


        useEffect(() => {
            window.addEventListener("keydown", handleKeyPress);
            return () => window.removeEventListener("keydown", handleKeyPress);
        }, [position]);


        return (
            <div className="map">
                <Player position={position}/>
            </div>
        );
    }
}