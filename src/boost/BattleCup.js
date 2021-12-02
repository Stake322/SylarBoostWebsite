import React, { useState, useEffect } from "react";
import { Input, Dropdown, Container, Button, Segment, Icon, Grid, Divider, Label } from 'semantic-ui-react';
import useClipboard from "react-use-clipboard";


import straj from "../icons/140px-SeasonalRank2-1.png";
import geroy from "../icons/140px-SeasonalRank4-1.png";
import legend from "../icons/140px-SeasonalRank5-1.png";
import ancient from "../icons/140px-SeasonalRank6-1.png";
import divine from "../icons/140px-SeasonalRank7-1.png";
import immortal from "../icons/SeasonalRankTop1.png";
import * as api from "../api";
import Checkbox from '@material-ui/core/Checkbox';



const requstType = "Battle Cup";


const options = [
    { key: '1', text: '3 ТИР', value: '3', image: straj },
    { key: '2', text: '4 ТИР', value: '4', image: geroy },
    { key: '3', text: '5 ТИР', value: '5', image: legend },
    { key: '4', text: '6 ТИР', value: '6', image: ancient },
    { key: '5', text: '7 ТИР', value: '7', image: divine },
    { key: '6', text: '8 ТИР', value: '8', image: immortal },
]

// const config = require('./config.json');


const bcConst = ["", "", "", 300, 400, 500, 650, 750, 1300];
const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];



