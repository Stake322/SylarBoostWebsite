import react, { useState, useEffect } from "react";
import { Input, Dropdown, Grid, Button, Container, Segment, Icon } from 'semantic-ui-react';

import straj from "../icons/140px-SeasonalRank2-1.png";

import geroy from "../icons/140px-SeasonalRank4-1.png";
import legend from "../icons/140px-SeasonalRank5-1.png";
import ancient from "../icons/140px-SeasonalRank6-1.png";
import divine from "../icons/140px-SeasonalRank7-1.png";
import immortal from "../icons/SeasonalRankTop1.png";
import immortal2 from "../icons/SeasonalRankTop2.png";
import unranked from "../icons/SeasonalRank0-0.png";
import useClipboard from "react-use-clipboard";
import * as api from "../api";


const requstType = "coach";


const options = [
    { key: '1', text: 'БЕЗ РЕЙТИНГА', value: 'без рейтинга', image: unranked },
    { key: '2', text: '1-2000', value: 'меньше 2000', image: straj },
    { key: '3', text: '2000-3000', value: '2000-3000', image: geroy },
    { key: '4', text: '3000-4000', value: '3000-4000', image: legend },
    { key: '5', text: '4000-5000', value: '4000-5000', image: ancient },
    { key: '6', text: '5000-5500', value: 'около 5500', image: divine },
    { key: '7', text: '5500-6000', value: 'около 6000', image: immortal },
    { key: '8', text: '6000-6500', value: 'около 6500', image: immortal },
    { key: '9', text: '6500-7000', value: 'около 7000', image: immortal2 },
    { key: '10', text: '7000-7500', value: 'около 7500', image: immortal2 },
]

// const config = require('./config.json');
const prices = [999,1800,2500]

