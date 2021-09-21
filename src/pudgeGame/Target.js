import React, { useState, useEffect } from "react";
import { Image } from 'semantic-ui-react';


export default function Target(props) {
    const randomPositionX = () => {
        const min = Math.ceil(70);
        const max = Math.floor(750);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const [x, setX] = useState(randomPositionX);
    const [y, setY] = useState(props.startPos.y);
    const [opac, setOpac] = useState(1);


    //calc when i need refresh
    const steps = (594 + 80) / props.speed;
    const maxY = 594 - (Math.round(steps) * props.speed);

    const styleBounty = {
        position: "absolute",
        top: y,
        left: x,
        opacity: opac
    }

    useEffect(() => start(), [])

    const start = () => {
        setY(594);
    }

    useEffect(() => {
        if (y > -80) {
            setOpac(1);
            const timeLeft = setTimeout(() => {
                setY(y - props.speed);
            }, 10);
            return () => clearTimeout(timeLeft);
        }

        if (y<-80) {
            // Destroy element
            props.removeTarget(props.key);
        }
    }, [y]);

    const clicked = () => {
        console.log("CLICKED");
    }
    return (
        <div style={{ position: "absolute", left: props.startPos.x, top: y }}>
            <button onClick={(e) => props.triggerClick(props.key)}>
                <Image
                    className="img"
                    key={props.key}
                    bordered
                    size="small"
                    src={props.image}
                />
            </button>

        </div>
    )
}
