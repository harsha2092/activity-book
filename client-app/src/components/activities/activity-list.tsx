import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';


interface IProps {
    activities: IActivity[];
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;
}

const ActivityList: React.FC<IProps> = ({activities, handleSelectActivity, handleDeleteActivity}) => {
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
                        <Button floated="right" color="blue" content="view" onClick={() => handleSelectActivity(activity.id)}/>
                        <Button floated="right" color="red" content="delete" onClick={() => handleDeleteActivity(activity.id)}/>
                        <Label basic content={activity.category}/>
                    </Item.Extra>
                </Item.Content>
            </Item>
            ))}
        </Item.Group>    
    </Segment>
    )
}

export default ActivityList;
