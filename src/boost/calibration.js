import react, { useState, useEffect } from "react";
import { Input, Dropdown, Grid, Divider, Button, Container, Segment, Icon, Label,Popup } from 'semantic-ui-react';



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

import Checkbox from '@material-ui/core/Checkbox';

const requstType = "calibration";
const CalibCalc = require('./logicCalib.js');
// const calibCalc = new CalibCalc();

// const config = require('./config.json');
// const discount = +config.price_modificators.promocode;


const options = [
    { key: '1', text: 'ПЕРВАЯ КАЛИБРОВКА', value: '0', image: unranked },
    { key: '2', text: '1-2000', value: '1999', image: straj },
    { key: '3', text: '2000-3000', value: '2999', image: geroy },
    { key: '4', text: '3000-4000', value: '3999', image: legend },
    { key: '5', text: '4000-5000', value: '4999', image: ancient },
    { key: '6', text: '5000-5500', value: '5499', image: divine },
    { key: '7', text: '5500-6000', value: '5999', image: immortal },
    { key: '8', text: '6000-6500', value: '6499', image: immortal },
    { key: '9', text: '6500-7000', value: '6999', image: immortal2 },
    { key: '10', text: '7000-7500', value: '7499', image: immortal2 },
]


const CalibrationCalc = (props) => {

    const [calibCalc, setCalibCalc] = useState(null);
    const [discount, setDiscount] = useState(10);


    const [newValue, setNewValue] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [count, setCount] = useState(10);
    const [result, setResult] = useState(0);
    const [cleanResult, setCleanResult] = useState(0);
    const [party, setParty] = useState(false);
    const [stream, setStream] = useState(false);
    const [heros, setHeros] = useState(false);
    const [cont1, setCont1] = useState("block");
    const [cont2, setCont2] = useState("none");
    const [cont3, setCont3] = useState("none");
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

    const howMuchPlus = () => {
        if (currentValue != 0) {
            if (count >= 9) {
                return "от +500 до +700 MMR";
            } else if (count < 9 && count > 6) {
                return "от +300 до +500 MMR";
            } else if (count <= 6) {
                return "от +100 до +300 MMR";
            }
        } else return "ПЕРВАЯ КАЛИБРОВКА";

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
        setCalibCalc(new CalibCalc(props.config));

    }, [props.config])

    useEffect(() => {
        setDiscount(+props.config.price_modificators.promocode);
        if (calibCalc != null) {
            throttle(() => {
                const { result, cleanResult } = calibCalc.calculate('RUB', +currentValue, count, party, "SERVER", heros, stream, promo)
                setResult(result);
                setCleanResult(cleanResult);
                setNewValue(howMuchPlus);
                setPromo(checkPromo);

                setInputResult(`Калибровка старого рейтинга меньше ${currentValue} ММР |  ${count} игр | ${infoParty} | ${infoStream} | ${infoHeros} | за ${cleanResult} рублей. ПРОМОКОД: ${promo}`)
            }, 500);
        }


    }, [currentValue, count, newValue, stream, party, heros, promoSegTrue]);

    const mobile = () => {
        setEmailGuard("none")
        setMobileGuard("block")

    }
    const email = () => {
        setEmailGuard("block")
        setMobileGuard("none")
    }

    const Step1 = () => {
        if (cleanResult !== 0) {
            setCont1("none");
            setCont2("block")
            setCont3("none");
            props.handleStepChange(0)
        } else {
            alert("Введите значения")
        }


    }
    const Step2 = () => {
        setCont1("none");
        setCont2("none");
        setCont3("block");
        props.handleStepChange(1)

    }
    const Step3 = () => {
        props.handleStepChange(2)
        window.open("https://vk.com/im?media=&sel=-187930680")
        api.sendRequest({
            currentValue, count, infoParty, infoStream, infoHeros, cleanResult, promo, requstType
        })

    };



    return (
        <div>
            <Container style={{ display: cont1 }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column textAlign="center" width={6}>
                            <h3>ТЕКУЩИЙ ММР</h3>
                            <Dropdown
                                placeholder='Select old MMR'
                                fluid
                                selection
                                defaultValue="0"
                                options={options}
                                onChange={(e, { value }) => setCurrentValue(value)}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign="center" width={4}>
                            <h3>Количество игр: {count}</h3>
                            <input
                                fontSize="130%"
                                type='range'
                                max="10"
                                min='3'
                                step="1"
                                value={count}
                                onChange={(event) => { setCount(event.target.value) }}
                            />
                        </Grid.Column>
                        <Grid.Column textAlign="center" width={6}>
                            <h3>ВЫ ПОЛУЧИТЕ ПРИМЕРНО ММР</h3>
                            <Input maxLength="4" max="7500" value={newValue} disabled focus />
                            <Popup content='Это примерный ММР, всё зависит от количества побед сыгранных до. Если нужно сыграть 10 игр, то информация точная'
                            size="tiny" 
                            trigger={<Button circular icon='question circle' />} />   

                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
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

                        <Grid.Column textAlign="center" width={4}>
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
                    </Grid.Row>

                    <Grid.Row textAlign="center">
                        <Grid.Column columns={16} >
                            <Button onClick={Step1} color='violet'>Подготовить данные</Button>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </Container>


            <Container style={{ display: cont2 }}>

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
                    <Button onClick={Step2} color='violet'>Связаться со мной</Button>
                </Segment>
            </Container>
            <Container style={{ display: cont3 }} textAlign="center">
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

                <Button type="button" name="submit  " onClick={Step3}  >
                    Написать
                </Button>


            </Container>
        </div>


    )

}
export default CalibrationCalc;