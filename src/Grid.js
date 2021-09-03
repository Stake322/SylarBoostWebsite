import React from 'react'
import { Grid, Image, Rating, Container, Segment, Divider, Card, Header } from 'semantic-ui-react'
import anon from "./img/anon.png";
import gachi from "./img/UxfvdCsEkAc.jpg";



const styleText = {
    // fontSize: "130%",
    // textAlign: "center",
    // marginLeft: "auto",
    // marginRight: "auto",
    // position: "absolute",
    // color: "white"

},
    styleDiv = {
        // alingItems: "center",
        // marginTop: "1%",
        // marginBottom: "2%",
        // marginLeft: "auto",
        // marginRight: "auto",

    },
    h3Style = {
        fontSize: "120%",
        color: "#443258"
    },
    h2Style = {
        fontSize: "200%",
        color: "#4A2545",
    },
    segmentStyle = {
        backgroundColor: "#F0DBD1"
    },
    textCss = {
        color: "4A2545",
        fontSize: "110%"
    }

const GridExampleDividedNumber = () => {
    const Obj = [{
        nickName: "Ca***GGUN26", date: "В этом месяце", avatar: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_960_720.png", rating: "5", description: "Классный буст, заказал быстро сделали 4500-5000"
    }, {
        nickName: "Ln***od", date: "В этом месяце", avatar: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_960_720.png", rating: "5", description: "Заказывал обучение, после первой тренировки апнул 500 ммр за неделю"
    }, {
        nickName: "leks***18304", date: "В прошлом месяце", avatar: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_960_720.png", rating: "5", description: "9-1 калибровка 5400 аккаунта, плюс четыреста ммр. Сделал быстро."
    },
    {
        nickName: "A***agi", date: "В прошлом месяце", avatar: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_960_720.png", rating: "5", description: "Всё было круто. Всем рекомендую.Ставлю этому водителю 5 звёзд!"
    },{
        nickName: "w***s1<", date: "В прошлом месяце", avatar: "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638_960_720.png", rating: "5", description: "Отличная тренировка, узнал много нового, получил детальный разбор игры и хорошие советы по улучшению игры. "
    },]

    const renderCards = () => {
        return Obj.map((item) => (
            <Card key={item.nickName}>
                <Card.Content>
                <Image verticalAlign="middle" circular size="tiny" src={item.avatar} />
                <Card.Header style={{paddingTop:"6%"}} >{item.nickName}</Card.Header> 
                <Divider/>
                    <Card.Meta>{item.date}</Card.Meta>
                    <Card.Description textAlign="center">
                        {item.description}
            </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Rating icon='star' defaultRating={+item.rating} maxRating={5} disabled />
                </Card.Content>
            </Card>
        ))
    }


    return (
        <Container>
            <Segment style={segmentStyle} >
            <Header textAlign="center" as="h2">Последние отзывы</Header>

                <Card.Group textAlign="center" itemsPerRow={5}>
                    {renderCards()}
                </Card.Group>
            </Segment>

        </Container>
    )
}




export default GridExampleDividedNumber
