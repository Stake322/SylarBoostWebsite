import React from 'react'
import { Grid, Image, Rating, Container, Segment,Divider } from 'semantic-ui-react'
import anon from "./img/anon.png";
import gachi from "./img/UxfvdCsEkAc.jpg";


const styleText = {
  // fontSize: "130%",
  // textAlign: "center",
  // marginLeft: "auto",
  // marginRight: "auto",
  // position: "absolute",
  // color: "white"

},
  styleDiv = {
    // alingItems: "center",
    // marginTop: "1%",
    // marginBottom: "2%",
    // marginLeft: "auto",
    // marginRight: "auto",

  },
  h3Style = {
    fontSize: "120%",
    color: "#443258"
  },
  h2Style = {
    fontSize: "200%",
    color: "#4A2545",
  },
  segmentStyle = {
    backgroundColor: "#F0DBD1"
  },
  textCss= {
    color:"4A2545",
    fontSize:"110%"
  }

const GridExampleDividedNumber = () => (
  <Container>
    <Segment style={segmentStyle} >
      <Grid textAlign="center" columns={2} divided>
        <h2 style={h2Style}>
          Последние отзывы:
          </h2>
        <Grid.Row >
          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>Ca***GGUN26</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В этом месяце</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=3"} />
              </Grid.Column>
              <Grid.Column textAlign="center" width={10}>
                <p style={textCss}>Классный буст, заказал быстро сделали 4500-5000</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          

          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>Ln***od</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В этом месяце</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=5"} />
              </Grid.Column>
              <Grid.Column textAlign="center" width={10}>
                <p style={textCss}>Заказывал обучение, после первой тренировки апнул 500 ммр за неделю</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

        </Grid.Row>
        
        <Divider/>
        
        <Grid.Row>
          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>l**kan</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В этом месяце</p>

              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=10"} />
              </Grid.Column>
              <Grid.Column textAlign="center" width={10}>
                <p style={textCss}>Очень круто все объяснил, много важных вещей, ответил на все вопросы, крайне продуктивно провел время с этим бустером/тренером, хороший сервис, все по описанию тренировки, если думаете заказать тренировку на каком-то герое,
                то это я думаю лучший тренер, так как рассказал действительно многое. Что важно, что после тренировки бесплатная консультация,
            если что-то не понятно, то можно писать, ответит, расскажет </p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>Aleks***18304</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В этом месяце</p>

              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=15"} />
              </Grid.Column>
              <Grid.Column textAlign="center" width={10}>
                <p style={textCss}> 9-1 калибровка 5400 аккаунта, плюс четыреста ммр. Сделал быстро.</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>

        </Grid.Row>
        
        <Divider/>

        <Grid.Row>
          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>A***agi</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В прошлом месяце</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=13"} />
              </Grid.Column>
              <Grid.Column textAlign="center" width={10}>
                <p style={textCss}>  Всё было круто. Всем рекомендую.
            Ставлю этому водителю 5 звёзд!</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>


          <Grid.Column width={8}>
            <Grid textAlign="center">
              <Grid.Column width={6}>
                <p style={h3Style}>w***s1</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <p style={h3Style}>В прошлом месяце</p>

              </Grid.Column>
              <Grid.Column width={6}>
                <Rating disabled icon='star' size="huge" defaultRating={5} maxRating={5} />
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={4}>
                <Image circular size="tiny" src={"https://i.pravatar.cc/300?img=23"} />
              </Grid.Column>
              <Grid.Column textAlign='center' width={10}>
                <p style={textCss}>Отличная тренировка, узнал много нового, получил детальный разбор игры и хорошие советы по улучшению игры. На все вопросы максимально развёрнутые ответы!</p>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

  </Container>



)

export default GridExampleDividedNumber
