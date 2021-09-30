import React, { useState, useEffect } from "react";
import { Segment, Container, Image, Progress, Modal, Button, Label, Header} from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty1.png";
import useArray from "./resources/hooks/useArray"
import Target from "./Target";
import useInterval from "./resources/hooks/useInterval.js";


const PudgeCore = ({ nickName, score, setScore, sendScore }) => {
    const [gameStarted, setGameStarted] = useState(false)

    // pudge XY in % and height that size game
    const pudgeX = 50;
    const pudgeY = 85;
    const height = 700;

    const [isShowTimer, setIsShowTimer] = useState(false);
    const [isShowScore, setIsShowScore] = useState(false);
    const [isShowStartGame, setIsShowStartGame] = useState(true);
    const [shot, setShot] = useState("");
    const [color, setColor] = useState();

    const [time, setTime] = useState(101);
    const [open, setOpen] = useState(false);
    const [speed, setSpeed] = useState(5);

    const startPosY = 595;
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

    //timer 
    useEffect(() => {
        if (gameStarted) {
            if (time > 0) {
                const timeLeft = setInterval(() => {
                    setTime(time - 1);
                    setSpeed(speed + 0.04);
                    setColor("white");
                    setShot("");
                }, 100);
                return () => clearTimeout(timeLeft);
            }
        } if (time <= 0) {
            localStorage.setItem('score', score);
            setOpen(true);
            setIsShowTimer(false);
            setIsShowStartGame(true);
            setGameStarted(false);
            sendScore();

        }
    }, [time, score, color, shot]);

    const { array: arrayJSXImages, set, push, remove, filter, update, clear } = useArray([]);
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
                        triggerClick={(x, y) => {
                            filter((item) => item.key !== key)
                            targetType.effect();
                            hitDetected()
                        }}

                    />
                })
                var randomInt = Math.floor(Math.random() * newArray.length)
                return newArray[randomInt]
            }
            const imageToSpawn = spawnImageJSX()
            push(imageToSpawn)

        }
    }, spawnInterval * 1000);

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
                        <Button positive onClick={startGame}>Начать игру</Button>
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
                <Header as='h1' style={styleP}>{shot}</Header>
                <Image bordered size="small" src={pudge} style={stylePudge} />
                {
                    arrayJSXImages.map((item) => item)
                }
            </Segment>
            {gameOverModal()}
        </div>
    )
}
export default PudgeCore;