import React, { useState } from 'react'
import { Tab, Container } from 'semantic-ui-react';
import CalcBoost from "./CalcBoost.js";
import CalibrationCalc from "./Calibration.js";
import Coach from "./Coach.js";
import Low from "./Low.js";
import Other from "./BattleCup";

const MenuWithTabs = (props) => {
    const [tab, setTab] = useState(0)

    const panes = [
        {//прописать стили внутри рендера
            menuItem: 'БУСТ'
        },
        {
            menuItem: 'КАЛИБРОВКА '
        },
        {
            menuItem: 'ОБУЧЕНИЕ',
        },
        {
            menuItem: 'ЛП',
        },
        {
            menuItem: 'БАТЛ КАП',
        }
    ]
    let font = "";

    if (props.Mobile){
         font = "120%"
    } else {
         font = "100%"
    }
    
    const menu = {
        pointing: true,
        secondary: true,
        borderless: false,
      
        style: {
            fontSize: font,
            backgroundColor: "rgb(81, 0, 204, 0.65)",
        }
    };

    const handleTabChange = (e, { activeIndex }) => setTab(activeIndex)

    return (
        <Container>
            <Tab menu={menu} panes={panes} onTabChange={handleTabChange} />
            <div style={{ paddingTop: '10px' }} />
            <div hidden={!(tab === 0)}>
                <CalcBoost config={props.myConfig} handleStepChange={props.handleStepChange} Mobile={props.Mobile} />
            </div>
            <div hidden={!(tab === 1)}>
                <CalibrationCalc config={props.myConfig} handleStepChange={props.handleStepChange} Mobile={props.Mobile} />
            </div>
            <div hidden={!(tab === 2)}>
                <Coach config={props.myConfig} handleStepChange={props.handleStepChange} Mobile={props.Mobile} />
            </div>
            <div hidden={!(tab === 3)}>
                <Low config={props.myConfig} handleStepChange={props.handleStepChange}  Mobile={props.Mobile}/>
            </div>
            <div hidden={!(tab === 4)}>
                <Other config={props.myConfig} handleStepChange={props.handleStepChange} Mobile={props.Mobile}/>
            </div>
        </Container>
    )
}

export default MenuWithTabs;
