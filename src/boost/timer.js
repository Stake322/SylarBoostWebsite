import React, { useEffect, useState } from "react";
import * as api from "../api";
import { Button, Container } from 'semantic-ui-react'



const deadLine = "2021-06-11";
const config = require('./config.json');
const discount = +config.price_modificators.promocode;


function Timer() {

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(deadLine) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        "ds": Math.floor(difference / (1000 * 60 * 60 * 24)),
        "hs": Math.floor((difference / (1000 * 60 * 60)) % 24),
        "ms": Math.floor((difference / 1000 / 60) % 60),
        "ss": Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timeout);
  });


  const timerStyle = {
    textAlign: "center"
  },
    textStyle = {
      textAlign: "center",
      fontSize: "180%",
      color: "black"
    },
    textStyle1 = {
      textAlign: "center",
      fontSize: "150%",
      color: "black"
    },
    textStyle2 = {
      textAlign: "center",
      fontSize: "135%",
      color: "black",
      paddingLeft: "10%"
    },
    buttonStyle = {
      marginLeft: "42%"

    }

  const timerComponents = [];


  Object.keys(timeLeft).forEach((interval) => {


    function dispZero() {
      if (timeLeft[interval] < 10) {
        return (
          <span style={textStyle}>
            0{timeLeft[interval]} {interval}{" "}
          </span>
        );
      } else {
        return (
          <span style={textStyle}>
            {timeLeft[interval]} {interval}{" "}
          </span>
        )
      }
    }


    timerComponents.push(dispZero());
  });


  if (timerComponents.length) {
    return (
      <div style={timerStyle}>
        <h3 style={textStyle}>СКИДКА {discount}% НА ВСЕ УСЛУГИ</h3>
        <h2 style={textStyle}>АКЦИЯ БУДЕТ ДЛИТЬСЯ:</h2>
        {timerComponents.length ? timerComponents : <span style={textStyle}>ВРЕМЯ АКЦИИ ИСТЕКЛО</span>}
        <h3 style={textStyle1}>ПО ПРОМОКОДУ "MAMAUDOTA"</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={textStyle2}>ВРЕМЯ АКЦИИ ИСТЕКЛО, НО НЕСКОЛЬКО СЕКРЕТНЫХ ПРОМОКОДОВ МОГУТ БЫТЬ В ГРУППЕ ВКОНТАКТЕ</h3>
        <Button style={buttonStyle} color="vk" onClick={() => window.open("https://vk.com/topic-187930680_41834234")}>Перейти</Button>
      </div>
    )

  }


}

export default Timer;