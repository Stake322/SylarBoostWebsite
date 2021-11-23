import React from "react";
import { Container, Menu, Segment, Image, Sticky, Grid, Header, Embed } from 'semantic-ui-react'
import rub from "../img/youtubeIMG/1.png";
import voker from "../img/youtubeIMG/6.png";
import slark from "../img/youtubeIMG/4.png";
import luna from "../img/youtubeIMG/7.png";
import pudge from "../img/youtubeIMG/pudge.jpg";



const Youtube = () => {
    const fBlock = {
        backgroundColor: "white",
        height: "300px",
        // opacity: '100%',
        // display: "flex",
        // position: 'relative',
        position: 'sticky',
        top: "90px",
        marginTop: "20px"
    }
    const sBlock = {
        backgroundColor: "white",
        height: "300px",
        opacity: '100%',
        position: 'sticky',
        bottom: "0px",
        marginTop: "20px"


    }
    const firstBackStyle = {
        backgroundImage: 'url(https://static-prod.weplay.tv/2020-02-20/f6914cc23f4ed2ca08e28b74b51dc57c_large_cover.191518-81B7B8-447A90.jpeg',
        height: "720px"

    }
    const secondBackStyle = {
        backgroundImage: 'url(https://static-prod.weplay.tv/2020-02-20/f6914cc23f4ed2ca08e28b74b51dc57c_large_cover.191518-81B7B8-447A90.jpeg',
        height: "600px"

    }
    const tBlock = {
        backgroundColor: "white",
        height: "300px",
        position: 'sticky',
        top: "90px",
        marginTop: "300px",
    }
    const frBlock = {
        backgroundColor: "white",
        height: "700px",
        opacity: '100%',
        position: 'sticky',
        // bottom: "0px",
        // marginTop: "0px"
    }
    return (
        <div>
            <div style={firstBackStyle}>
                <div style={fBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    <Header>Youtube канал:</Header>
                                    Привет БРОУ! Именно с этой фразы начинается каждое видео.
                                    Ютуб канал посвящен игре DOTA 2. Думаю по страничке сайта становится понятно.
                                    Канал создавался как определенный тест моих навыков, потому что заниматься созданием контента это огромная работа.
                                    Канал называется Mamau dota  в честь моей фамилии Мамаев и дота, тут нет ничего сложного....
                                    Изначальной идеей ютуба было просто создание видео-гайдов, руководства для того чтобы игроки начали правильно играть.
                                    Максимальный рейтинг у меня был 7300 ММР (match making raiting),а место занимал в  Европе -  1000.
                                    Это очень хороший показатель понимания моей игры.
                                </p>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image size="huge" src={rub} />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
                <div style={{ opacity: "0%", height: "400px", backgroundColor: "red", }}>
                </div>
                <div style={sBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={4}>
                                <Image size="huge" src={voker} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    <Header>КОУЧИНГ:</Header>
                                    Целый год занимаясь созданием контента познакомился со многими людьми, а также помогал ребятам поднимать свой скилл в виде индивидуальных тренировок.
                                    Кто не понимает о чем идёт речь, это репетиторство в доте.
                                    Занятия по итогу стали оцень эффективны, огромное количество довольных клиентов и положительных отзывов.
                                    За год провёл более 250 часов индвидуальных тренировок.
                                    Ознакомится с отзывами можно здесь:
                                </p>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            </div>
            <div style={secondBackStyle}>
                <div style={tBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    <Header>КУРС:</Header>
                                    Безусловно, можно перегореть, если постоянно заниматься с людьми - помогать им решить их проблемы.
                                    Поэтому я решил сделать свой курс, где четко и ясно изложил всю ту информацию, которую скопил за свой 8 летний стаж игры.
                                    Также я активно выступал на турнирах и занимал призовые места со своей командой. В команде был капитаном, разбирал игровые моменты и драфтил.
                                    В курсе собранны весь мой опыт за киберспортивную и тренерскую деятельность.На данный момент курс состоит из 30 видеороликов, выдающиеся пожизненно.
                                    Он очень удобен, так как можно сначала ознакомится с теорией, а потом поиграть и улучшить свои практические навыки.
                                    На индивидуальных занятиях сложно рассмотреть всё стороны игровых механик и моментов, а в курсе рассмотрен геймплей, задачи и прочее для каждой роли.
                                </p>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image size="huge" src={slark} />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            </div>
            <div style={{ opacity: "50%", height: "0px", backgroundColor: "red", }}>
            </div>
            <div style={frBlock}>
                <Container textAlign="center">
                    <Grid>
                        <Grid.Column width={4}>
                            <Image size="huge" src={luna} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <p style={{ fontSize: "130%" }}>
                                <Header>ИТОГ:</Header>
                                Эта страничка создана для практики в дизайных навыках, надеюсь он понравился Вам и ознакомления с одной из моих деятельностей.
                                Также можете посмотреть ознакомительный видеоролик, что нового можно узнать в курсе. Приятного просмотра!
                            </p>
                            <Embed
                                id='AXd060dQLW8'
                                placeholder={pudge}
                                source='youtube'
                            />
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}
export default Youtube