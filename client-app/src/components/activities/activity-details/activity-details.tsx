import React, {useEffect} from 'react'
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import {connect} from 'react-redux';
import { getActivity, selectActivity } from '../../../store/redux/activity/activity.action';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { IGlobalState } from '../../../store/redux/rootReducer';
import { LoadingComponent } from '../../common/loading/loading';
import { ActivityDetailsHeader } from './activity-details-header';
import { ActivityDetailsInfo } from './activity-details-info';
import { ActivityDetailsChat } from './activity-details-chat';
import { ActivityDetailsSideBar } from './activity-details-sidebar';


interface IStateProps {
  getActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  isLoadingActivity: boolean
}

interface routeParams {
  id: string;
}

const ActivityDetails: React.FC<IStateProps & RouteComponentProps<routeParams>> = ({
  selectedActivity, 
  match,
  isLoadingActivity,
  getActivity,
  history
}) => {

  useEffect(() => {
      getActivity(match.params.id);
  }, [getActivity, match.params.id])
  
  { return isLoadingActivity || !selectedActivity ? <LoadingComponent content="Loading Activity" /> 
  : (
    <Grid>
      <Grid.Column width={10}>
          <ActivityDetailsHeader activity={selectedActivity}/>
          <ActivityDetailsInfo acitivity={selectedActivity}/>
          <ActivityDetailsChat/>
      </Grid.Column>
      <Grid.Column width={6}>
          <ActivityDetailsSideBar/>
      </Grid.Column>
    </Grid>

      // <Card fluid>
      //   {/* TODO: NEED TO CHANGE THIS WINDOW LOCATION THING TO SOMETGHING ELSE */}
      //   <Image src={`${window.location.origin.toString()}/assets/images/categoryImages/${selectedActivity.category}.jpg`} wrapped ui={false} />
      //   <Card.Content>
      //     <Card.Header>{selectedActivity.title}</Card.Header>
      //     <Card.Meta>
      //       <span className='date'>{selectedActivity.date}</span>
      //     </Card.Meta>
      //     <Card.Description>
      //       {selectedActivity.description}
      //     </Card.Description>
      //   </Card.Content>
      //   <Card.Content extra>
      //     <Button.Group widths={2}>
      //         <Button 
      //           as={NavLink}
      //           to={`/manage/${selectedActivity.id}`}
      //           color="blue" 
      //           content="Edit"/>
      //         <Button onClick={() => history.push("/activity")} color="grey" content="Cancel"/>
      //     </Button.Group>
      //   </Card.Content>
      // </Card>
    )
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  selectedActivity: state.activity.selectedActivity,
  isLoadingActivity: state.activity.isLoadingActivity
});

const mapDispatchTopProps = (dispatch: any) => ({
  getActivity: (id: string) => dispatch(getActivity(id))
});

export default connect(mapStateToProps, mapDispatchTopProps)(ActivityDetails);