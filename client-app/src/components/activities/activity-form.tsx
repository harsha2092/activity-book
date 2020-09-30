import React, { useState, useEffect} from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { IActivity } from '../../models/activity'
import {v4 as uuid} from 'uuid';
import { connect } from 'react-redux';
import { createActivity, editActivity, getActivity, selectActivity } from '../../store/redux/activity/activity.action';
import { IGlobalState } from '../../store/redux/rootReducer';
import { RouteComponentProps } from 'react-router-dom';
import { LoadingComponent } from '../common/loading/loading';

interface StateProps {
    handleEditActivity: (activity: IActivity) => Promise<any>;
    submitting: boolean;
    handleCreateActivity: (activity: IActivity) => Promise<any>;
    initialActivity: IActivity | null;
    getActivity: (id: string) => void;
    isLoadingActivity: boolean;
    selectActivity: (id: string | null) => void;
}

interface RouteProps {
    id: string
} 

const ActivityForm: React.FC<StateProps & RouteComponentProps<RouteProps>> = ({
    initialActivity, 
    handleCreateActivity,
    handleEditActivity, 
    submitting,
    match,
    getActivity,
    isLoadingActivity,
    selectActivity,
    history
}) => {

    const initializeForm = {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);

    useEffect(() => {
        if(match.params.id){
            getActivity(match.params.id);
        }

        return () => selectActivity(null);

    }, [match.params.id, getActivity, selectActivity])


    useEffect(() => {
        initialActivity && setActivity(initialActivity);
    }, [initialActivity])


    const handleOnChange = (event: any) => {
        const {name, value} = event.target;
        setActivity({
            ...activity,
            [name]: value
        });
    }

    const handleSubmit = () => {
        console.log(`activity:${JSON.stringify(activity)}`);
        if(activity.id.length === 0) {
            activity.id= uuid();
            handleCreateActivity(activity).then(() => {
                history.push(`/activity/${activity.id}`);
            });
        } else {
            handleEditActivity(activity).then(() => {
                history.push(`/activity/${activity.id}`);
            });
        }
    }
    { return isLoadingActivity ? <LoadingComponent content="Loading..."/> 
    : (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <Form 
                        onSubmit={handleSubmit}
                        key={initialActivity ? initialActivity.id : '0'}
                    >
                        <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleOnChange}/>
                        <Form.TextArea rows ={2} placeholder="Description" value={activity.description} name="description" onChange={handleOnChange}/>
                        <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleOnChange}/>
                        <Form.Input type="datetime-local" placeholder="Date" value={activity.date} name="date" onChange={handleOnChange}/>
                        <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleOnChange}/>
                        <Form.Input placeholder="venue" value={activity.venue} name="venue" onChange={handleOnChange}/>
                        <Button loading={submitting} type="submit" content="submit" positive floated="right"/>
                        <Button onClick = {() => {history.push(`/activity/${initialActivity ? initialActivity.id : ''}`) }} type="button" content="Cancel" floated="right" />
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>
      )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    submitting: state.activity.isAddOrUpdateActivity,
    initialActivity: state.activity.selectedActivity,
    isLoadingActivity: state.activity.isLoadingActivity,
});

// TODO: Need to understand why if this is passed passed form parent component, re-rendering is not happening
const mapDispatchTopProps = (dispatch: any) => ({
    handleEditActivity: (activity: IActivity) => dispatch(editActivity(activity)),
    handleCreateActivity: (activity: IActivity) => dispatch(createActivity(activity)),
    getActivity: (id: string) => dispatch(getActivity(id)),
    selectActivity: (id: string | null) => dispatch(selectActivity(id))
});

export default connect(mapStateToProps, mapDispatchTopProps)(ActivityForm)