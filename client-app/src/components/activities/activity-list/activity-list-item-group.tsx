import React from 'react'
import { Item } from 'semantic-ui-react'
import { IActivity } from '../../../models/activity'
import { ActivityListItem } from './activity-list-item'

interface IProps {
    groupedActivities : IActivity[];
    activityIdBeingDeleted: string | null;
    isActivityDeleting: boolean;
    handleDeleteActivity: (event:React.MouseEvent<HTMLButtonElement>, id: string) => void;
}

export const ActivityListItemGroup: React.FC<IProps> = ({groupedActivities, activityIdBeingDeleted, isActivityDeleting, handleDeleteActivity}) => {
    return (
        <Item.Group divided>
        {groupedActivities.map((activity: IActivity) => {
            return (
                    <ActivityListItem key={activity.id}
                        activity={activity}
                        activityIdBeingDeleted = {activityIdBeingDeleted}
                        isActivityDeleting = {isActivityDeleting} 
                        handleDeleteActivity = {handleDeleteActivity}
                    />
                )
            })
        }
        </Item.Group>  
    );
}
