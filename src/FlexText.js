import React from "react";
import Typed from 'typed.js';
import space from "./img/space.jpg";
import { Container } from 'semantic-ui-react'

class TypedReactDemo extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 50
    };

    this.typed = new Typed(this.el, options);
  }
  componentWillUnmount() {
    this.typed.destroy();
  }
  render() {
    const styleText = {
      fontSize: "200%",
      color: "#FDFDFF",
      // paddingLeft:"50%",
      position: "relative",
      top: "50%",
    },


    styleDiv = {//space
      backgroundImage: "url(https://99px.ru/sstorage/56/2018/12/11312181905353276.jpg)",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "150px",
      width: "100%",
      position: "relative"
    }


    return (
      <Container textAlign="center" fluid style={styleDiv}>

        <span
          style={styleText}
          ref={(el) => { this.el = el; }}
        />

      </Container>
     
    );
  }
}

export default TypedReactDemo;