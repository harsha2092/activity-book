import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'

interface IProps {
    activity: IActivity;
    activityIdBeingDeleted: string | null;
    isActivityDeleting: boolean;
    handleDeleteActivity: (event:React.MouseEvent<HTMLButtonElement>, id: string) => void;
} 

export const ActivityListItem : React.FC<IProps> = ({activity, activityIdBeingDeleted, isActivityDeleting, handleDeleteActivity}) => {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" src={`${window.location.origin.toString()}/assets/images/user.png`} />
                        <Item.Content>
                            <Item.Header>{activity.title}</Item.Header>
                            <Item.Meta>Hosted by Bob</Item.Meta>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name="clock" />
                {activity.date}
                <Icon name="marker"/>
                {activity.city}, {activity.venue}
            </Segment>
            <Segment secondary>
                Attendees will go here
            </Segment>
            <Segment clearing>
                {activity.description}
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
            </Segment>
        </Segment.Group>
    )
}
