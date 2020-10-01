import React, {useEffect} from 'react'
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import {connect} from 'react-redux';
import { getActivity } from '../../../store/redux/activity/activity.action';
import { RouteComponentProps } from 'react-router-dom';
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
  getActivity}) => {

  useEffect(() => {
      getActivity(match.params.id);
  }, [getActivity, match.params.id])
  
  { return isLoadingActivity ? <LoadingComponent content="Loading Activity" /> 
  : selectedActivity ? (
    <Grid>
      <Grid.Column width={10}>
          <ActivityDetailsHeader activity={selectedActivity}/>
          <ActivityDetailsInfo activity={selectedActivity}/>
          <ActivityDetailsChat/>
      </Grid.Column>
      <Grid.Column width={6}>
          <ActivityDetailsSideBar/>
      </Grid.Column>
    </Grid>
    ) : (
      <div>Activity Not found</div>
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
