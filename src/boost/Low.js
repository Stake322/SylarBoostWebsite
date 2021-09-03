import react, { useState, useEffect } from "react";
import { Input, Checkbox, Dropdown, Grid, Divider, Image, Button, Container, Segment, Icon, Popup } from 'semantic-ui-react';


import straj from "../icons/140px-SeasonalRank2-1.png";
import geroy from "../icons/140px-SeasonalRank4-1.png";
import legend from "../icons/140px-SeasonalRank5-1.png";
import ancient from "../icons/140px-SeasonalRank6-1.png";
import divine from "../icons/140px-SeasonalRank7-1.png";
import immortal from "../icons/SeasonalRankTop1.png";
import immortal2 from "../icons/SeasonalRankTop2.png";
import unranked from "../icons/SeasonalRank0-0.png";
import * as api from "../api";


import useClipboard from "react-use-clipboard";


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
// const discount = +config.price_modificators.promocode;
const priceLP = 90;
const requstType = "Low Priority"



const Low = (props) => {
    const [discount, setDiscount] = useState(10);

    const [currentValue, setCurrentValue] = useState(0);
    const [count, setCount] = useState(1);
    const [result, setResult] = useState(0);
    const [time, setTime] = useState(0);
    const [cont1, setCont1] = useState("block");
    const [cont2, setCont2] = useState("none");
    const [cont3, setCont3] = useState("none");
    const [mobileGuard, setMobileGuard] = useState("none");
    const [emailGuard, setEmailGuard] = useState("none");
    const [inputResult, setInputResult] = useState("Ничего не выбрали");
    const [isCopied, setCopied] = useClipboard(inputResult);
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


    const costLP = () => {
        if (props.config.promocodes.includes(promo)) {
            return count * priceLP * (1 - discount / 100);
        } else {
            return count * priceLP;
        }
    };
    const timeCalc = () => {
        if (count < 3) return "Меньше 12 часов";
        else if (count >= 3) return "Около 15 часов";
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
            setTime(timeCalc);
            setResult(costLP);
            setInputResult(` ММР на аккаунте ${currentValue} | отыграть ЛП игр: ${count}  | за ${result} рублей. Промокод: ${promo}`)
        }, 500);

    }, [currentValue, count, time, promoSegTrue]);

    const mobile = () => {
        setEmailGuard("none")
        setMobileGuard("block")

    }
    const email = () => {
        setEmailGuard("block")
        setMobileGuard("none")
    }

    const Step1 = () => {   
        if (currentValue !== 0) {
            setCont1("none");
            setCont2("block")
            setCont3("none");    
            props.handleStepChange(0)
    
        } else {
            alert("Выберите значение ММР")
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
            currentValue, count, result, promo, requstType
        })

    };



    return (
        <div>

            <Container style={{ display: cont1 }}>
                <Grid textAlign="center">
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <h3>ТЕКУЩИЙ ММР</h3>
                            <Dropdown
                                placeholder='Выберите текущий рейтинг'
                                fluid
                                selection
                                defaultValue="0"
                                options={options}
                                onChange={(e, { value }) => setCurrentValue(value)}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <p>КОЛИЧЕСТВО ИГР: {count}</p>
                            <input
                                fontSize="130%"
                                type='range'
                                max="5"
                                min='1'
                                step="1"
                                value={count}
                                onChange={(event) => { setCount(event.target.value) }}
                            />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <h3>ВРЕМЯ</h3>
                            <Input maxLength="4" max="7500" value={time} disabled focus />
                            <Popup content='Это примерное время'
                            size="tiny" 
                            trigger={<Button circular icon='question circle' />} />   

                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column width={6}>
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
export default Low;