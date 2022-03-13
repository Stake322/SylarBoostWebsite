import React, { useState, useEffect } from 'react'
import { Header, Image, Segment, Transition } from 'semantic-ui-react';
import spirit from "../../img/mainpage/Void_Spirit.png"
import './style.css';

const TopCard = () => {
    const [offset, setOffset] = useState(0);
    const [visible, setVisible] = useState(false);
    const [lax, setLax] = useState();
    const [fz, setFZ] = useState(50);
    const [left, setLeft] = useState(22);

    useEffect(() => {
        window.onscroll = () => setOffset(window.pageYOffset)
        if (offset > 10) setVisible(true);
        setFZ(70 + offset);
        if (left < 50) setLeft(22 + (offset / 10))


    }, [offset])



    const parallax = (event) => {
        setLax(event.clientX + event.clientY)
    }

    const styleVoid = {
        position: 'absolute',
        top: '40%',
        transform: `translate(${lax / 100}px,${lax / 80}px)`,
        width: '40%',
        left: '60%'
    }
    const styleBerg = {
        transform: `translate(${lax / 700}px,-${lax / 700}px)`

    }
    const styleHeader = {
        zIndex: "0",
        color: 'white',
        position: 'absolute',
        fontSize: `${fz}%`,
        top: '55%',
        left: `${left}%`

    }

    return (
        <div className='wrapper' >
            <div className='bg_main item' onMouseMove={parallax}>
                <Header as='h1' style={styleHeader}>Закажи наши услуги</Header>
                <div className='bg_berg item' style={styleBerg} >
                    <Transition animation="fade left" duration='1350' visible={visible}>
                        <Image src={spirit} size='huge' floated='right' style={styleVoid} />
                    </Transition>
                </div>
            </div>
        </div>

    )
}

export default TopCard