import {combineReducers} from 'redux';
import {IActivityState} from './activity/activity.reducer';
import activityReducer from './activity/activity.reducer';


export interface IGlobalState {
    activity: IActivityState
}

const rootReducer = combineReducers({
    activity: activityReducer
});


export default rootReducer; 