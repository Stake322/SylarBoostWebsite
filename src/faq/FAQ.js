import React from "react";
import { Segment, Button, Header, Container, Image, Grid } from "semantic-ui-react";
import AccordionFaq from "./accordion.js"
import pudge1 from '../resources/падж2222222-(1).gif';
import pudge2 from '../resources/падж123-(3-падж-падж).gif';

const FAQ = () => {
    const contStyle = {
        backgroundImage: 'url(https://i.ytimg.com/vi/HZcTLJ-6UMI/maxresdefault.jpg)',
        backgroundSize: "cover",
        height:"720px"
    }
    return (
        <div style={contStyle}>
            <Container>
                <AccordionFaq />
                <Segment textAlign="center">
                    <Header as="h3">Если не нашли ответ на свой вопрос, то можете задать его лично написав нам:</Header>
                    <Button color="vk" onClick={() => window.open("https://vk.com/topic-187930680_41834234")}>Группа вКонтакте</Button>
                    <Button color="blue" onClick={() => window.open("https://discord.gg/VzyMR9BQUt")}>Discord</Button>
                </Segment>
            </Container>
            {/* <Segment raised color="violet" style={{ marginLeft: "auto", marginRight: "auto" }} compact textAlign="center">
                <Header as="h2">ЛУЧШИЕ БУСТЕРЫ - ПУДЖИ</Header>
                <Grid columns={3} >
                    <Grid.Column>
                        <Header as="h3">ПУДЖ С МОМОМ</Header>
                        <Image src={pudge1} size="large"></Image>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h3">ПУДЖ С АГАНИМОМ</Header>
                        <Image src={pudge2} size="large"></Image>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as="h3">ПУДЖ С БАШЕРОМ</Header>
                        <Image src={pudge1} size="large"></Image>
                    </Grid.Column>
                </Grid>
            </Segment> */}
        </div>
    )
}

export default FAQ;