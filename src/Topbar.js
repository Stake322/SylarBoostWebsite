import React from 'react'
import { AppBar, Container, Toolbar, Box } from '@material-ui/core';
import { Image, Button, } from 'semantic-ui-react';
import disc from './resources/discord.png';
import TopMenu from './TopMenu.js';
import { Link } from "react-router-dom";

const TopBar = () => {
    const appbar = {
        backgroundColor: "#36274C",
        height: "10%"
    }
    const buttonStyle = { marginLeft: "15%" }
    return (
        <div>
            <AppBar style={appbar} position="fixed">
                <Container fixed>
                    <Toolbar>
                        <Link to="/">
                            <Image verticalAlign="middle" style={{ marginTop: "2%" }} as="a" src={disc} size="tiny" floated='left' />
                        </Link>
                        <TopMenu />
                        <Box floated="left" style={buttonStyle}>
                            <Link to="/youtube">
                                <Button  floated="right" size="medium" color="red" icon="youtube" content="Youtube" />
                            </Link>
                        </Box>
                        {/* <Link to="/twitch">
                            <Button size="medium" color="violet" icon="twitch" content="Twitch" />
                        </Link> */}
                        <Link to="/faq">
                            <Button floated="right" size="medium" color="purple" icon="question" content="FAQ" />
                        </Link>
                        {/* <Box style={buttonStyle}>
                            <Button size="medium" color="orange" icon="pencil alternate" content="Вопросы и предложения" />
                        </Box> */}

                            <Link to="/pudge">
                                <Button   floated="right" size="medium" color="pink" icon="play" content="Pudge" />
                            </Link>

                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}

export default TopBar;