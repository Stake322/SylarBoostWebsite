import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import TabExamplePointing from "./Tabs.js";
import TypedReactDemo from "./FlexText.js";
import GridExampleDividedNumber from "./Grid.js";
import { Container, Segment } from 'semantic-ui-react';
import FadeAnimate from 'react-reveal/Fade';


import Fade from "./slider.js";

const sliderStyle = {
    backgroundImage: 'url(https://estnn.com/wp-content/uploads/2019/12/dotashld.jpg',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%"

},
    Tabs = {

        background: "rgba(195, 0, 255, 0.342)"
    },

    // fade =  {
    //     position: "relative",
    //     marginLeft: "auto",
    //     marginRight:"auto",
    //     width: "65%",
    //     background:  "rgb(140, 0, 255, 0.0)"
    // },
    grid = {
        backgroundImage: 'url(https://wallpaperaccess.com/full/3705495.jpg)',
        backgroundSize: "1600px 900px",
        
    },
    main = {
        backgroundImage: 'url(https://avatars.mds.yandex.net/get-zen_doc/175962/pub_5d67afd395aa9f00ae1841d7_5d67b06a6f5f6f00ad6f0a73/scale_1200', 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    };


const MainPage = () => {
    return (
        <div>
            <TypedReactDemo
                strings={[
                    '-Это что Ana?  - Нет, это <strong>Mamau` dota<strong>',
                    'Я В ДЖАКУЗИ Я В ДЖАКУЗИ ЭТО ФАКТ',
                    'Воспользуйся моими услугами, <strong> красавчик<strong>'
                ]}
            />

            <main style={main} >
                <Container>
                    <FadeAnimate bottom>
                        <Segment raised className="segment" style={Tabs}>
                            <TabExamplePointing />
                        </Segment>
                    </FadeAnimate>
                </Container>


            </main>
            <Container fluid textAlign="center" style={sliderStyle}>
                <FadeAnimate delay={1000} left>
                    <Fade />

                </FadeAnimate>

            </Container>


            <div style={grid}>
                <GridExampleDividedNumber />

            </div>

        </div>
    )
}


export default MainPage;