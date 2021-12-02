import React from 'react'
import { Tab, Image, Button, Icon, Container, Grid, Segment } from 'semantic-ui-react';
import immortal from '../../img/Immortal.png';
import immortal2 from '../../img/bc.jpg';
import immortal3 from '../../img/accounts.jpg';
import immortal4 from '../../img/dotaplus.png';
import { Link } from "react-router-dom";

const TabMobile = () => {
    const
        textCss1 = {
            fontSize: "60%",
            marginBottom: "5%",
            color: "#4A2545",
            fontFamily: "'Lora', serif"
        },
        titleTab = {
            alingItems: "center",
            fontSize: "100%",
            color: "#4A2545"
        },
        sizeTab = {
            // height: "550px",
            width: "",
            backgroundColor: "#F0DBD1"
        },
        tabsStyle = { background: "rgba(195, 0, 255, 0.342)", }


    const ContainerBoost = (
        <Container fluid >
            <Tab.Pane style={sizeTab} >
                <span style={titleTab}> <strong>Пора стать ТИТАНОМ </strong></span>
                <p align="left" style={textCss1}> <strong>Качество:</strong> <br></br>
                    Наша команда состоит из профессиональных бустеров, которые имеют 8000 MMR, готовых выиграть даже в самых сложных условиях!<br></br>
                    <strong>Безопасность:</strong> <br></br>
                    Все бустеры проверены, т. е. они предоставили свои паспортные данные и несут полную ответственность за вашу учетную запись.
                    Все действия по аккаунту выполняются в невидимом режиме, что гарантирует полную анонимность. Бустер не отвечает и не читает входящие сообщения! <br></br>
                    <strong>Гарантии:</strong> <br></br>
                    В случае невыполнения заказа мы немедленно возвращаем деньги и выплачиваем компенсацию в размере ущерба, если таковой имеется.</p>
                <Link to="/boost">
                    <Button style={{ top: "5%", fontSize: "40%" }}  size="mini" compact color='purple' attached="left" >
                        Воспользоваться услугой бустинга
                    </Button>
                </Link>
            </Tab.Pane>
        </Container>
    )

    const ContainerCoach = (
        <Container>
            <Tab.Pane style={sizeTab}>

                <span style={titleTab}> <strong>ПОДНИМИ РЕЙТИНГ САМ  </strong></span>
                <p align="left" style={textCss1}> <strong>Результат:</strong> <br></br>
                    После тренировки вы почувствуете результат уже в первой игре!<br></br>
                    <strong>О тренировке:</strong> <br></br>
                    Тренировка идёт 1.5 часа, разберём: 1. Лейнинг стадию. 2. Середину игры. 3. Айтем и скилл билды. 4. Реплеи и перемещения по карте<br></br>
                    <strong>Консультации:</strong> <br></br>
                    Если у вас остаются какие-либо вопросы после тренировки - вы всегда можете их задавать, консультации после обучения абсолютно бесплатны.
                    Многие кто заказывал обучение, очень довольны, т.к. после него появилось много побед.</p>
                <Link to="/boost">
                    <Button style={{ top: "5%", fontSize: "40%" }} compact color='purple' size="mini" attached="left">
                        Воспользоваться услугой обучения
                    </Button>
                </Link>
            </Tab.Pane>
        </Container>
    )

    const ContianerBuyAccounts = (
        <Container>
            <Tab.Pane style={sizeTab}>
                <h3 style={titleTab}>У НАС МОЖНО КУПИТЬ АККАУНТ</h3>
                <p align="left" style={textCss1}>
                    Существует множество учетных записей для различных вариантов от 1000 до 8000 MMR. По самым приятным ценам.
                    Учетные записи после покупки будут принадлежать только вам, потому что вместе с учетной записью идет оригинальная электронная почта,
                    а первая почта является гарантией качества и надежности учетной записи.
                    Таким образом, вы можете сразу же получить нужный вам рейтинг!</p>
                <Link to="/accounts">
                    <Button style={{ top: "5%", fontSize: "40%" }}  icon="angle double right" compact color='purple' size="mini" attached="left">
                        КУПИТЬ АККАУНТ
                    </Button>
                </Link>
            </Tab.Pane>,
        </Container>
    )

    const ContainerBattleCup = (
        <Container>
            <Tab.Pane style={sizeTab}>
                <h3 style={titleTab}>Battle Cup,услуги Dota Plus и прочие услуги</h3>
                <p align="left" style={textCss1}> <strong>Dota Plus:</strong> <br></br>
                    Наша команда будет играть на ваших любимых героях, чтобы повысить уровень DotA plus.
                    При желании вы можете выбрать количество побед или просто так, чтобы мы выполняли квесты на героя.<br></br>
                    <strong>Battle Cup</strong> <br></br>
                    Вы можете заказать услугу выигрыша боевого Кубка. На любом тире вы также можете играть с бустером, не давая ему свой аккаунт, или дать аккаунт,
                    чтобы он и его команда выиграли Кубок.
                    У нас также есть сервис, где вы можете выбрать изображение и название команды за дополнительную плату. <br></br>
                    <strong>Снять ЛП и поднять порядочность</strong> <br></br>
                    Наша команда может отмыть лоу приорити и повысить вашу порядочность на аккаунте.</p>
                <Link to="/boost">
                    <Button style={{ top: "5%", fontSize: "40%" }} compact color='purple' size="mini" attached="left" icon="share" >
                        Воспользоваться прочими услугами
                    </Button>
                </Link>
            </Tab.Pane>,
        </Container>
    )

    const panes = [
        {
            menuItem: 'БУСТ',
            render: () => ContainerBoost
        },
        {
            menuItem: 'ОБУЧЕНИЕ',
            render: () => ContainerCoach
        },
        {
            menuItem: 'АККАУНТЫ',
            render: () => ContianerBuyAccounts
        },
        {
            menuItem: 'ПРОЧЕЕ',
            render: () => ContainerBattleCup
        },
    ]
    const menu = {
        pointing: true,
        secondary: true,
        borderless: false,
        // widths: 4,
        // fluid: true, 
        // vertical: true, 
        tabular: true,
        style: {
            // textAlign: "center",
            backgroundColor: "#F0DBD1",
            fontSize: "65%",
        }
    }

    return (
        <Segment raised style={tabsStyle}>
            <Container textAlign="center">
                <Tab menu={menu} panes={panes} />
            </Container>
        </Segment>
    )
}

export default TabMobile;
