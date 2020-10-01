
import { IActivity } from '../../../models/activity';
import {activityActionTypes} from './activity.types';

export interface IActivityState {
    activities: IActivity[],
    isLoadingActivities: boolean,
    selectedActivity: IActivity | null,
    isAddOrUpdateActivity: boolean,
    isDeletingActivity: boolean,
    activityBeingDeleted: string | null,
    isLoadingActivity: boolean,
}

const INITIAL_STATE: IActivityState = {
    activities: [],
    isLoadingActivities: true,
    selectedActivity: null,
    isAddOrUpdateActivity: false,
    isDeletingActivity: false,
    activityBeingDeleted: null,
    isLoadingActivity: false,
};

interface Action {
    type: string;
    payload?: any;
}

const activityReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case activityActionTypes.GET_ACTIVITIES_START:
            return {
                ...state,
                isLoadingActivities: true
            };
        case activityActionTypes.GET_ACTIVITIES_SUCCESS:
            return {
                ...state,
                activities: action.payload,
                isLoadingActivities: false
            };
        case activityActionTypes.GET_ACTIVITIES_FAILURE:
            return {
                ...state,
                isLoadingActivities: false,
            };
        case activityActionTypes.GET_ACTIVITIY_START:
            return {
                ...state,
                isLoadingActivity: true
            };
        case activityActionTypes.GET_ACTIVITIY_SUCCESS:
            return {
                ...state,
                selectedActivity: action.payload,
                isLoadingActivity: false
            };
        case activityActionTypes.GET_ACTIVITIY_FAILURE:
            return {
                ...state,
                isLoadingActivity: false
            };
        case activityActionTypes.SELECT_ACTIVITY:
            return {
                ...state,
                selectedActivity: state.activities.find(x => x.id === action.payload),
            };
        case activityActionTypes.EDIT_ACTIVITY_START:
            return {
                ...state,
                isAddOrUpdateActivity: true
            }
        case activityActionTypes.EDIT_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities.filter(x => x.id !== action.payload.id), action.payload],
                selectedActivity: action.payload,
                isAddOrUpdateActivity: false,
            }
        case activityActionTypes.EDIT_ACTIVITY_FAILURE:
            return {
                ...state,
                isAddOrUpdateActivity: false,
            }
        case activityActionTypes.CREATE_ACTIVITY_MENU_BUTTON_CLICK:
            return {
                ...state,
                selectedActivity: null,
            }
        case activityActionTypes.CREATE_ACTIVITY_START:
            return {
                ...state,
                isAddOrUpdateActivity: true,
            }
        case activityActionTypes.CREATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities, action.payload],
                selectedActivity: action.payload,
                isAddOrUpdateActivity: false,
            }
        case activityActionTypes.CREATE_ACTIVITY_FAILURE:
            return {
                ...state,
                isAddOrUpdateActivity: false,
            }
        case activityActionTypes.DELETE_ACTIVITY_START:
            return {
                ...state,
                isDeletingActivity: true,
                activityBeingDeleted: action.payload.currentTarget?.name
            }
        case activityActionTypes.DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                activities: [...state.activities.filter(x => x.id !== action.payload)],
                selectedActivity: null,
                isAddOrUpdateActivity: false,
                activityBeingDeleted: null,
            }     
        default:
            return state;
    }
}

export default activityReducer;
