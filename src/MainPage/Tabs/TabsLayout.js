import React from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import TabExamplePointing from './TabsDesktop' 
import TabMobile from './TabMobile'

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
            <TabExamplePointing/>
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    return (
        <Media at='mobile'>
           <TabMobile/>
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


const TabLayout = () => {
    return (
        <ResponsiveContainer />
    )
}

export default TabLayout

