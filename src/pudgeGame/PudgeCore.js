import React, { useState, useEffect } from "react";
import { Segment, Container, Input, Image, Progress, Modal, Button, Label } from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty.png";
import hook from "./resources/img/hook.png";

//Timer PUDGE TIDE CRYSTAL BOUNTY

const PudgeCore = () => {
    //show/hide image
    const [isShowTide, setIsShowTide] = useState(false);
    const [isShowCrystal, setIsShowCrystal] = useState(false);
    const [isShowBounty, setIsShowBounty] = useState(false);
    const [isShowTimer, setIsShowTimer] = useState(false);
    const [isShowScore, setIsShowScore] = useState(false);
    const [isShowStartGame, setIsShowStartGame] = useState(true);

    const [time, setTime] = useState(101);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [angle, setAngle] = useState(0);

    //Random Position
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [hookX, setHookX] = useState(50);
    const [hookY, setHookY] = useState(65);


    const randomPositionX = () => {
        const x = Math.floor((Math.random() * 100));
        if (x < 75) {
            return x;
        } else {
            return 70;
        }
    };
    const randomPositionY = () => {
        const y = Math.floor((Math.random() * 100));
        if (y < 70) {
            return y;
        } else {
            return 70;
        }
    };

    const stylePudge = {
        position: "absolute",
        top: "75%",
        left: "50%"
    };
    const styleTide = {
        position: "absolute",
        top: `${positionY}%`,
        left: `${positionX}%`,
    };

    const styleCrystal = {
        position: "absolute",
        top: `${positionY}%`,
        left: `${positionX}%`,
    };
    const styleBounty = {
        position: "absolute",
        top: `${positionY}%`,
        left: `${positionX}%`,
    };
    const styleSegmentGameCore = {
        weight: "700px",
        height: "700px",
        // backgroundColor: "red"
    };


    const calcAngle = (x, y) => {
        // posX pudge - posX tide = A B = sqrt(a^2+c^2)// 
        let A = x - 50;
        let Y = y - 75;
        let B = Math.sqrt(A * A + Y * Y);
        let sin = A / B;
        setAngle((Math.asin(sin) / Math.PI) * 180)

    }
    const styleHook = {
        position: "absolute",
        transform: `rotate(${angle}deg)`,
        top: `${hookY}%`,
        left: `${hookX}%`,
    };


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

        if (time !== 101) {
            if (time > 0) {
                const timeLeft = setTimeout(() => {
                    setTime(time - 3, 33);
                }, 333);
                return () => clearTimeout(timeLeft);
            }
        } if (time <= 2) {
            setOpen(true);
            setIsShowScore(false);
            setIsShowTide(false);
            setIsShowTimer(false);
            setIsShowBounty(false);
            setIsShowCrystal(false);
            setIsShowStartGame(true);
        }


    }, [time]);

    useEffect(() => {

        throttle(() => {
        }, 500);
        if (time !== 101) {
            if (time > 0) {
                let stepX = (positionX - hookX) / 2;
                let stepY = (positionY - hookY) / 2;
                const changePositionHook = setTimeout(() => {
                    setHookX(hookX + stepX);
                    setHookY(hookY + stepY);
                }, 200);
                return () => clearTimeout(changePositionHook);
            }
        }

    }, [time, positionX, positionY]);


    //game
    const startGame = () => {
        setScore(0);
        setIsShowStartGame(false);
        setIsShowScore(true);
        setTime(100);
        setIsShowTimer(true);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowTide(true);

    }

    const TideClick = () => {
        setIsShowTide(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowCrystal(true);
        setScore(score - 20);
        calcAngle(positionX, positionY);

    }
    const CrystalClick = () => {
        setIsShowCrystal(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowBounty(true);
        setScore(score + 15);
        calcAngle(positionX, positionY);


    }
    const BountyClick = () => {
        setIsShowBounty(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowTide(true);
        setTime(time + 10);
        calcAngle(positionX, positionY);

    }

    return (
        <div>



            <Container textAlign='center'>
                {/* <Input placeholder="enter NICKNAME" />
                <button> Save</button> */}
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
            <Segment color="violet" raised size="big" style={styleSegmentGameCore}>
                {isShowScore
                    ?
                    <Label floating="right" size="huge" circular color="violet">{score}</Label>
                    : null}
                <Image size="small" src={pudge} style={stylePudge} />
                {isShowTide
                    ? <Image circular onClick={TideClick} size="small" src={tide} style={styleTide} />
                    : null}
                {isShowCrystal
                    ? <Image circular onClick={CrystalClick} size="small" src={crystal} style={styleCrystal} />
                    : null}
                {isShowBounty
                    ? <Image circular onClick={BountyClick} size="small" src={bounty} style={styleBounty} />
                    : null}
                {false
                    ?
                    <Image size="small" style={styleHook} src={hook} />
                    : null}

            </Segment>


            <Modal
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



        </div>
    )
}
export default PudgeCore;