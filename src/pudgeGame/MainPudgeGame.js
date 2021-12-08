import React, { useState, useEffect } from "react";
import PudgeCore from "./PudgeCore";
import { Grid, Image, Segment, Header, Button, Input, Container } from 'semantic-ui-react'
import * as api from '../api/index';
import Tutorial from "./Tutorial";
import PudgeLogo from "./PudgeLogo";


const MainPudgeGame = () => {
    const [score, setScore] = useState(0);
    const [scores, setScores] = useState([])


    const [nickName, setNickName] = useState("");
    const [haveNick, setHaveNick] = useState("");
    const [nickTrigger, setNickTrigger] = useState(false);

    //nickName
    useEffect(() => {
        if (nickName !== "" && nickName !== null && nickName !== undefined && !nickTrigger) {
            setHaveNick(true);
            localStorage.setItem('isHaveNick', haveNick);
            localStorage.setItem('nickName', nickName);
        }
        if (!nickTrigger) {
            setHaveNick(localStorage.getItem(("isHaveNick")));
            setNickName(localStorage.getItem("nickName") || "")
        }
    }, [haveNick, nickTrigger]);

    const saveNick = (e) => {
        if (e.type === "click" || (e.type === "keypress" && e.code === "Enter")) {
            setHaveNick(true);
            localStorage.setItem('isHaveNick', haveNick);
            localStorage.setItem('nickName', nickName);
        }
    }

    const changeNick = () => {
        setNickTrigger(true);
        setHaveNick(false);
        localStorage.removeItem("isHaveNick");
        localStorage.removeItem("nickName");
    }

    //scores send 
    const sendScore = () => {
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
    useEffect(() => {
        api.getScores((result) => {
            setScores(result.array)
        })

    }, [score]);


    const renderLeaders = () => {
        return (scores !== undefined)
            ? scores.map((value, index) => {
                return <div>{index + 1}. {value.nickname} : {value.score} очков</div>
            })
            : <div></div>
    }



    return (
        <div>
            <Grid>
                <Grid.Column width={3}>
                <Segment size="big">             
                        <PudgeLogo style={{ left: '50%', top: "30%", position: "absolute" }} />
                    </Segment>
                    <Segment color="violet" raised size="big" style={{ marginTop: "3%" }} textAlign="center">
                        {haveNick
                            ?
                            <div>
                                <Header as="h3">Ваш никнейм: {nickName}</Header>
                                <Button compact circular style={{ marginBottom: "1%" }} color="purple" onClick={changeNick}>Изменить никнейм</Button>
                            </div>
                            : <div onKeyPress={(e) => saveNick(e)}>
                                <Header as="h3">Введите никнейм:</Header>
                                <Input type="text" value={nickName} onChange={e => setNickName(e.target.value)} />
                                <Button onClick={(e) => saveNick(e)}>Сохранить</Button>
                            </div>
                        }
                    </Segment>
                    <Segment size="big">
                        <Tutorial />
                    </Segment>
             
                </Grid.Column>

                <Grid.Column width={10}>
                    <PudgeCore nickName={nickName} score={score} setScore={setScore} sendScore={sendScore} />
                </Grid.Column>

                <Grid.Column width={3}>
                    <Segment color="violet" raised size="big">
                        <Header textAlign="center">ТОП 5 МЕСЯЦА:</Header>
                        <p>{renderLeaders()}</p>
                    </Segment>

                    <Segment color="violet" raised size="big">
                        <Header textAlign="center">Последняя игра:</Header>
                        <p>{nickName} : {score === 0 ? localStorage.getItem("score") : score}</p>
                    </Segment>
                </Grid.Column>





            </Grid>
        </div>
    )
}
export default MainPudgeGame;