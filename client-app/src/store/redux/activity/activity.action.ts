import { IActivity } from '../../../models/activity';
import {activityActionTypes} from './activity.types';
import agent from '../../../api/agent';

 const getActivitiesSuccess = (activities: IActivity[]) => {
    return ({
     type: activityActionTypes.GET_ACTIVITIES_SUCCESS,
     payload: activities
    })
}

 const getActivitiesStart = () => ({
    type: activityActionTypes.GET_ACTIVITIES_START,
 });

 export const getActivities = () => {
     return (dispatch: any ) => {
        dispatch(getActivitiesStart());
        agent.Activities.list()
        .then(response => {
            const activities = response.map(activity => {
                activity.date = activity.date.split('.')[0];
                return activity;
                });
            dispatch(getActivitiesSuccess(activities));
        });
     }
 }

 const getActivitySuccess = (activity: IActivity) => {
    return ({
     type: activityActionTypes.GET_ACTIVITIY_SUCCESS,
     payload: activity
    })
}

 const getActivityStart = () => ({
    type: activityActionTypes.GET_ACTIVITIY_START,
 });

 export const getActivity = (id: string) => {
     return (dispatch: any ) => {
        dispatch(getActivityStart());
        agent.Activities.details(id)
        .then(response => {
                console.log(`response for activity details ${JSON.stringify(response)}`);
                const activity = response;
                activity.date = activity.date.split('.')[0];
            dispatch(getActivitySuccess(activity));
        });
     }
 }

export const selectActivity = (id: string | null) => ({
    type: activityActionTypes.SELECT_ACTIVITY,
    payload: id,    
});

export const editActivityStart = () => ({
    type: activityActionTypes.EDIT_ACTIVITY_START,
});

export const editActivitySuccess = (activity: IActivity) => ({
    type: activityActionTypes.EDIT_ACTIVITY_SUCCESS,
    payload: activity
});

export const editActivityFailure = () => ({
    type: activityActionTypes.EDIT_ACTIVITY_FAILURE,
});

export const editActivity = (activity: IActivity) => {
   return async (dispatch: any) =>  {
        dispatch(editActivityStart());
        try {
            await agent.Activities.update(activity);
            dispatch(editActivitySuccess(activity));
        } catch(error) {
            dispatch(editActivityFailure());
        }
    }
};

export const createActivityButtonClick = () => ({
    type: activityActionTypes.CREATE_ACTIVITY_MENU_BUTTON_CLICK,
});

export const createActivityStart = () => ({
    type: activityActionTypes.CREATE_ACTIVITY_START,
});

export const createActivitySuccess = (activity: IActivity) => ({
    type: activityActionTypes.CREATE_ACTIVITY_SUCCESS,
    payload: activity
});

export const createActivityFailure = () => ({
    type: activityActionTypes.CREATE_ACTIVITY_FAILURE,
});

export const createActivity = (activity: IActivity) => {
   return async (dispatch: any) =>  {
        dispatch(createActivityStart());
        try {
            await agent.Activities.create(activity);
            dispatch(createActivitySuccess(activity));
        } catch(error) {
            dispatch(createActivityFailure());
            console.log(`error: ${JSON.stringify(error)}`);
        }
    }
};

export const deleteActivityStart = (event: React.MouseEvent<HTMLButtonElement>) => ({
    type: activityActionTypes.DELETE_ACTIVITY_START,
    payload: event
});

export const deleteActivitySuccess = (id: string) => ({
    type: activityActionTypes.DELETE_ACTIVITY_SUCCESS,
    payload: id
});

export const deleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
   return (dispatch: any) =>  {
        dispatch(deleteActivityStart(event));
        agent.Activities.delete(id).then(() => {
            dispatch(deleteActivitySuccess(id));
        });
    }
};

