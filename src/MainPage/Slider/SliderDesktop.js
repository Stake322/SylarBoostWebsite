import React, { Component } from "react";
import Slider from "react-slick";
import { Container, Image, Label } from "semantic-ui-react";
import someIgame1 from "../../img/1.jpg";
import someIgame2 from "../../img/2.jpg";
import someIgame3 from "../../img/3.jpg";
import someIgame4 from "../../img/4.png";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        />
    );
}


class Fade extends Component {
    render() {
        const h2 = {
            color: "#F0DBD1",
            textAlign: "center"
        }
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
        };
        return (
            <Container>
                <h2 style={h2}>Последние выполненные работы:</h2>
                <Slider {...settings}>
                    <div>
                        <Image src={someIgame1} />
                        <Label size="huge" color="black" attached="bottom">Буст: 5000-6300</Label>
                    </div>
                    <div>
                        <Image src={someIgame2} />
                        <Label size="huge" color="black" attached="bottom">Буст: 5500-7000</Label>
                    </div>
                    <div>
                        <Image src={someIgame3} />
                        <Label size="huge" color="black" attached="bottom">Буст: 6000-6500</Label>
                    </div>
                    <div>
                        <Image src={someIgame4} />
                        <Label size="huge" color="black" attached="bottom">Калибровка: 10-0</Label>
                    </div>
                </Slider>
            </Container>
        );
    }
}

export default Fade