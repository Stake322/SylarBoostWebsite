import React from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'

import Accs from './Accs'

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
            <Accs />
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    const Mobile = true;
    return (
        <Media at='mobile'>
            <Accs Mobile={Mobile} />
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