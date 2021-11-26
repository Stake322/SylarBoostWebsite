import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class TopMenu extends Component {
    state = { activeItem: '213' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu style={{ marginLeft: "2% ", fontSize: "130%" }} color="violet" inverted size="massive" text pointing secondary>
                <Link to="boost">
                    <Menu.Item
                        name='БУСТ'
                        active={activeItem === '1'}
                        onClick={this.handleItemClick}
                    />
                </Link>
                <Link to="boost">
                    <Menu.Item
                        name='КАЛИБРОВКА'
                        active={activeItem === '2'}
                        onClick={this.handleItemClick}
                    />
                </Link>
                <Link to="boost">
                    <Menu.Item
                        name='ОБУЧЕНИЕ'
                        active={activeItem === '3'}
                        onClick={this.handleItemClick}
                    />
                </Link>
                <Link to="accounts">
                    <Menu.Item
                        name='АККАУНТЫ'
                        active={activeItem === '4'}
                        onClick={this.handleItemClick}
                    />
                </Link>
            </Menu>
        )
    }
}

export default TopMenu