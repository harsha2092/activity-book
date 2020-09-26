import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface IProps {
    handleCreateActivityOnClick: () => void;
} 

const Navbar: React.FC<IProps> = ({handleCreateActivityOnClick}) => {
    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <img src="assets/images/logo.png" alt="logo" style={{marginRight: "10px"}}/>
                        Activity Book
                    </Menu.Item>
                    <Menu.Item
                    name='Activities'
                    />
                    <Menu.Item>
                        <Button onClick={handleCreateActivityOnClick} positive content="Add Activity"/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

export default Navbar;
