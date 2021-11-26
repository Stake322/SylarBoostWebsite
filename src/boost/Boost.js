import React, { useEffect, useState } from "react";
import { Container, Segment, Image, Grid, Header } from 'semantic-ui-react'
import StepExampleVertical from "./Steps.js";
import welcome from "../resources/dobro_pozhalovat.png"
import * as api from "../api";
import MenuWithTabs from "./MenuWithTabs.js";
import "../boost/input.css";
const defaultConfig = require('./config.json');


const Boost = () => {
    const [currentStep, setCurrentStep] = useState(-1)
    const [config, setConfig] = useState(defaultConfig);

    const imgStyle = { width: "100%" }
    const contStyle = {
        backgroundImage: 'url(https://estnn.com/wp-content/uploads/2019/12/dotashld.jpg',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%"
    }
    const segmentTabs = {
        minHeight: "390px"
    }

    const handleStepChange = (currentStep) => setCurrentStep(currentStep)
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
                    <Segment style={{ marginLeft: "auto", marginRight: "auto" }} compact color="violet">
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