import React, { Component } from 'react'
import { Accordion, Icon, Button, Container, Segment, Header } from 'semantic-ui-react'

export default class AccordionFaq extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  render() {
    const { activeIndex } = this.state

    return (
      <Segment>
        <Header textAlign="center" as="h1"> ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ </Header>
        <Container>
          <Accordion style={{ width: "100%" }} styled>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Безопасно ли покупать услуги по бусту Dota 2?
        </Accordion.Title>

            <Accordion.Content active={activeIndex === 0}>
              <p>
                Абсолютно. Мы не используем запрещенные программы при выполнении услуг и принимаем все меры для безопасности вашего аккаунта.
          </p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          В безопасности ли мой инвентарь Steam?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <p>
                Да, наши бустеры сфокусированы только на работе и на качестве выполнения заказа, <br></br>
          также вы можете включить "Семейный просмотр", оставив из функции возможность только - "Играть в Dota 2", <br></br>
          таким образом у бустера не будет доступа к вашему инвентарю, а только к игре.
          </p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Сколько времени занимает процесс бустинга?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <p>
                Обычно нам удается повышать 300-400 + MMR в день, но это зависит от того, насколько высоко ваш желаемый рейтинг. <br />
          При высоких рангах выигрыш ниже, а скорость ускорения соответственно замедляется. В большинстве случаев мы начинаем бустинг в течение 5 минут после получения заказа.
          </p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 3}
              index={3}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Могу ли я узнать о вашей политике возврата?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <p>
                Если вы вдруг передумаете перед началом буста, то мы всегда готовы сделать полный возврат средств. Если процесс уже начат и вы хотите прервать его, мы готовы рассчитать частичное возмещение.
          </p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 4}
              index={4}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Могу ли я играть в Duo с бустером?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 4}>
              <p>
                Да, мы предоставляем такую услугу. Но такой тип повышения может занять больше времени из-за того, что он требует одновременной готовности вас и вашего бустера к игровой сессии.
          </p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 5}
              index={5}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Заказ еще не закончен, но я хотел бы сыграть на своем аккаунте. Является ли это возможным?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 5}>
              <p>
                Да, это возможно, если вы не играете в рейтинговые игры, пока бустинг не закончится. Вы также должны убедиться, что ваш бустер не играет в данный момент на вашем аккаунте.
          </p>
            </Accordion.Content>
            <Accordion.Title
              active={activeIndex === 6}
              index={6}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Если на моём аккаунте во время калибровки будет меньше побед, чем было гарантированно?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 6}>
              <p>
                Такие случаи очень редко происходят. А если происходят, то идёт полный возврат средств или буст 100 очков рейтинга за каждое поражение.
          </p>
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 7}
              index={7}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
          Где я могу посмотреть отзывы о вашем сервисе?
        </Accordion.Title>
            <Accordion.Content active={activeIndex === 7}>
              <p>
                Отзывов более 400, они размещены на разных площадках. <br></br>
           Можете ознакомиться с ними здесь: <br></br>
                <Button color="blue" onClick={() => window.open("https://funpay.ru/users/1085056/")}>FunPay</Button> <Button color="vk" onClick={() => window.open("https://vk.com/topic-187930680_41834234")}>Группа вКонтакте</Button>
                <Button color="olive" onClick={() => window.open("https://www.epicnpc.com/threads/%F0%9F%94%A50-9500-boost-calibration%E2%AD%90new-season-%E2%AD%90-covid-19%F0%9F%94%A5100-free-mmr%F0%9F%8E%81eu-us.1599575/")}>EpicNPC</Button>
              </p>
            </Accordion.Content>
          </Accordion>

        </Container>
      </Segment>

    )
  }
}