import React, {useEffect} from 'react'
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import ActivityList from './activity-list/activity-list';
import {connect} from 'react-redux';
import {IGlobalState} from '../../store/redux/rootReducer';
import { getActivities } from '../../store/redux/activity/activity.action';
import { LoadingComponent } from '../common/loading/loading';

interface IStateProps {
    activities: IActivity[],
    selectedActivity: IActivity | null;
    isLoadingActivities: boolean;
    getActivities: () => void
}

const ActivityDashboard: React.FC<IStateProps> = ({ 
    activities,
    isLoadingActivities,
    getActivities
}) => {

    useEffect(() => {
        getActivities();
  }, [getActivities]);


    { return isLoadingActivities ? <LoadingComponent content={"Loading List"}/> 
    : (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities}/>
            </Grid.Column>
            { activities && activities.length > 0 && <Grid.Column width={6}>
                <h1>Activity filters</h1>
            </Grid.Column>}
        </Grid>
      )
    }
}

const mapDispatchTopProps = (dispatch: any) => ({
    getActivities: () => dispatch(getActivities()),
});

const mapStateToProps = (state: IGlobalState) => ({
    activities : state.activity.activities,
    isLoadingActivities: state.activity.isLoadingActivities
});

export default connect(mapStateToProps, mapDispatchTopProps)(ActivityDashboard);