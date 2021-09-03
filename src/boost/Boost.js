import react, { useEffect, useState } from "react";
import { Container, Segment, Image, Grid, Header, Icon, Divider } from 'semantic-ui-react'
import StepExampleVertical from "./steps.js";
import BreadcrumbExample from "./navigation.js";
import welcome from "../resources/dobro_pozhalovat.png"
import Timer from "./timer.js";
import * as api from "../api";
import MenuWithTabs from "./menu.js";
import input from "../boost/input.css";

const defaultConfig = require('./config.json');


const imgStyle = {
    width: "100%",
}
const segmentStyle = {
    backgroundColor: "#F0DBD1",
    minHeight: "220px"

}
const contStyle = {
    backgroundImage: 'url(https://estnn.com/wp-content/uploads/2019/12/dotashld.jpg',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%"
}
const segmentTabs = {
    minHeight: "390px"
}


const Boost = () => {

    const [currentStep, setCurrentStep] = useState(-1)
    // const [currentTab, setCurrentTab] = useState(0); ПРОПИСАТЬ ТАБЫ И АПП БАР
    const handleStepChange = (currentStep) => {
        setCurrentStep(currentStep)
    }
    const [config, setConfig] = useState(defaultConfig);
    useEffect(() => {
        api.config((gotConfig) => {
            if (gotConfig)
                setConfig(gotConfig);
        })
    }, []);

    return (
        <div style={contStyle}>
            <Container>

                <Segment>

                    <Image bordered style={imgStyle} src={welcome} />
                    <Segment style={{marginLeft:"auto", marginRight:"auto"}} compact color="violet">
                        <Header color="violet" textAlign="center" as="h1">КАЛЬКУЛЯТОР УСЛУГ</Header>
                    </Segment>

                </Segment>


                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <StepExampleVertical step={currentStep} />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Segment style={segmentTabs}>
                                <MenuWithTabs myConfig={config} handleStepChange={handleStepChange} />
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>



                </Grid>
            </Container>

        </div>


    )

}
export default Boost;