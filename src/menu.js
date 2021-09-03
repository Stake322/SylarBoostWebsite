import React, { Component } from 'react'
import { Container, Menu } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class MenuExampleText extends Component {
  state = { activeItem: 'БУСТ' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

      <Menu style={{marginLeft:"2% ", fontSize:"130%"}} color="violet" inverted size="massive" text pointing secondary>
        <Link to="boost">
          <Menu.Item
            name='БУСТ'
            active={activeItem === 'БУСТ'}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="boost">
          <Menu.Item
            name='КАЛИБРОВКА'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="boost">
          <Menu.Item
            name='ОБУЧЕНИЕ'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
        </Link>
        <Link to="accounts">
            <Menu.Item
              name='АККАУНТЫ'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
        </Link>

      </Menu>

    )
  }
}