import React, { useEffect, useState } from "react";
import { Container, Segment, Image, Grid, Header } from 'semantic-ui-react'
import StepExampleVertical from "./Steps.js";
import welcome from "../resources/dobro_pozhalovat.png"
import * as api from "../api";
import MenuWithTabs from "./MenuWithTabs.js";
import "../boost/input.css";
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'

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



const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    }
})


const DesktopContainer = (props) => {
    return (
        <Media greaterThan='mobile' >
            {Boost()}
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    const [currentStep, setCurrentStep] = useState(-1)
    const [config, setConfig] = useState(defaultConfig);
    const Mobile = true;

    const imgStyle = { width: "100%" }
    const contStyle = {
        backgroundImage: 'url(https://estnn.com/wp-content/uploads/2019/12/dotashld.jpg',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%"
    }
    const segmentTabs = {
        // minHeight: "390px"
        fontSize: "50%"
    }

    const handleStepChange = (currentStep) => setCurrentStep(currentStep)
    useEffect(() => {
        api.config((gotConfig) => {
            if (gotConfig)
                setConfig(gotConfig);
        })
    }, []);

    return (
        <Media at='mobile'>
            <div style={contStyle}>
                <Container>
                    <Segment size="small">
                        <Image bordered style={imgStyle} src={welcome} />
                        <Segment style={{ marginLeft: "auto", marginRight: "auto" }} compact color="violet">
                            <Header color="violet" textAlign="center" as="h3">КАЛЬКУЛЯТОР УСЛУГ</Header>
                        </Segment>
                    </Segment>
                    <Segment size="small" style={segmentTabs}>
                        <MenuWithTabs myConfig={config} handleStepChange={handleStepChange} Mobile={Mobile}  />
                    </Segment>
                </Container>
            </div>
        </Media >
    )
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <MediaContextProvider>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}


const BoostLayout = () => {
    return (
        <ResponsiveContainer />
    )
}

export default BoostLayout;