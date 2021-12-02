import React from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'

import AccsDesktop from './AccsDesktop'
import AccsMobile from "./AccsMobile.js"

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
            <AccsDesktop />
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    return (
        <Media at='mobile'>
            <AccsMobile />
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


const AccsLayout = () => {
    return (
        <ResponsiveContainer />
    )
}

export default AccsLayout;