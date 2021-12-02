import React, { useState, useEffect } from "react";
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

// Util I find a good checkbox 
import Checkbox from '@material-ui/core/Checkbox';

//TODO: Move to parent
const requstType = "Boost";
const BoostCalc = require('./logicBoost.js');


const CalcBoost = (props) => {
    const [step, setStep] = useState(1)
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

    const [mobileGuard, setMobileGuard] = useState(false);
    const [emailGuard, setEmailGuard] = useState(false);

    const [inputResult, setInputResult] = useState("Ничего не выбрали");
    const [isCopied, setCopied] = useClipboard(inputResult);
    const [infoParty, setInfoParty] = useState("без пати");
    const [infoStream, setInfoStream] = useState("без стрима");
    const [infoHeros, setInfoHeros] = useState("без дополнительных героев");

    const [promo, setPromo] = useState("");
    const [promoSegment, setPromoSegment] = useState(0);


    const checkPromo = () => {
        if (props.config.promocodes.includes(promo)) {
            setPromoSegment(1);
            return promo
        } else if (props.config.promocodes.includes(promo) === false && (promo !== "")) {
            setPromoSegment(2);
            return "без промокода"
        } else {
            setPromoSegment(0);
            return ""
        }
    }

    // --- Calculate Checkboxes values ---
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

    // --- Calculate slider value ---
    let importChange = () => {
        if (newValue < 7500) {
            return flexValue;
        } else if (newValue >= 7500) {
            return newValue - currentValue;
        }
    };

    const minMaxStep = (current, last) => {
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
        throttle.clearTimeout = () => clear()
    }

    useEffect(() => {
        setBoostCalc(new BoostCalc.default(props.config));
    }, [props.config])

    useEffect(() => {
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

        } else setNewValue("ВВЕДИТЕ РЕЙТИНГ");
    }, [currentValue, flexValue, newValue, stream, party, heros, rank, inputResult, promoSegment, props.config]);

    const nextStep1 = () => {
        if (cleanResult !== 0) {
            props.handleStepChange(0)
            setStep(2)
        } else alert("Введите значения")
    };
    const nextStep2 = () => {
        props.handleStepChange(1)
        setStep(3)
    };
    const nextStep3 = () => {
        props.handleStepChange(2)
        window.open("https://vk.com/im?media=&sel=-187930680")
        api.sendRequest({
            currentValue, newValue, infoParty, infoStream, infoHeros, cleanResult, promo, requstType,
        })
    };
    const mobile = () => {
        setEmailGuard(false)
        setMobileGuard(true)
    }
    const email = () => {
        setEmailGuard(true)
        setMobileGuard(false)
    }

    let Font = "";
    if (props.Mobile) {
        Font = "150%"
    } else {
        Font = "100%"
    }

    return (
        <div>
            {step === 1
                ?
                <Container textAlign="center">
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={props.Mobile ? 5 : 6}>
                                <h3 style={{ fontSize: Font }}>ТЕКУЩИЙ РЕЙТИНГ</h3>
                                <Input type="number" maxLength="4" step="10" value={currentValue} onInput={(event) => setCurrentValue(event.target.value)} focus style={{ width: "100%" }} />
                            </Grid.Column>
                            <Grid.Column width={props.Mobile ? 6 : 4}>
                                <p>Всего ммр добавить: +{flexValue}</p>
                                {props.Mobile ?
                                    <div>
                                        <Button size="tiny" positive content="+100" onClick={(event) => setFlexValue(flexValue + 100)} style={{ fontSize: Font }} />
                                        <Button size="tiny" negative content="-100" onClick={(event) => setFlexValue(flexValue - 100)} style={{ fontSize: Font }} />
                                        <Button size="tiny" positive content="+1000" onClick={(event) => setFlexValue(flexValue + 1000)} style={{ fontSize: Font }} />
                                        <Button size="tiny" negative content="-1000" onClick={(event) => setFlexValue(flexValue - 1000)} style={{ fontSize: Font }} />

                                    </div>
                                    : <input
                                        att='range'
                                        type='range'
                                        max={minMaxStep(currentValue, newValue)}
                                        min='100'
                                        step="30"
                                        value={importChange()}
                                        onChange={(event) => { setFlexValue(event.target.value) }}
                                    />
                                }

                            </Grid.Column>
                            <Grid.Column textAlign="center" width={props.Mobile ? 5 : 6}>
                                {props.Mobile ?
                                    <div>
                                        <h3 style={{ fontSize: Font }}>КОНЕЧНЫЙ РЕЙТИНГ</h3>
                                        <Input fluid style={{ textAlign: "20%", color: "black", width: "100%" }} size="large" maxLength="4" max="7500" value={newValue} disabled focus />
                                    </div>
                                    :
                                    <div>
                                        <h3 style={{ paddingRight: "22%", fontSize: Font }} >КОНЕЧНЫЙ РЕЙТИНГ</h3>
                                        <Image floated="right" size="tiny" src={rank} style={{ marginTop: "-8%" }} />
                                        <Input fluid style={{ fontSize: "90%" }} size="large" maxLength="4" max="7500" value={newValue} disabled focus />
                                    </div>
                                }

                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={props.Mobile ? 5 : 6}>
                                {props.Mobile ?
                                    <div>
                                        <Checkbox
                                            checked={party}
                                            onClick={partyCheckbox}
                                            color="primary"
                                            size={props.Mobile ? "small" : "medium"}
                                        />
                                        в пати
                                        <Checkbox
                                            checked={stream}
                                            onClick={streamCheckbox}
                                            color="primary"
                                            size={props.Mobile ? "small" : "medium"}
                                        />
                                        стрим
                                        <Checkbox
                                            checked={heros}
                                            onClick={herosCheckbox}
                                            color="primary"
                                            size={props.Mobile ? "small" : "medium"}
                                        />
                                        герои
                                    </div> :
                                    <div>
                                        <Label circular onClick={partyCheckbox} size={props.Mobile ? "tiny" : "large"} >
                                            <Checkbox
                                                checked={party}
                                                onClick={partyCheckbox}
                                                color="primary"
                                                size={props.Mobile ? "small" : "medium"}
                                            />
                                            пати
                                        </Label>
                                        <Label size={props.Mobile ? "tiny" : "large"} circular onClick={streamCheckbox} >
                                            <Checkbox
                                                checked={stream}
                                                onClick={streamCheckbox}
                                                color="primary"
                                                size={props.Mobile ? "small" : "medium"}
                                            />
                                            стрим
                                        </Label>
                                        <Label circular onClick={herosCheckbox} size={props.Mobile ? "tiny" : "large"} >
                                            <Checkbox
                                                checked={heros}
                                                onClick={herosCheckbox}
                                                color="primary"
                                                size={props.Mobile ? "small" : "medium"}
                                            />
                                            герои
                                        </Label>
                                    </div>
                                }
                            </Grid.Column>
                            <Grid.Column textAlign="center" width={props.Mobile ? 6 : 4}>
                                <Input
                                    style={{ width: "70%" }}
                                    value={result}
                                    icon='cart'
                                    iconPosition='left'
                                    focus
                                />
                                <span style={{ fontSize: Font }}> Рублей </span>
                            </Grid.Column>
                            <Grid.Column width={props.Mobile ? 5 : 6}>
                                <Input
                                    style={{ width: "100%" }}
                                    size="small"
                                    onChange={(event) => setPromo(event.target.value)}
                                    placeholder="Введите промокод"
                                    value={promo}
                                    onClick={checkPromo}
                                />
                                <Button size="tiny" onClick={checkPromo} color="green" compact content="Проверить" style={{ fontSize: "90%" }} />
                                {promoSegment === 1
                                    ?
                                    <Segment size={props.Mobile ? "tiny" : "large"} style={{ fontSize: Font }}>
                                        Промокод {promo} введён успешно <Icon name="check" /> СКИДКА {discount} %
                                    </Segment>
                                    : null
                                }
                                {promoSegment === 2
                                    ?
                                    <Segment size={props.Mobile ? "tiny" : "large"} style={{ fontSize: Font }}>
                                        Вы ввели неправильно промокод <Icon name="x" />
                                    </Segment>
                                    : null
                                }
                            </Grid.Column>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Button style={{ fontSize: Font }} onClick={nextStep1} color='violet'>Подготовить данные</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
                : null}

            {step === 2
                ?
                <Container >
                    <Segment textAlign="center" size={props.Mobile ? "tiny" : "large"}>
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
                    {mobileGuard
                        ?
                        <Segment textAlign="center" size={props.Mobile ? "tiny" : "large"}>
                            <p>
                                <h4>
                                    Если у Вас стоит мобильный аутентификатор, то нужен постоянно код от мобильного приложения стим. <br></br>
                                    И чтобы бустер не зависил от Вас, то можно сделать запасные коды Steam Guard.
                                </h4>
                                Сделать это довольно просто: <br></br>
                                1. Войдите в свой аккаунт Steam. <br></br>
                                2. В выпадающем меню под вашим логином в правом верхнем углу страницы выберите «Об аккаунте». <br></br>
                                3. Выберите «Настройка Steam Guard».<br></br>
                                4. Выберите «Получить запасные коды».<br></br>
                                5. Введите текущий код аутентификатора (или полученный ранее код восстановления).<br></br>
                            </p>
                        </Segment>
                        : null}
                    {emailGuard
                        ?
                        <Segment textAlign="center">
                            <p>
                                <h4>
                                    Если у вас стоит обычная защита steam guard, то есть чтобы войти в аккаунт нужен код от почты, то:
                                </h4>
                                По вашему желанию, вы можете выключить steam guard, чтобы бустер мог зайти в аккаунт не ожидая кода от почты. <br></br>
                                Спасибо
                            </p>
                        </Segment>
                        : null}
                    <Segment textAlign="center">
                        <Button onClick={nextStep2} color='violet'>Связаться со мной</Button>
                    </Segment>
                </Container>
                : null}

            {step === 3
                ?
                <Container textAlign="center">
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
                    <Button type="button" name="submit  " onClick={nextStep3}  >
                        Написать
                    </Button>
                </Container>
                : null}
        </div>
    )
}
export default CalcBoost;