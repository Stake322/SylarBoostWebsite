import React from "react";
import { Container, Menu, Segment, Image, Sticky, Grid } from 'semantic-ui-react'
import rub from "../img/youtubeIMG/1.png";
import voker from "../img/youtubeIMG/6.png";
import slark from "../img/youtubeIMG/4.png";
import luna from "../img/youtubeIMG/7.png";



const Youtube = () => {
    const fBlock = {
        backgroundColor: "white",
        height: "300px",
        // opacity: '100%',
        // display: "flex",
        // position: 'relative',
        position: 'sticky',
        top: "90px",
        marginTop: "20px"
    }
    const sBlock = {
        backgroundColor: "white",
        height: "300px",
        opacity: '100%',
        position: 'sticky',
        bottom: "0px",
        marginTop: "20px"


    }
    const firstBackStyle = {
        backgroundImage: 'url(https://static-prod.weplay.tv/2020-02-20/f6914cc23f4ed2ca08e28b74b51dc57c_large_cover.191518-81B7B8-447A90.jpeg',
        height: "720px"

    }
    const secondBackStyle = {
        backgroundImage: 'url(https://static-prod.weplay.tv/2020-02-20/f6914cc23f4ed2ca08e28b74b51dc57c_large_cover.191518-81B7B8-447A90.jpeg',
        height: "600px"

    }
    const tBlock = {
        backgroundColor: "white",
        height: "300px",
        position: 'sticky',
        top: "90px",
        marginTop: "300px",
    }
    const frBlock = {
        backgroundColor: "white",
        height: "600px",
        opacity: '100%',
        position: 'sticky',
        // bottom: "0px",
        // marginTop: "0px"
    }
    return (
        <div>
            <div style={firstBackStyle}>
                <div style={fBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit.
                                </p>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image size="huge" src={rub} />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
                <div style={{ opacity: "0%", height: "400px", backgroundColor: "red", }}>
                </div>
                <div style={sBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={4}>
                                <Image size="huge" src={voker} />
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit.
                                </p>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            </div>
            <div style={secondBackStyle}>
                <div style={tBlock}>
                    <Container textAlign="center">
                        <Grid>
                            <Grid.Column width={12}>
                                <p style={{ fontSize: "130%" }}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                    nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                    tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                    quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                    sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                    recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                    minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit.
                                </p>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Image size="huge" src={slark} />
                            </Grid.Column>
                        </Grid>
                    </Container>
                </div>
            </div>
            <div style={{ opacity: "50%", height: "0px", backgroundColor: "red", }}>
            </div>
            <div style={frBlock}>
                <Container textAlign="center">
                    <Grid>
                        <Grid.Column width={4}>
                            <Image size="huge" src={luna} />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <p style={{ fontSize: "130%" }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                recusandae alias error harum maxime adipisci amet laborum. Perspiciatis
                                minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit.
                            </p>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}
export default Youtube