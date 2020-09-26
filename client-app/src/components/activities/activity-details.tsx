import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';

interface IProps {
  selectedActivity: IActivity;
  setEditMode: (editMode: boolean) =>  void;
  setSelectedActivity: (activity: IActivity | null) => void;
} 

const ActivityDetails: React.FC<IProps> = ({selectedActivity, setEditMode, setSelectedActivity}) => {

  return (
      <Card fluid>
      <Image src={`assets/images/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{selectedActivity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{selectedActivity.date}</span>
        </Card.Meta>
        <Card.Description>
          {selectedActivity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
            <Button onClick={() => setEditMode(true)} color="blue" content="Edit"/>
            <Button onClick={() => setSelectedActivity(null)}color="grey" content="Cancel"/>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails;
