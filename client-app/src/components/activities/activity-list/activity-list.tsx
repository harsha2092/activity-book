import React, { Fragment } from 'react'
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../models/activity';
import {connect} from 'react-redux';
import {deleteActivity, groupSortedActivitiesByDate, selectActivity} from '../../../store/redux/activity/activity.action';
import { IGlobalState } from '../../../store/redux/rootReducer';
import { NavLink } from 'react-router-dom';
import { ActivityListItemGroup } from './activity-list-item-group';
import { LoadingComponent } from '../../common/loading/loading';

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
                groupedActivities ? Object.keys(groupedActivities).map((date: string) => {
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
                }) : <LoadingComponent content={"Loading component"} /> 
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
