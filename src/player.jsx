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
        >
            <div className="eye-left">
                <div className="pupil"></div>
            </div>
            <div className="eye-right">
                <div className="pupil"></div>
            </div>
        </div>
    );
}
