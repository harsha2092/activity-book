import React, { Fragment } from 'react'
import { Label } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import {connect} from 'react-redux';
import {deleteActivity, groupSortedActivitiesByDate} from '../../../store/redux/activity/activity.action';
import { IGlobalState } from '../../../store/redux/rootReducer';
import { ActivityListItemGroup } from './activity-list-item-group';

interface IProps {
    activities: IActivity[];
}

interface StateProps {
    activityIdBeingDeleted: string | null;
    handleDeleteActivity: (event:React.MouseEvent<HTMLButtonElement>, id: string) => void;
    isActivityDeleting: boolean,
}

const ActivityList: React.FC<IProps & StateProps> = ({activities, handleDeleteActivity, activityIdBeingDeleted, isActivityDeleting}) => {
    const groupedActivities = groupSortedActivitiesByDate(activities);
    console.log(`groupedActivities: ${JSON.stringify(groupedActivities)}`);
    return (
        <Fragment>
            {
                groupedActivities && Object.keys(groupedActivities).length > 0 ? Object.keys(groupedActivities).map((date: string) => {
                    return (
                        <Fragment key={date}>
                            <Label size="large" color="blue">
                                {date}
                            </Label>
                            <ActivityListItemGroup
                                handleDeleteActivity={handleDeleteActivity}
                                activityIdBeingDeleted={activityIdBeingDeleted}
                                isActivityDeleting= {isActivityDeleting}    
                                groupedActivities ={groupedActivities[date]}
                            />
                        </Fragment>
                        )
                }) :  <h1>Activities not loaded</h1>
            }
        </Fragment>
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
