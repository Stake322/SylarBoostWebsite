import React from "react";
import Typed from 'typed.js';
import { Container } from 'semantic-ui-react'

class TypedReactDemo extends React.Component {
  componentDidMount() {
    const { strings } = this.props;
    const { font } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 50,
      backSpeed: 50,
    };

    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }
  render() {
    const styleText = {
      fontSize: "180%",
      color: "#FDFDFF",
      // paddingLeft:"50%",
      position: "relative",
      top: "50%",
    },


      styleDiv = {//space
        height: "150px",
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

