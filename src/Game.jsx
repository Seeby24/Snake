import { useState, useEffect } from "react";
import Player from "./Player.jsx";
import "./player.css";

export default function Game() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleKeyPress = (event) => {
        const step = 35;
        let newPosition = { ...position };

        switch (event.key) {
            case 'w':
                newPosition.y -= step;
                break;
            case 'a':
                newPosition.x -= step;
                break;
            case 's':
                newPosition.y += step;
                break;
            case 'd':
                newPosition.x += step;
                break;
            default:
                break;
        }
        if (newPosition.x >= 735) {
            alert("Du berührst den rechten Rand");
            newPosition.x = 700;
        }
        if (newPosition.x <= -35) {
            alert("Du berührst den linken Rand");
            newPosition.x = 0;
        }
        if (newPosition.y <= -35) {
            alert("Du berührst den oberen Rand");
            newPosition.y = 0;
        }
        if (newPosition.y >= 735) {
            alert("Du berührst den unteren Rand");
            newPosition.y = 700;
        }


        setPosition(newPosition);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [position]);






    return (
        <div className="map">
            <Player position={position} />
        </div>
    );
}