const BattleCup = (props) => {
    const [step, setStep] = useState(1)
    const [discount, setDiscount] = useState(10);
    const [value, setValue] = useState(0);
    const [result, setResult] = useState(0);

    const [isParty, setIsParty] = useState(true);
    const [smthSelected, setSmthSelected] = useState(false);
    const [mobileGuard, setMobileGuard] = useState(false);
    const [emailGuard, setEmailGuard] = useState(false);
    const [inputResult, setInputResult] = useState("Ничего не выбрали");
    const [isCopied, setCopied] = useClipboard(inputResult);
    const [infoParty, setInfoParty] = useState("без пати");
    const [infoStream, setInfoStream] = useState("без стрима");
    const [promo, setPromo] = useState("");
    const [promoSegment, setPromoSegment] = useState(0);


    const checkPromo = () => {
        if (props.config.promocodes.includes(promo)) {
            setPromoSegment(1);
            return promo;
        } else if (props.config.promocodes.includes(promo) === false && (promo !== "")) {
            setPromoSegment(2);
            return "без промокода";
        } else {
            setPromoSegment(0);
            return "";
        }
    }

    useEffect(() => {
        setInfoParty(smthSelected && isParty ? "В пати" : "БЕЗ пати")
        setInfoStream(smthSelected && !isParty ? "СО стримом" : "БЕЗ стрима")
    }, [isParty, smthSelected])

    const isPartySelected = () => {
        return smthSelected && isParty;
    }
    const isStreamSelected = () => {
        return smthSelected && !isParty;
    }


    const bc = () => {

        if (props.config.promocodes.includes(promo)) {
            if (isStreamSelected() && value === keys[value]) return (parseFloat(bcConst[value] * 1.25 * (1 - discount / 100)).toFixed(0));
            if (isPartySelected() && value === keys[value]) return (parseFloat(bcConst[value] * 1.4 * (1 - discount / 100)).toFixed(0));
            if (value == keys[value]) return bcConst[value] * (1 - discount / 100);
        } else {
            if (isStreamSelected() && value === keys[value]) return (parseFloat(bcConst[value] * 1.25).toFixed(0));
            if (isPartySelected() && value === keys[value]) return (parseFloat(bcConst[value] * 1.4).toFixed(0));
            if (value === keys[value]) return bcConst[value];
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

    useEffect(() => {
        setDiscount(+props.config.price_modificators.promocode);
        //пати стрим сервер и герои промокод
        throttle(() => {
            setResult(bc);
            setInputResult(` БАТЛ КАП ТИР ${value} | ${infoParty} | ${infoStream}| за ${result} рублей. Промокод: ${promo} `)
        }, 500);

    }, [value, result, isParty, infoParty, infoStream, smthSelected, promoSegment]);

    const mobile = () => {
        setEmailGuard(false)
        setMobileGuard(true)
    }
    const email = () => {
        setEmailGuard(true)
        setMobileGuard(false)
    }

    const Step1 = () => {
        if (value !== 0) {
            setStep(2);
            props.handleStepChange(0)
        } else {
            alert("Выберите ТИР БАТЛ КАПА")
        }


    }
    const Step2 = () => {
        setStep(3);
        props.handleStepChange(1)

    }
    const Step3 = () => {
        props.handleStepChange(2)
        window.open("https://vk.com/im?media=&sel=-187930680")
        api.sendRequest({
            value, infoParty, infoStream, promo, requstType,
        })
    };


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
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <h3 style={{ fontSize: Font }}>ТЕКУЩИЙ ТИР</h3>
                                <Dropdown

                                    placeholder='Выберите текущий рейтинг'
                                    fluid
                                    selection
                                    defaultValue="0"
                                    options={options}
                                    onChange={(e, { value }) => setValue(value)}
                                />
                            </Grid.Column>
                            <Grid.Column textAlign="center" width={8}>
                                <h4 style={{ fontSize: Font }}>Если необходима услуга, выберите одну:</h4>
                                {props.Mobile ?
                                    <div>
                                        <div>
                                            <Checkbox
                                                checked={smthSelected && isParty}
                                                onClick={(e) => {
                                                    setSmthSelected(e.target.checked)
                                                    setIsParty(e.target.checked)
                                                }}
                                                color="primary"
                                            />
                                            в пати
                                        </div>
                                        <div>
                                            <Checkbox
                                                checked={smthSelected && !isParty}
                                                onClick={(e) => {
                                                    setSmthSelected(e.target.checked)
                                                    setIsParty(!e.target.checked)
                                                }}
                                                color="primary"
                                            />
                                            стрим
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Label
                                            circular
                                            size="large"
                                        >
                                            <Checkbox
                                                checked={smthSelected && isParty}
                                                onClick={(e) => {
                                                    setSmthSelected(e.target.checked)
                                                    setIsParty(e.target.checked)
                                                }}
                                                color="primary"
                                            />
                                            пати
                                        </Label>
                                        <Label
                                            size="large"
                                            circular
                                        >
                                            <Checkbox
                                                checked={smthSelected && !isParty}
                                                onClick={(e) => {
                                                    setSmthSelected(e.target.checked)
                                                    setIsParty(!e.target.checked)
                                                }}
                                                color="primary"
                                            />
                                            стрим
                                        </Label>
                                    </div>
                                }

                            </Grid.Column>
                        </Grid.Row>
                        <Divider />
                        <Grid.Row>
                            <Grid.Column textAlign="center" width={8}>
                                <Input
                                    style={{ fontSize: Font }}
                                    fluid
                                    value={result}
                                    icon='cart'
                                    iconPosition='left'
                                    focus
                                    label="Руб."
                                    labelPosition="right"
                                />
                            </Grid.Column>
                            <Grid.Column textAlign="center" width={8}>

                                <Input
                                    style={{ fontSize: Font }}
                                    size="small"
                                    onChange={(event) => setPromo(event.target.value)}
                                    placeholder="Введите промокод"
                                    value={promo}
                                    onClick={checkPromo}
                                />
                                <Button size="tiny" onClick={checkPromo} color="green" >
                                    Проверить
                                </Button>
                                {promoSegment === 1
                                    ?
                                    <Segment>
                                        Промокод {promo} введён успешно <Icon name="check" /> СКИДКА {discount} %
                                    </Segment>
                                    : null
                                }
                                {promoSegment === 2
                                    ?
                                    <Segment>
                                        Вы ввели неправильно промокод <Icon name="x" />
                                    </Segment>
                                    : null
                                }
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row textAlign="center">
                            <Grid.Column columns={16} >
                                <Button onClick={Step1} color='violet'>Подготовить данные</Button>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </Container>
                : null}
            {step === 2
                ?
                <Container >
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
                    {mobileGuard
                        ?
                        <Segment textAlign="center">
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
                        <Button onClick={Step2} color='violet'>Связаться со мной</Button>
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
                    <Button type="button" name="submit  " onClick={Step3}  >
                        Написать
                    </Button>
                </Container>
                : null
            }

        </div>
    )
}

export default BattleCup;