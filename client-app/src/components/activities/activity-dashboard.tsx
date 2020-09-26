import React from 'react'
import { Grid } from 'semantic-ui-react';
import { IActivity } from '../../models/activity';
import ActivityDetails from './activity-details';
import { ActivityForm } from './activity-form';
import ActivityList from './activity-list';

interface IProps {
    activities: IActivity[];
    selectedActivity: IActivity | null;
    handleSelectActivity: (id: string) => void;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setselectedActivity: (activity: IActivity | null) => void;
    handleCreateActivity: (activity: IActivity) => void;
    handleEditActivity: (activity: IActivity) => void;
    handleDeleteActivity: (id: string) => void;
}

const ActivityDashboard: React.FC<IProps> = ({
    activities, 
    selectedActivity, 
    handleSelectActivity,
    editMode,
    setEditMode,
    setselectedActivity,
    handleCreateActivity,
    handleEditActivity,
    handleDeleteActivity,
}) => {
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityList activities={activities} handleSelectActivity={handleSelectActivity} handleDeleteActivity={handleDeleteActivity}/>
            </Grid.Column>
            <Grid.Column width={6}>
                {!editMode && selectedActivity && <ActivityDetails setSelectedActivity={setselectedActivity} selectedActivity={selectedActivity!} setEditMode={setEditMode}/>}
                {editMode && <ActivityForm
                                key={selectedActivity ? selectedActivity.id : '0'}
                                initialActivity={selectedActivity} 
                                setEditMode={setEditMode}
                                handleCreateActivity={handleCreateActivity}
                                handleEditActivity={handleEditActivity}/>}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;