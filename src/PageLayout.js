import React from 'react'
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
    return (
        <Media greaterThan='mobile' >
            <div style={{ marginTop: "89px" }}>
                <h1>Desktop</h1>
            </div>
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    return (
        <Media at='mobile'>
            <div style={{ marginTop: "89px" }}>
                <h2>Mobile</h2>
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


const PageLayout = () => {
    return (
        <ResponsiveContainer />
    )
}

export default PageLayout