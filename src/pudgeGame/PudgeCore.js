import React, { useState, useEffect } from "react";
import { Segment, Container, Input, Image, Progress, Modal, Button, Label, Header, GridColumn, Grid } from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty1.png";
import useArray from "./resources/hooks/useArray"
import Target from "./Target";
import useInterval from "./resources/hooks/useInterval.js";
import * as api from '../api/index';
import PudgeLogo from "./pudgeLogo";


const PudgeCore = () => {
    const [gameStarted, setGameStarted] = useState(false)
    const [nickName, setNickName] = useState("");
    const [haveNick, setHaveNick] = useState("");
    const [nickTrigger, setNickTrigger] = useState(false);
    const [scroll, setScroll] = useState();


    const [scores, setScores] = useState([])

    // pudge XY in % and height that size game
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
        } if (time <= 0) {
            localStorage.setItem('score', score);
            setOpen(true);
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

        if (nickName !== "" && nickName !== null && nickName !== undefined && !nickTrigger) {
            setHaveNick(true);
            localStorage.setItem('isHaveNick', haveNick);
            localStorage.setItem('nickName', nickName);
        }
        if (!nickTrigger) {
            setHaveNick(localStorage.getItem(("isHaveNick")));
            setNickName(localStorage.getItem("nickName") || "")
        }


    }, [haveNick, score, nickTrigger]);
    const saveNick = (e) => {
        if (e.type === "click")
            setHaveNick(true);
        localStorage.setItem('isHaveNick', haveNick);
        localStorage.setItem('nickName', nickName);
        if (e.type === "keypress" && e.code === "Enter")
            setHaveNick(true);
        localStorage.setItem('isHaveNick', haveNick);
        localStorage.setItem('nickName', nickName);
    }

    const changeNick = () => {
        setNickTrigger(true);
        setHaveNick(false);
        localStorage.removeItem("isHaveNick");
        localStorage.removeItem("nickName");
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
        return scores.map((value, index) => {
            return <div>{index + 1}. {value.nickname} : {value.score} очков</div>
        })
    }
    const onScroll = e => {
        setScroll(e.target.scroll);
        console.log(window.scrollY);
    }
    return (
        <div >
            <Grid>
                <GridColumn width={3}>
                    <Segment style={{ height: "250px" }} size="huge">
                        Реклама
                    </Segment>
                    <Segment style={{ height: "250px" }} size="huge">
                        Реклама
                    </Segment>
                    <Segment style={{ height: "250px" }} size="huge">
                        Реклама
                    </Segment>
                </GridColumn>
                <GridColumn width={10}>
               
                    <Container style={{ marginTop: "5%" }} textAlign='center'>
                    <Segment compact>
                    <Header color="purple"  as="h3">Пьюдж Варс</Header>
                    <PudgeLogo />
                    </Segment>                
                        {haveNick
                            ?
                            <div>
                                <Header as="h3">Ваш никнейм: {nickName}</Header>
                                <Button compact circular style={{ marginBottom: "1%" }} color="purple" onClick={changeNick}>Изменить никнейм</Button>
                            </div>
                            : <div onKeyPress={(e) => saveNick(e)}>
                                <Header as="h3">Введите никнейм:</Header>
                                <Input type="text" value={nickName} onChange={e=>setNickName(e.target.value)} />
                                <Button onClick={(e) => saveNick(e)}>Сохранить</Button>
                            </div>
                        }
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
                </GridColumn>
                <GridColumn width={3}>
                    <Segment style={{ height: "250px" }} size="huge">
                        Реклама
                    </Segment>
                    <Segment color="violet" raised size="big">
                        <Header textAlign="center">ТОП 5 МЕСЯЦА:</Header>
                        <p>{renderLeaders()}</p>
                    </Segment>
                    <Segment color="violet" raised size="big">
                        <Header textAlign="center">Последняя игра:</Header>
                        <p>{nickName} : {score === 0 ? localStorage.getItem("score") : score}</p>
                    </Segment>
                    <Segment style={{ height: "250px" }} size="huge">
                        Реклама
                    </Segment>
                </GridColumn>
            </Grid>
            {gameOverModal()}
        </div>
    )
}
export default PudgeCore;