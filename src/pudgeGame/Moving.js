import React, { useState, useEffect } from "react";

import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty.png";

import { Segment, Container, Input, Image, Progress, Modal, Button, Label } from 'semantic-ui-react'

const Moving = () => {
    


    // style={{position: "absolute", top:startPos.y, left: startPos.x}}
    //onClick={(e)=> objectType.effect}
    const spawnImage = (objectType) => {
        return (
            <Image src={objectType.image} onClick={(e) => objectType.effect(e)}>111</Image>
        )
    }

    const randomPositionX = () => {
        const min = Math.ceil(70);
        const max = Math.floor(750);
        return Math.floor(Math.random() * (max - min + 1)) + min;

    };

    //Random Position
    const [positionX, setPositionX] = useState(randomPositionX);
    const [positionY, setPositionY] = useState(595);

    const startPos = { x: positionX, y: positionY }

    const possibleScreenObjects = ['cm', 'tide', 'bounty']

    
    const [time, setTime] = useState(101);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0);
    
    const addPoints = (e) => {
        setScore(score + 15)
        console.log(score);
    }
    const spawnInterval = 1



    const startGame = () => {
        setInterval(() => {
            possibleScreenObjects.foreach((object) => {
                var randomInt = Math.floor(Math.random() * 2) // 0/1
                if (randomInt == 1)
                    spawnImage(objectType[object], startPos)
            })
        }, spawnInterval*1000)
    }

    const objectType = {
        'cm': { image: crystal, effect: ()=>addPoints()},
        'tide':  { image: tide, effect: ()=>setScore(score-15)},
        'bounty': { image: bounty,  effect: ()=>setTime(time+10)}
    }

    useEffect(() => {
        setInterval(() => {
            possibleScreenObjects.forEach((object) => {
                var randomInt = Math.floor(Math.random() * 2) // 0/1
                if (randomInt == 1)
                    spawnImage(objectType[object], startPos)
            })
        }, spawnInterval*1000)
    }, );

    return (
        <div>
            123
            {spawnImage(objectType)}
        </div>
    )
}

export default Moving;
