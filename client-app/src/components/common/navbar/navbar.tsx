import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { createActivityButtonClick } from '../../../store/redux/activity/activity.action';
import { NavLink } from 'react-router-dom';

interface IStateProps {
    handleCreateActivityOnClick: () => void;
} 

const Navbar: React.FC<IStateProps> = ({handleCreateActivityOnClick}) => {
    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header as={NavLink} exact to="/">
                        <img src={`${window.location.origin.toString()}/assets/images/logo.png`} alt="logo" style={{marginRight: "10px"}}/>
                        Activity Book
                    </Menu.Item>
                    <Menu.Item
                    name='Activities'
                    as={NavLink}
                    to="/activity"
                    />
                    <Menu.Item as={NavLink} to="/create">
                        <Button onClick={handleCreateActivityOnClick} positive content="Add Activity"/>
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}

const mapDispatchTopProps = (dispatch: any) => ({
    handleCreateActivityOnClick: () => dispatch(createActivityButtonClick()),
});

export default connect(null, mapDispatchTopProps)(Navbar);
