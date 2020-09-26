import React from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';


interface IProps {
    activities: IActivity[];
    handleSelectActivity: (id: string) => void;
    handleDeleteActivity: (event:React.MouseEvent<HTMLButtonElement>, id: string) => void;
    submitting: boolean;
    target: string;
}

const ActivityList: React.FC<IProps> = ({activities, handleSelectActivity, handleDeleteActivity, submitting, target}) => {
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
                        <Button
                            name={activity.id}
                            loading={activity.id === target ? submitting : false}
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

export default ActivityList;
