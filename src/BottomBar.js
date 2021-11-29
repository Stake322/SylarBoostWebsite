import React from 'react'
import {
    Container,
    Grid,
    Header,
    List,
    Segment,
    Button
} from 'semantic-ui-react'
import { Link } from "react-router-dom";

const BottomBar = () => {
    return (
        <Segment inverted vertical style={{textAlign: "center", backgroundColor: "#36274C" }}>
            <Container >
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='О нас' />
                            <List link inverted>
                                <List.Item onClick={() => window.open("https://vk.com/mamaudota")} as='a'>Группа VK</List.Item>
                                <List.Item onClick={() => window.open("https://discord.gg/VzyMR9BQUt")} as='a'>Discord канал</List.Item>
                                <List.Item onClick={() => window.open("https://funpay.ru/users/1085056/")} as='a'>Отзывы FunPay</List.Item>
                                <List.Item onClick={() => window.open("https://www.epicnpc.com/threads/%F0%9F%94%A50-9500-boost-calibration%E2%AD%90new-season-%E2%AD%90-covid-19%F0%9F%94%A5100-free-mmr%F0%9F%8E%81eu-us.1599575/")} as='a'>Отзывы EpicNPC</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Header inverted as='h4' content='Услуги' />
                            <List link inverted>
                                <Link to="/boost">
                                    <List.Item as='a'>Буст и Калибровка</List.Item>
                                </Link> <br></br>
                                <Link to="/boost">
                                    <List.Item as='a'>Обучение</List.Item>
                                </Link> <br></br>
                                <Link to="/boost">
                                    <List.Item as='a'>Снять ЛП и Победить в Кубке</List.Item>
                                </Link> <br></br>
                                <Link to="/accounts">
                                    <List.Item as='a'>Купить аккаунт</List.Item>
                                </Link>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Header as='h4' inverted>
                                Основные ссылки:
                            </Header>
                            <Button size="mini" color="red" icon="youtube" content="YT" onClick={() => window.open("https://www.youtube.com/c/MamauDota/")} />
                            <Button size="mini" color="violet" icon="twitch" content="twitch" onClick={() => window.open("https://www.twitch.tv/mamaudoto")} />
                            <Button size="mini" color="vk" content="VK" onClick={() => window.open("https://vk.com/mamaudota")} />
                            <List link inverted>
                                <List.Item as='a'>Пользовательское соглашение</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column textAlign="center" width={6}>
                            <p>
                                Все названия продуктов, компаний, логотипы и товарные знаки являются собственностью корпораций Valve, а также их лицензиаров. <br></br>
                                Данный сайт функционирует как торговая площадка и не является собственником продаваемых товаров/услуг. Все права принадлежат их владельцам.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    )
}

export default BottomBar;