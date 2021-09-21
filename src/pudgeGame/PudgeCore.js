import React, { useState, useEffect } from "react";
import { Segment, Container, Input, Image, Progress, Modal, Button, Label, Header } from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty1.png";
import hook from "./resources/img/hook.png";
import * as utils from "./utilits.js";
import { motion, useAnimation } from "framer-motion";
//Timer PUDGE TIDE CRYSTAL BOUNTY
import useArray from "./resources/hooks/useArray"
import Target from "./Target";
import useInterval from "./resources/hooks/useInterval.js";



const PudgeCore = () => {
    const [gameStarted, setGameStarted] = useState(false)

    //show/hide image
    const pudgeX = 50;
    const pudgeY = 85;
    const height = 700;

    const randomPositionX = () => {
        const min = Math.ceil(70);
        const max = Math.floor(750);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };


    const [isShowTimer, setIsShowTimer] = useState(false);
    const [isShowScore, setIsShowScore] = useState(false);
    const [isShowStartGame, setIsShowStartGame] = useState(true);
    const [shot, setShot] = useState("");
    const [color, setColor] = useState();

    const [time, setTime] = useState(101);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(5);
    //Random Position


    const startPosY = 595

    const stylePudge = {
        position: "absolute",
        top: `${pudgeY}%`,
        left: `${pudgeX}%`
    };

    const styleSegmentGameCore = {
        height: `${height}px`,
    };
    const styleP = {
        color: color,
        position: "absolute",
        top: "75%",
        left: "51%",
    }



    const possibleTargetType = [
        { image: crystal, effect: () => setScore(score + 15), name: "cm", },
        { image: tide, effect: () => setScore(score - 25), name: 'tide', },
        { image: bounty, effect: () => setTime(time + 10), name: 'bounty' },
    ]

    //fix To many render
    function throttle(fn, ms) {
        let timeout;
        function exec() {
            fn.apply()
        }
        function clear() {
            timeout = undefined ? null : clearTimeout(timeout)
        }
        if (fn !== undefined && ms !== undefined) {
            timeout = setTimeout(exec, ms)
        } else {
            console.error('callback function and the timeout must be supplied')
        }
        // API to clear the timeout
        throttle.clearTimeout = () => clear()
    }

    //timer 
    useEffect(() => {
        if (time !== 101) {
            if (time > 0) {
                const timeLeft = setTimeout(() => {
                    setTime(time - 3.33);
                    setSpeed(speed + 0.1);
                    setColor("white");
                    setShot("");
                }, 333);
                return () => clearTimeout(timeLeft);
            }
        } if (time <= 2) {
            setOpen(true);
            setIsShowScore(false);
            setIsShowTimer(false);
            setIsShowStartGame(true);
            setGameStarted(false);
        }
    }, [time, score, color, shot]);


    const { array: arrayJSXImages, set, push, remove, filter, update, clear } = useArray([])
    const spawnInterval = 1

    useInterval(() => {
        if (gameStarted) {
            const spawnImageJSX = () => {
                const newArray = possibleTargetType.map((targetType) => {
                    const min = Math.ceil(70);
                    const max = Math.floor(750);
                    const randomX = Math.floor(Math.random() * (max - min + 1)) + min;
                    const key = `${new Date().getTime()}`
                    const startPos = { x: randomX, y: startPosY }
                    return <Target
                        speed={speed}
                        key={key}
                        removeTarget={() => filter((item) => item.key !== key)}
                        image={targetType.image}
                        startPos={startPos}
                        triggerClick={() => {
                            filter((item) => item.key !== key)
                            targetType.effect();
                            hitDetected();
                        }}
                    />
                })
                var randomInt = Math.floor(Math.random() * newArray.length)
                return newArray[randomInt]
            }
            const imageToSpawn = spawnImageJSX()
            push(imageToSpawn)

        }
    }, spawnInterval * 1000)

    const hitDetected = () => {
        setColor("green");
        setShot("Попал!");
    }
    //can use className e.target.className
    const missedClick = (e) => {
        if (gameStarted) {
            if (e.target.nodeName == "DIV") {
                setScore(score - 1)
                setColor("red");
                setShot("Промах!");
            }
        }
    }

    //game

    const startGame = () => {
        setScore(0);
        setIsShowStartGame(false);
        setIsShowScore(true);
        setTime(100);
        setIsShowTimer(true);
        setGameStarted(true)
        setSpeed(5);

    }



    const gameOverModal = () => {
        return <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            dimmer="blurring"
        >
            <Modal.Header>GAME OVER</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={pudge} wrapped />
                <Modal.Description>
                    <h2>Игра окончена! Набрано очков: {score}</h2>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="violet" onClick={() => setOpen(false)}>Закрыть</Button>

            </Modal.Actions>
        </Modal>
    }

    return (
        <div >

            <Container style={{ marginTop: "5%" }} textAlign='center'>

                {isShowStartGame
                    ?
                    <div>
                        <Button onClick={startGame}> StartGame</Button>
                    </div>
                    : null}

            </Container>
            {isShowTimer
                ?
                <Segment>
                    <Progress percent={time} indicating />
                </Segment>
                : null}
            <Segment className="segment" onClick={(e) => missedClick(e)} color="violet" raised size="big" style={styleSegmentGameCore}>
                {isShowScore
                    ? <Label floating size="huge" circular color="violet">{score}</Label>
                    : null}
                <Header as='h1' size="big" style={styleP}>{shot}</Header>
                <Image bordered size="small" src={pudge} style={stylePudge} />
                {
                    arrayJSXImages.map((item) => {
                        // console.log('Trying to rencder item: ', item)
                        return item
                    })
                }
            </Segment>


            {gameOverModal()}
        </div>
    )
}
export default PudgeCore;