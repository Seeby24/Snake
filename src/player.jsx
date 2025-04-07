import "./player.css";

export default function Player({ position }) {
    return (
        <div
            className="player"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute'
            }}
        ></div>
    );
}