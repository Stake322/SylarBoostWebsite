import React, { useState, useEffect } from "react";
import { Segment, Container, Input, Image, Progress, Modal, Button, Label } from 'semantic-ui-react'
import pudge from "./resources/img/pudge.png";
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty.png";
import hook from "./resources/img/hook.png";
import * as utils from "./utilits.js";
// import Moving from "./Moving";
import { motion, useAnimation } from "framer-motion";
//Timer PUDGE TIDE CRYSTAL BOUNTY





const PudgeCore = () => {
    //animated
    const control = useAnimation();

    //show/hide image
    const pudgeX = 50;
    const pudgeY = 85;
    const height = 700;





    const [isShowTide, setIsShowTide] = useState(false);
    const [isShowCrystal, setIsShowCrystal] = useState(false);
    const [isShowBounty, setIsShowBounty] = useState(false);
    const [isShowTimer, setIsShowTimer] = useState(false);
    const [isShowScore, setIsShowScore] = useState(false);
    const [isShowStartGame, setIsShowStartGame] = useState(true);
    
    const [textX, setTestX] = useState(0);
    const [textY, setTestY] = useState(0);


    const [moveX, setMoveX] = useState((height * pudgeX / 1000) + 2.5);
    const [moveY, setMoveY] = useState(pudgeY * height / 100);

    const [time, setTime] = useState(101);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [angle, setAngle] = useState(0);

    //Random Position
    const [positionX, setPositionX] = useState(0);
    const [positionY, setPositionY] = useState(0);
    const [hookX, setHookX] = useState(50);
    const [hookY, setHookY] = useState(80);


    const randomPositionX = () => {
        // const x = Math.floor((Math.random() * 100));
        // if (x < 75) {
        //     return x;
        // } else {
        //     return 70;
        // }
        setTestX(textX+1);
        return textX;
    };
    const randomPositionY = () => {
        // const y = Math.floor((Math.random() * 100));
        // if (y < 70) {
        //     return y;
        // } else {
        //     return 70;
        // }
        setTestY(textY+1);
        return textY;
    };

    const stylePudge = {
        position: "absolute",
        top: `${pudgeY}%`,
        left: `${pudgeX}%`
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
        height: `${height}px`
        // backgroundColor: "red"
    };



    // const calcXY = (x, y) => {
    //     // setMoveX(x * height / 1000 + 2.5);
    //     // setMoveY(y * height / 100);
    //     let A = x - pudgeX;
    //     let Y = y - pudgeY;
    //     let B = Math.sqrt(A * A + Y * Y);
    //     console.log("B:", B);
    //     let sin = (Y / B);
    //     if (x < 50) {
    //         setAngle(-((Math.asin(sin) / Math.PI) * 180));
    //     } else setAngle(((Math.asin(sin) / Math.PI) * 180));
        
    // }
    const styleHook = {
        position: "absolute",
        transform: `rotate(${angle}grad)`,
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
                    // setTime(time - 3, 33);
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
                const changePositionHook = setTimeout(() => {
                    control.start({
                        // x: `${moveX}%`,
                        // y: `${moveY}%`,
                        rotate: `${angle}grad`,
                        // scale: 2,
                        transition: {
                            // duration: 2,
                            
                        }
                    })
                }, 0);
                return () => clearTimeout(changePositionHook);
            }
        }

    }, [time, positionX, positionY, moveY, moveX, angle]);


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
        control.start({
            x: `${moveX}vw`,
            y: moveY - 50,
            transition: {
                duration: 2,
            }
        })

    }

    const TideClick = () => {
        setIsShowTide(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowCrystal(true);
        setScore(score - 20);
        // calcXY(positionX, positionY)
        const start = utils.start(pudgeX,pudgeY,positionX,positionY,200,height);
        setAngle(start.a);
        setMoveX(positionX);
        setMoveY(positionY);



    }
    const CrystalClick = () => {
        setIsShowCrystal(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowBounty(true);
        setScore(score + 15);
        // calcXY(positionX, positionY)




    }
    const BountyClick = () => {
        setIsShowBounty(false);
        setPositionX(randomPositionX);
        setPositionY(randomPositionY);
        setIsShowTide(true);
        setTime(time + 10);
        // calcXY(positionX, positionY)


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
                {true
                    ?
                    // <Image size="small" style={styleHook} src={hook} />
                    <motion.img src={hook}
                        animate={control}
                        style={{ width: "200px" }} />
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