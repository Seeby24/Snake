import { useState, useEffect } from "react";

export default function Bodys({ index,positionApple,positionPlayer}) {
    const [positionBody, setPositionBody] = useState({
        x: 0,
        y: 0,
    });


    return (
        <div
            className="bodys"
            style={{
                left: `${positionBody.x}px`,
                top: `${positionBody.y}px`,
                position: "absolute",
            }}
        ></div>
    );
}
