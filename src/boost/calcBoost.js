import react, { useState, useEffect } from "react";
import { Input, Button, Container, Grid, Image, Segment, Icon, Label } from 'semantic-ui-react';
import gerald from "../icons/140px-SeasonalRank1-1.png";
import straj from "../icons/140px-SeasonalRank2-1.png";
import rizar from "../icons/140px-SeasonalRank3-1.png";
import geroy from "../icons/140px-SeasonalRank4-1.png";
import legend from "../icons/140px-SeasonalRank5-1.png";
import ancient from "../icons/140px-SeasonalRank6-1.png";
import divine from "../icons/140px-SeasonalRank7-1.png";
import immortal from "../icons/SeasonalRankTop1.png";
import immortal2 from "../icons/SeasonalRankTop2.png";
import useClipboard from "react-use-clipboard";
import * as api from "../api";

//пока не найду вариант лучше
import Checkbox from '@material-ui/core/Checkbox';
//

const requstType = "Boost";


const BoostCalc = require('./logicBoost.js');


const CalcBoost = (props) => {

    const [boostCalc, setBoostCalc] = useState(null);
    const [discount, setDiscount] = useState(10);

    const [newValue, setNewValue] = useState(100);
    const [currentValue, setCurrentValue] = useState(0);
    const [flexValue, setFlexValue] = useState(100);
    const [result, setResult] = useState(0);
    const [cleanResult, setCleanResult] = useState(0);
    const [party, setParty] = useState(false);
    const [stream, setStream] = useState(false);
    const [heros, setHeros] = useState(false);
    const [rank, setRank] = useState(immortal);
    const [disp, setDisp] = useState("block");
    const [disp2, setDisp2] = useState("none");
    const [disp3, setDisp3] = useState("none");

    const [mobileGuard, setMobileGuard] = useState("none");
    const [emailGuard, setEmailGuard] = useState("none");
    const [inputResult, setInputResult] = useState("Ничего не выбрали");
    const [isCopied, setCopied] = useClipboard(inputResult);
    const [infoParty, setInfoParty] = useState("без пати");
    const [infoStream, setInfoStream] = useState("без стрима");
    const [infoHeros, setInfoHeros] = useState("без дополнительных героев");

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

    const partyCheckbox = () => {
        if (party === true) {
            setInfoParty("БЕЗ пати")
            return setParty(false);
        } else if (party === false) {
            setInfoParty("В пати")
            return setParty(true);
        }
    };
    const streamCheckbox = () => {
        if (stream === true) {
            setInfoStream("БЕЗ стрима")
            return setStream(false);
        } else if (stream === false) {
            setInfoStream("СО стримом")
            return setStream(true);
        }
    };
    const herosCheckbox = () => {
        if (heros === true) {
            setInfoHeros("БЕЗ дополнительных героев")
            return setHeros(false);
        } else if (heros === false) {
            setInfoHeros("С дополнительными героями")
            return setHeros(true);
        }
    };


    let importChange = () => {
        if (newValue < 7500) {
            return flexValue;
        } else if (newValue >= 7500) {
            return newValue - currentValue;
        }
    };

    const MinMaxStep = (current, last) => {
        if (last = 7500) {
            return last - current;
        } else {
            return "7500";
        }
    };

    const rankImage = () => {
        if (newValue < 600) return gerald;
        if (newValue < 1400) return straj;
        if (newValue < 2200) return rizar;
        if (newValue < 2900) return geroy;
        if (newValue < 3800) return legend;
        if (newValue < 4500) return ancient;
        if (newValue < 5500) return divine;
        if (newValue < 6500) return immortal;
        if (newValue < 7500) return immortal2;
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

    useEffect(() => {
        setBoostCalc(new BoostCalc(props.config));
    }, [props.config])

    useEffect(() => {
        console.log("props.config", props.config);
        setDiscount(+props.config.price_modificators.promocode);
        if (+currentValue + +flexValue <= 7500 && +currentValue > 0) {//пати стрим сервер и герои промокод
            throttle(() => {
                const { result, cleanResult } = boostCalc.calculate('RUB', +currentValue, +currentValue + +flexValue, party, stream, "SERVER", heros, promo)
                setResult(result);
                setCleanResult(cleanResult);
                setNewValue(+currentValue + +flexValue);
                setRank(rankImage);

                setInputResult(`Буст с ${currentValue} по ${newValue} | ${infoParty} | ${infoStream} | ${infoHeros} за ${cleanResult} рублей. Промокод: ${promo}`)
            }, 500);

        } else {
            setNewValue("ВВЕДИТЕ РЕЙТИНГ");
        }
    }, [currentValue, flexValue, newValue, stream, party, heros, rank, inputResult, promoSegTrue, props.config,     ]);

    const NextStep1 = () => {
        if (cleanResult !== 0) {
            props.handleStepChange(0)
            setDisp("none")
            setDisp2("block")
            setDisp3("none")
        } else {
            alert("Введите значения")
        }

    };
    const NextStep2 = () => {

        props.handleStepChange(1)
        setDisp2("none")
        setDisp("none")
        setDisp3("block")
    };
    const NextStep3 = () => {
        props.handleStepChange(2)
        window.open("https://vk.com/im?media=&sel=-187930680")
        api.sendRequest({
            currentValue, newValue, infoParty, infoStream, infoHeros, cleanResult, promo, requstType,
        })

    };
    const mobile = () => {
        setEmailGuard("none")
        setMobileGuard("block")
    }
    const email = () => {
        setEmailGuard("block")
        setMobileGuard("none")
    }


    return (
        <div>

            <Container style={{ display: disp }} textAlign="center">

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h3>ТЕКУЩИЙ РЕЙТИНГ</h3>
                            <Input size="large" type="text" maxLength="4" step="10" value={currentValue} onInput={(event) => setCurrentValue(event.target.value)} focus />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>+{flexValue}</p>
                            <input
                                type='range'
                                max={MinMaxStep(currentValue, newValue)}
                                min='100'
                                step="30"
                                value={importChange()}
                                onChange={(event) => { setFlexValue(event.target.value) }}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign="center" width={6}>
                            <h3 style={{paddingRight:"22%"}} >КОНЕЧНЫЙ РЕЙТИНГ</h3>
                            <Image  floated="right" size="tiny" src={rank} style={{marginTop:"-8%"}}/>
                            <Input fluid style={{textAlign:"20%"}} size="large" maxLength="4" max="7500" value={newValue} disabled focus />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Label
                                circular
                                onClick={partyCheckbox}
                                size="large"
                            >
                                <Checkbox
                                    checked={party}
                                    onClick={partyCheckbox}
                                    color="primary"
                                />
                                пати
                            </Label>
                            <Label
                                size="large"
                                circular
                                onClick={streamCheckbox}
                            >
                                <Checkbox
                                    checked={stream}
                                    onClick={streamCheckbox}
                                    color="primary"

                                />
                                стрим
                            </Label>
                            <Label
                                circular
                                onClick={herosCheckbox}
                                size="large"
                            >

                                <Checkbox
                                    checked={heros}
                                    onClick={herosCheckbox}
                                    color="primary"
                                />
                                герои
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Input
                            fluid
                                value={result}
                                icon='cart' 
                                iconPosition='left'
                                focus
                                label="Руб."
                                labelPosition="right"
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
                        <Grid.Column>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={NextStep1} color='violet'>Подготовить данные</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>

            <Container style={{ display: disp2 }} >
                <Segment textAlign="center">
                    <p>
                        <h3>Как нужно подготовить данные?</h3>
                        1. Подготовьте логин и пароль, чтобы было всё без ошибок <br>
                        </br>
                        2. Выберите какой аутентификатор у вас стоит, чтобы бустер смог войти в аккаунт.
                    </p>

                </Segment>
                <Segment textAlign="center">
                    <Button color="green" icon="mail" onClick={mobile}>
                        <Icon name="mobile alternate" />
                        Нужен код от телефона
                    </Button>
                    <Button color="yellow" onClick={email}>
                        <Icon name="mail" />
                        Нужен код от почты
                    </Button>
                </Segment>

                <Segment style={{ display: mobileGuard }} textAlign="center">
                    <p>
                        <h4>
                            Если у Вас стоит мобильный аутентификатор, то нужен постоянно код от мобильного приложения стим. <br></br>
                            И чтобы бустер не зависил от Вас, то можно сделать запасные коды Steam Guard.
                        </h4>
                        Сделать это довольно просто: <br></br>
                        1.Войдите в свой аккаунт Steam. <br></br>
                        2.В выпадающем меню под вашим логином в правом верхнем углу страницы выберите «Об аккаунте». <br></br>
                        3.Выберите «Настройка Steam Guard».<br></br>
                        4.Выберите «Получить запасные коды».<br></br>
                        5.Введите текущий код аутентификатора (или полученный ранее код восстановления).<br></br>
                    </p>
                </Segment>

                <Segment style={{ display: emailGuard }} textAlign="center">
                    <p>
                        <h4>
                            Если у вас стоит обычная защита steam guard, то есть чтобы войти в аккаунт нужен код от почты, то:
                        </h4>
                        По вашему желанию, вы можете выключить steam guard, чтобы бустер мог зайти в аккаунт не ожидая кода от почты. <br></br>
                        Спасибо
                    </p>
                </Segment>
                <Segment textAlign="center">
                    <Button onClick={NextStep2} color='violet'>Связаться со мной</Button>
                </Segment>

            </Container>

            <Container style={{ display: disp3 }} textAlign="center">
                <h2>Свяжитесь со мной</h2>
                <p>
                    Давайте всё проверим, если информация верна, то нажмите кнопку скопировать и отправьте это сообщение мне в группу Вконтакте! <br></br>
                    Нажав на кнопку  "Написать"
                </p>
                <Segment>
                    <h3>Ваш заказ:</h3>
                    <Input>
                        {inputResult}
                    </Input>

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
export default CalcBoost;