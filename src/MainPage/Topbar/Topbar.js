import React, { useState } from 'react'
import { AppBar, Container, Toolbar, Box } from '@material-ui/core';
import {
    Image, Button, Checkbox,
    Grid,
    Header,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react';
import disc from '../../resources/discord.png';
import TopMenu from './TopMenu.js';
import { Link } from "react-router-dom";
import topImage from '../../resources/original.jpg'

//PageLayout
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'


const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    }
})


const DesktopContainer = (props) => {
    const appbar = {
        backgroundColor: "#36274C",
        height: "10%"
    }
    const buttonStyle = { marginLeft: "15%" }
    return (
        <Media greaterThan='mobile' >
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
                                    <Button floated="right" size="medium" color="red" icon="youtube" content="Youtube" />
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
                                <Button floated="right" size="medium" color="pink" icon="play" content="Pudge" />
                            </Link>

                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
            <div style={{ paddingBottom: "4.5%" }} >
            </div>
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {

    const [activeItem, setActiveItem] = useState("123");
    const handleItemClick = (e, { name }) => setActiveItem(name);

    return (
        <Media at='mobile' >
            <div style={{ backgroundImage: "url(https://99px.ru/sstorage/56/2018/12/11312181905353276.jpg)" }}>
                <Segment size="tiny" inverted color="purple" style={{ backgroundImage: `url(${topImage})`, fontSize: "100%", display: "grid", placeItems: "center" }}>
                    <Menu size="mini" inverted secondary >
                        <Link to="/">
                            <Menu.Item
                                name='ГЛАВНАЯ'
                                active={activeItem === 'home'}
                                onClick={handleItemClick}
                            />
                        </Link>
                        <Link to="/boost">
                            <Menu.Item
                                name='УСЛУГИ'
                                active={activeItem === 'messages'}
                                onClick={handleItemClick}
                            />
                        </Link>
                        <Link to="/accounts">
                            <Menu.Item
                                name='АККАУНТЫ'
                                active={activeItem === 'friends'}
                                onClick={handleItemClick}
                            />
                        </Link>
                        <Link to="/faq">
                            <Menu.Item
                                name='FAQ'
                                active={activeItem === 'friends'}
                                onClick={handleItemClick}
                            />
                        </Link>
                    </Menu>
                </Segment>
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


const Topbar = () => {
    return (
        <ResponsiveContainer />
    )
}

export default Topbar;
