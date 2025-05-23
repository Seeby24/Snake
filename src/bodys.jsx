// Bodys.jsx
import "./player.css";

export default function Bodys({ position }) {
    return (
        <div
            className="bodys"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: "absolute",
                width: "35px",
                height: "35px",
                border: "1px solid black",
            }}
        ></div>
    );
}
