import "./player.css";
import {useState} from "react";


export default function Apple({positionApple}) {


    return (
        <div
            className="apple"
            style={{
                left: `${positionApple.x}px`,
                top: `${positionApple.y}px`,
                position: 'absolute'
            }}
        ></div>
    );
}