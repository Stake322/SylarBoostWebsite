import React, { useState, useEffect } from "react";
import { Segment, Container, Input, Image, Progress, Modal, Button, Label, Header, GridColumn, Grid } from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty1.png";
import useArray from "./resources/hooks/useArray"
import Target from "./Target";
import useInterval from "./resources/hooks/useInterval.js";
import * as api from '../api/index'


const PudgeCore = () => {
    const [gameStarted, setGameStarted] = useState(false)
    const [nickName, setNickName] = useState("");
    const [haveNick, setHaveNick] = useState("");

    const [scores, setScores] = useState([])

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

    useEffect(() => {
        console.log('Scores changed:', scores);
    }, [scores])

    //timer 
    useEffect(() => {
        if (gameStarted) {
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
            api.sendNewScore(nickName, score, (result, err) => {
                if (result) {
                    console.log('sendNewScore result:', result);
                    if (result.data) {
                        const parsedResult = JSON.parse(result.data)
                        setScores(parsedResult.array)
                    }
                } else {
                    console.log('err: ', err);
                }
            })
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

    //localstorage
    useEffect(() => {
        api.getScores((result) => {
            console.log('Will set new scores:', result.array);
            setScores(result.array)
        })

        if (nickName !== "" && nickName !== null && nickName !== undefined) {
            setHaveNick(true);
            localStorage.setItem('isHaveNick', haveNick);
            localStorage.setItem('nickName', nickName);
        }
       
        setHaveNick(localStorage.getItem(("isHaveNick")));

        setNickName(localStorage.getItem("nickName") || "")
    }, [haveNick]);


    const saveNick = (e) => {
        if (e.type === "click")
            setHaveNick(true);
        if (e.type === "keypress" && e.code === "Enter")
            setHaveNick(true);
    }

    const handleChange = (e)=>{
        setNickName(e.target.value);
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

    const renderLeaders = () => {
        return scores.map((value) => {
            return <div>|{value.nickname} : {value.score}|</div>
        })
    }

    return (
        <div >
            <p>Jou `${renderLeaders()}`</p>
            <p>НИКИЧ:{nickName} ОЧКО: {score}</p>
            <Container style={{ marginTop: "5%" }} textAlign='center'>
                {haveNick
                    ?
                    <Header as="h3">Ваш никнейм: {nickName}</Header>
                    : <div onKeyPress={(e) => saveNick(e)}>
                        <Header as="h3">Введите никнейм:</Header>
                        <Input type="text" value={nickName} onChange={handleChange} />
                        <Button onClick={(e) => saveNick(e)}>Сохранить</Button>
                    </div>
                }
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
                <Header as='h1' style={styleP}>{shot}</Header>
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