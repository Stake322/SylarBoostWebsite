import React, { useState, useEffect } from 'react'
import Tabs from "./Tabs.js";
import CardReviews from "./CardReviews.js";
import { Container, Segment } from 'semantic-ui-react';
import FadeAnimate from 'react-reveal/Fade';
import Slider from "./Slider.js";
import TypeText from './TypeText.js';
import TabLayout from './TabsLayout.js';

const MainPage = () => {
    const sliderStyle = {
        backgroundImage: 'url(https://estnn.com/wp-content/uploads/2019/12/dotashld.jpg',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%"
    }
    const grid = {
        backgroundImage: 'url(https://wallpaperaccess.com/full/3705495.jpg)',
        backgroundSize: "1600px 900px",
    }
    const main = {
        backgroundImage: 'url(https://avatars.mds.yandex.net/get-zen_doc/175962/pub_5d67afd395aa9f00ae1841d7_5d67b06a6f5f6f00ad6f0a73/scale_1200',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };






    return (
        <div>
            <TypeText />
            <div style={main} >
                <Container>
                    <FadeAnimate bottom>
                        <TabLayout />
                    </FadeAnimate>
                </Container>
            </div>
            <Container fluid textAlign="center" style={sliderStyle}>
                <FadeAnimate delay={1000} left>
                    <Slider />
                </FadeAnimate>
            </Container>
            <div style={grid}>
                <CardReviews />
            </div>
        </div>
    )
}

export default MainPage