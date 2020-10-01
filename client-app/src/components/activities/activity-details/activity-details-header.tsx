import { format } from 'date-fns';
import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white' 
};

interface Iprops {
    activity: IActivity;
}

export const ActivityDetailsHeader : React.FC<Iprops> = ({activity}) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
            <Image src={`${window.location.origin.toString()}/assets/images/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle}/>
            <Segment basic style={activityImageTextStyle}>
                <Item.Group>
                <Item>
                    <Item.Content>
                    <Header
                        size='huge'
                        content={activity.title}
                        style={{ color: 'white' }}
                    />
                    <p>{format(activity.date, 'eeee do MMMM')}</p>
                    <p>
                        Hosted by <strong>Bob</strong>
                    </p>
                    </Item.Content>
                </Item>
                </Item.Group>
            </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
            <Button color='teal'>Join Activity</Button>
            <Button>Cancel attendance</Button>
            <Button 
                color='orange' 
                floated='right'
                as={Link}
                to={`/manage/${activity.id}`}
            >
                Manage Event
            </Button>
            </Segment>
        </Segment.Group>
    )
}
