import React from 'react'
import { AppBar, Container, Toolbar, Box } from '@material-ui/core';
import 'semantic-ui-css/semantic.min.css';
import { Image, Button, } from 'semantic-ui-react';
import disc from './resources/discord.png';
import MenuService from './menu.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const appbar = {
    backgroundColor: "#36274C",
    height: "10%"
},
    buttonStyle = {
        marginLeft: "15%",
    }
const TopBar = () => {
    return (
        <div>
            <AppBar style={appbar} position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Link to="/">
                            <Image verticalAlign="middle" style={{marginTop:"2%"}} as="a" src={disc} size="tiny" floated='left' />
                        </Link>
                            <MenuService  />
                        <Box floated="left" style={buttonStyle}>
                            <Link to="/youtube">
                                <Button size="medium" color="red" icon="youtube" content="Youtube" />
                            </Link>
                        </Box>
                            <Link to="/twitch">
                                <Button size="medium" color="violet" icon="twitch" content="Twitch" />
                            </Link>
                            <Link to="/faq">
                                <Button floated="right" size="medium" color="purple" icon="question" content="FAQ" />
                            </Link>
                        {/* <Box style={buttonStyle}>
                            <Button size="medium" color="orange" icon="pencil alternate" content="Вопросы и предложения" />

                        </Box>
                        <Box style={buttonStyle}>
                            <Button size="medium" color="pink" icon="play" content="Поиграй с Pudge" />

                        </Box> */}








                    </Toolbar>
                </Container>

            </AppBar>
        </div>
    )

}
export default TopBar;