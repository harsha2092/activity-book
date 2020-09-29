import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import {connect} from 'react-redux';
import {deleteActivity, selectActivity} from '../../store/redux/activity/activity.action';
import { IGlobalState } from '../../store/redux/rootReducer';
import { NavLink } from 'react-router-dom';

interface IProps {
    activities: IActivity[];
}

interface StateProps {
    activityIdBeingDeleted: string | null;
    handleDeleteActivity: (event:React.MouseEvent<HTMLButtonElement>, id: string) => void;
    isActivityDeleting: boolean,
}

const ActivityList: React.FC<IProps & StateProps> = ({activities, handleDeleteActivity, activityIdBeingDeleted, isActivityDeleting}) => {
    return (
    <Segment clearing>
        <Item.Group divided>
            {activities.map(activity => (
                <Item key={activity.id}>
                <Item.Content>
                    <Item.Header as='a'>{activity.title}</Item.Header>
                    <Item.Meta>{activity.date}</Item.Meta>
                    <Item.Description>
                        <div>{activity.description}</div>
                        <div>{activity.city}, {activity.venue}</div>
                    </Item.Description>
                    <Item.Extra>
                        <Button 
                            floated="right" 
                            color="blue" 
                            content="view" 
                            as={NavLink}
                            to={`/activity/${activity.id}`}
                        />
                        <Button
                            name={activity.id}
                            loading={activity.id === activityIdBeingDeleted ? isActivityDeleting : false}
                            floated="right"
                            color="red"
                            content="delete"
                            onClick={(event) => handleDeleteActivity(event, activity.id)}/>
                        <Label basic content={activity.category}/>
                    </Item.Extra>
                </Item.Content>
            </Item>
            ))}
        </Item.Group>    
    </Segment>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    handleDeleteActivity: (event: React.MouseEvent<HTMLButtonElement>, id: string) => dispatch(deleteActivity(event, id)),
})

const mapStateToProps = (state: IGlobalState) => ({
    activityIdBeingDeleted: state.activity.activityBeingDeleted, 
    isActivityDeleting: state.activity.isDeletingActivity,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityList);
