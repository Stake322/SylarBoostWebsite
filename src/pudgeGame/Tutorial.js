import React, { useState, useEffect } from "react";
import { Header, Image } from 'semantic-ui-react';
import tide from "./resources/img/tide.jpg";
import crystal from "./resources/img/crystal.png";
import bounty from "./resources/img/bounty1.png";

export default function Tutorial() {

    return (
        <>
            <Header textAlign="center">
                Туториал
            </Header>
            <Image circular bordered size="tiny" src={crystal}  verticalAlign='middle' /> <span>ПЛЮС 15 ОЧКОВ</span>
            <Image circular bordered size="tiny" src={tide}  verticalAlign='middle' /> <span>МИНУС 15 ОЧКОВ</span>
            <Image  circular bordered size="tiny" src={bounty}  verticalAlign='middle' /> <span>ПЛЮС 10 СЕКУНД</span>
            
 
        </>
    )
}