//TODO: Refactor as in a ./CalcBoost.js
const Coach = (props) => {
    const [discount, setDiscount] = useState(10);
    const [currentValue, setCurrentValue] = useState(0);
    const [result, setResult] = useState(0);
    const [count, setCount] = useState(1);
    const [hours, setHours] = useState("Часов");
    const [disp1, setDisp1] = useState("block");
    const [disp2, setDisp2] = useState("none");
    const [disp3, setDisp3] = useState("none");
    const [inputResult, setInputResult] = useState("Ничего не выбрали");
    const [isCopied, setCopied] = useClipboard(inputResult);
    const [dispSegment, setDispSegment] = useState("none");


    const [promo, setPromo] = useState("");
    const [promoSegTrue, setPromoSegTrue] = useState("none");
    const [promoSegFalse, setPromoSegFalse] = useState("none");


    const checkPromo = () => {
        if (props.config.promocodes.includes(promo)) {
            setPromoSegTrue("block")
            setPromoSegFalse("none")
            return promo
        } else if (props.config.promocodes.includes(promo) === false && (promo !== "")) {
            setPromoSegTrue("none");
            setPromoSegFalse("block");
            return "без промокода"
        } else {
            setPromoSegTrue("none");
            setPromoSegFalse("none");
            return ""
        }
    }

    const NextStep1 = () => {
        if (currentValue!== 0) {
            setDisp1("none");
            setDisp2("block");
            props.handleStepChange(0);
            props.handleStepChange(0)
        } else {
            alert("Выберите ММР")
        }
       
   
    }
    const NextStep3 = () => {
        setDisp1("none");
        setDisp2("block");
        props.handleStepChange(1);
        props.handleStepChange(2);
        window.open("https://vk.com/im?media=&sel=-187930680")
        api.sendRequest({
            currentValue, count, result, promo, requstType
        })

    }
    const FunPay = () => {
        window.open("https://funpay.ru/users/1085056/")
    }
    const VK = () => {
        window.open("https://vk.com/topic-187930680_41834234");
    }
    function SegmentInfo() {
        if (dispSegment == "none") {
            setDispSegment("block")
        } if (dispSegment == "block") {
            setDispSegment("none")
        }
    }


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
        throttle.clearTimeout = function () {
            clear();
        }
    }
    ////лучше логику
    const CoachCalc = () => {
        if (props.config.promocodes.includes(promo)) {
            if (count == 1) return prices[count-1]*(1-discount/100);
            else if (count == 2) return prices[count-1]*(1-discount/100)
            else if (count == 3) return prices[count-1]*(1-discount/100)
            else return "Выберите количество часов";
        } else { /// без скидки
            if (count == 1) return prices[count-1]
            else if (count == 2) return prices[count-1]
            else if (count == 3) return prices[count-1]
            else return "Выберите количество часов";
        }
    }
    const hoursCalc = () => {
        if (count == 1) return "Час";
        else if (count >= 2) return "Часа";
        else return "Не выбрано";
    }

    useEffect(() => {
        setDiscount(+props.config.price_modificators.promocode); 
        throttle(() => {
            setResult(CoachCalc);
            setHours(hoursCalc);
            setPromo(checkPromo);
            setInputResult(`Обучение на ${count} ${hours} за ${result} рублей. У вас ${currentValue} ММР. ПРОМОКОД: ${promo}`)
        }, 500);
    }, [currentValue, count, result, hours, dispSegment, promoSegTrue, discount]);


    return (

        <div>
            <Container style={{ display: disp1 }}>

                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign="center" width={10}>
                            <h3>ВЫБЕРИТЕ ТЕКУЩИЙ ММР</h3>
                            <Dropdown
                                placeholder='Выберите ваш ММР'
                                fluid
                                selection
                                defaultValue="0"
                                options={options}
                                onChange={(e, { value }) => setCurrentValue(value)}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h3>СКОЛЬКО ЧАСОВ БУДЕТ ЗАНЯТИЕ</h3>
                            <Input action={{
                                color: 'teal',
                                labelPosition: 'right',
                                icon: 'time',
                                content: `${hours}`,
                            }}
                                actionPosition='right'
                                defaultValue={count}
                                value={count}
                            >
                            </Input>
                            <input
                                fontSize="130%"
                                type='range'
                                max="3"
                                min='1'
                                step="1"
                                value={count}
                                onChange={(event) => { setCount(event.target.value) }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="center">
                        <Grid.Column width={10}>
                            <Input
                                value={result}
                                action={{
                                    color: 'teal',
                                    labelPosition: 'left',
                                    icon: 'cart',
                                    content: 'ЦЕНА',
                                }}
                                actionPosition='left'
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>

                            <Input
                                size="small"
                                onChange={(event) => setPromo(event.target.value)}
                                placeholder="Введите промокод"
                                value={promo}
                                onClick={checkPromo}
                            />
                            <Button size="tiny" onClick={checkPromo} color="green" >
                                Проверить
                            </Button>

                            <Segment style={{ display: promoSegTrue }} size="">
                                Промокод {promo} введён успешно <Icon name="check" /> СКИДКА {discount} %
                            </Segment>
                            <Segment style={{ display: promoSegFalse }} size="">
                                Вы ввели неправильно промокод <Icon name="x" />
                            </Segment>
                        </Grid.Column>
                        <Button style={{ marginTop: "5%", marginLeft: "auto", marginRight: "auto" }} onClick={NextStep1} textAlign="center" color='violet'>Продолжить</Button>
                    </Grid.Row>

                </Grid>
            </Container>


            <Container style={{ display: disp2 }} textAlign="center">
                <h2>Свяжитесь со мной</h2>
                <p>
                    Давайте всё проверим, если информация верна, то нажмите кнопку "скопировать" и отправьте это сообщение мне в группу Вконтакте! <br></br>
                    Нажав на кнопку  "Написать"
                </p>
                <Segment>
                    <h3>Ваш заказ:</h3>
                    <Input>
                        {inputResult}
                    </Input> <br></br>
                    <Button icon="play" onClick={SegmentInfo} >Информация о тренировке</Button>
                    <Segment style={{ display: dispSegment }}>
                        <h4>Для того чтобы тренировка прошла максимально эфективно нужно подготовить:</h4> <br></br>
                        1. Реплеи вашей игры <br></br>
                        2. Как можно больше вопросов <br></br>
                        Цель обучения это сделать так, чтобы Вы стали лучше понимать как играть в доту 2. <br></br>
                        1) Лейнинг стадия, как нужно правильно стоять лайн, чтобы потом можно было выиграть игру.<br></br>
                        2) Середина игры, где себя найти на карте, где фармить и так далее.<br></br>
                        3) Айтем и скилл билды, максимально оптимальные для победы.<br></br>
                        4) Разберём 2-3 ваших реплея игры, укажу на хорошие или плохие моменты.<br></br>
                        После тренировки вы почувствуете результат уже в первой игре. <br></br>
                        Если у вас остаются какие-либо вопросы после тренировки - вы всегда можете их задавать, консультации после обучения абсолютно бесплатны.<br></br>
                        Многие кто заказывал обучение, очень довольны, т.к. после него появилось много побед. <br></br>
                        <h3>Отзывы можно посмотреть здесь</h3>
                        <Button color="blue" onClick={FunPay}>FunPay</Button> <Button color="vk" onClick={VK}>Группа вКонтакте</Button>
                    </Segment>
                </Segment>
                <Button onClick={setCopied}>
                    Нужно скопировать :  {isCopied ? "Копирование прошло успешно! 👍" : "Еще не скопировал! 👎"}
                </Button>

                <Button type="button" name="submit  " onClick={NextStep3}  >
                    Написать
                </Button>
            </Container>
        </div>
    )

}
export default Coach;