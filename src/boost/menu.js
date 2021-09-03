import React, { useEffect, useState } from 'react'
import { Tab, Image, Button, Icon, Container } from 'semantic-ui-react';
import CalcBoost from "./calcBoost.js";
import CalibrationCalc from "./calibration.js";
import Coach from "./coach.js";
import Low from "./Low.js";
import Other from "./other";



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

const menu = {
  pointing: true,
  secondary: true,
  borderless: false,
  fontSize: "150%",

  // left:"5%",
  style: {
    backgroundColor: "rgb(81, 0, 204, 0.65)",
  }
};


const MenuWithTabs = (props) => {

  const [tab, setTab] = useState(0)

  const handleTabChange = (e, { activeIndex }) => {
    setTab(activeIndex)
  }

  useEffect(() => {    
  }, [props.myConfig]);

  return (
    <Container>
      <Tab menu={menu} panes={panes} onTabChange={handleTabChange} />
      <div style={{ paddingTop: '10px' }} />
      <div hidden={!(tab === 0)}>
        <CalcBoost config={props.myConfig} handleStepChange={props.handleStepChange} />
      </div>
      <div hidden={!(tab === 1)}>
        <CalibrationCalc config={props.myConfig} handleStepChange={props.handleStepChange}/>
      </div>
      <div hidden={!(tab === 2)}>
        <Coach config={props.myConfig} handleStepChange={props.handleStepChange} />
      </div>
      <div hidden={!(tab === 3)}>
        <Low config={props.myConfig} handleStepChange={props.handleStepChange}/>
      </div>
      <div hidden={!(tab === 4)}>
        <Other config={props.myConfig} handleStepChange={props.handleStepChange}/>
      </div>
    </Container>
  )
}


export default MenuWithTabs;
