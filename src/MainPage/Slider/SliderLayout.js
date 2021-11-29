import React from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'

import SliderDesktop from "./SliderDesktop";
import SliderMobile from './SliderMobile';

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
            <SliderDesktop />
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    return (
        <Media at='mobile'>
            <SliderMobile />
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


const SliderLayout = () => {
    return (
        <ResponsiveContainer />
    )
}

export default SliderLayout