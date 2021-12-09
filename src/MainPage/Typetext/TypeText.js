import React, { useState, useEffect } from 'react'
import { createMedia } from '@artsy/fresnel'
import PropTypes from 'prop-types'
import TypedReactDemo from "./FlexText.js";



const { MediaContextProvider, Media } = createMedia({
    breakpoints: {
        mobile: 0,
        tablet: 768,
        computer: 1024,
    }
})


const DesktopContainer = (props) => {
    const [nick, setNick] = useState(localStorage.getItem("nickName") || "красавчик");

    const someStyle = {
        backgroundImage: "url(https://99px.ru/sstorage/56/2018/12/11312181905353276.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
    const font = "200%";
    return (
        <Media greaterThan='mobile' >

            <div style={someStyle} >
                <TypedReactDemo
                    strings={[
                        `Сверху можно заказать услуги, <strong> ${nick}<strong>`,
                        `Также поиграй в игру <strong> Пьюдж Варс<strong>`,
                        `Воспользуйся моими услугами, <strong> ${nick}<strong>`
                    ]}
                    font={`200%`}
                />
            </div>
        </Media>
    )
}

DesktopContainer.propTypes = {
    children: PropTypes.node,
}

const MobileContainer = (props) => {
    const font = "80%";
    return (
        <Media at='mobile'>
            <div basic style={{
                width: "100%", backgroundImage: "url(https://99px.ru/sstorage/56/2018/12/11312181905353276.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}>
                <TypedReactDemo strings={[
                    `Пора воспользоваться моими услугами`
                ]} font={`80%`} />
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


const TypeText = () => {
    return (
        <ResponsiveContainer />
    )
}

export default TypeText