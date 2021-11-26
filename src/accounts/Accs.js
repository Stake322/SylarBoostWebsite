import React from "react";
import { Container, Segment, Image, Grid, Header, Button, Card, Divider } from 'semantic-ui-react'
import welcome from "../resources/Welcome.png";
import imagelink1 from "../accounts/accsScreens/1.png"
import imagelink2 from "../accounts/accsScreens/2.png"
import imagelink3 from "../accounts/accsScreens/3.png"
import imagelink4 from "../accounts/accsScreens/4.png"

const segmentStyle = {
    backgroundColor: "#F0DBD1"
}
const textCss = {
    color: "black"

}
const styleDiv = {//space
    backgroundImage: "url(https://99px.ru/sstorage/56/2018/12/11312181905353276.jpg)",
}

const Accs = () => {
    const Obj = [{
        nickName: "5500 ММР", date: "4500 РУБЛЕЙ", avatar: imagelink1, description: "10000 ПОРЯДОЧНОСТИ, РОДНАЯ ПОЧТА", id: "925310369"
    }, {
        nickName: "5400 ММР", date: "4000 РУБЛЕЙ", avatar: imagelink2, description: "6500 ПОРЯДОЧНОСТИ, РОДНАЯ ПОЧТА", id: "882365874"
    }, {
        nickName: "7090 ММР", date: "10000 РУБЛЕЙ", avatar: imagelink3, description: "10 ТЫСЯЧ ПОРЯДОЧНОСТИ, РОДНАЯ ПОЧТА", id: "926989863"
    }, {
        nickName: "4300 ММР", date: "2000 РУБЛЕЙ", avatar: imagelink4, description: "10 ТЫСЯЧ ПОРЯДОЧНОСТИ, РОДНАЯ ПОЧТА", id: "893610104"
    },]

    const renderCards = () => {
        return Obj.map((item) => (
            <Card key={item.nickName}>
                <Image size="big" src={item.avatar} />
                <Card.Content>
                    <Divider />
                    <Card.Header>{item.nickName}</Card.Header>
                    <Card.Meta>{item.date}</Card.Meta>
                    <Card.Description>
                        {item.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <a href={`https://www.dotabuff.com/players/${item.id}`}>DOTABUFF</a>
                </Card.Content>
            </Card>
        ))
    }

    return (
        <div style={styleDiv} >
            <Container>
                <Segment size="massive" raised style={segmentStyle}>
                    <Grid>
                        <Grid.Column width={8}>
                            <Segment>
                                <Image src={welcome} />
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header style={textCss} textAlign="center" as="h2"> Аккаунты ДОТА 2 </Header>
                            <p style={textCss}>1. Выбираете аккаунт. <br></br>
                         2. Связывайтесь с нами.  <br></br>
                         3. Оплачивайете. <br></br>
                         4. В течение 5 минут будете иметь доступ к аккаунту.</p>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment hidden textAlign="center" size="massive" raised style={segmentStyle}>
                    <Header style={textCss} as="h2"> На данный момент аккаунтов нет в наличии </Header>
                    <Header style={textCss} as="h2"> Но вы можете связаться с нами, чтобы заказать аккаунт по Вашим предпочтениям</Header>
                    <Button color="vk" onClick={() => window.open("https://vk.com/topic-187930680_41834234")}>Группа вКонтакте</Button>
                    <Button color="blue" onClick={() => window.open("https://discord.gg/VzyMR9BQUt")}>Discord</Button>
                </Segment>
                <Segment textAlign="center" size="massive" raised style={segmentStyle}>
                    <Card.Group textAlign="center" itemsPerRow={4}>
                        {renderCards()}
                    </Card.Group>
                    <Header style={textCss} as="h2"> Также Вы можете связаться с нами, чтобы заказать аккаунт по Вашим предпочтениям</Header>
                    <Button color="vk" onClick={() => window.open("https://vk.com/topic-187930680_41834234")}>Группа вКонтакте</Button>
                    <Button color="blue" onClick={() => window.open("https://discord.gg/VzyMR9BQUt")}>Discord</Button>
                </Segment>
            </Container>
        </div>
    )

}
export default Accs;