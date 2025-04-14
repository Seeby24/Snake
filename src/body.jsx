import Bodys from "./Bodys.jsx";
import {useEffect} from "react";

export default function Body({ points,positionApple,positionPlayer,setPositionBody }) {
    const divArray = Array.from({ length: points });



    return (
        <div>
            {divArray.map((_, index) => (
                <Bodys key={index} index={index} />
            ))}
        </div>
    );
}
