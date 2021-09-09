import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class TopMenu extends Component {
    state = { activeItem: 'БУСТ' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Menu style={{ marginLeft: "2% ", fontSize: "130%" }} color="violet" inverted size="massive" text pointing secondary>
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

export default TopMenu