import React, { useState, useEffect} from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { IActivity, IActivityFormValues } from '../../models/activity'
import {v4 as uuid} from 'uuid';
import { connect } from 'react-redux';
import { createActivity, editActivity, getActivity, selectActivity } from '../../store/redux/activity/activity.action';
import { IGlobalState } from '../../store/redux/rootReducer';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import { TextInput } from '../common/form/text-input';
import { TextAreaInput } from '../common/form/text-area-input';
import { category } from '../../utils/form/category-options';
import { SelectInput } from '../common/form/select-input';
import { DateInput } from '../common/form/date-input';
import { combineDateAndTime } from '../../utils/form/date-utils';
import { toast } from 'react-toastify';
import {combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';

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

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to atleast 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time'),
})

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
        date: undefined,
        time: undefined,
        city: '',
        venue: '',
    }

    const [activity, setActivity] = useState<IActivityFormValues>(initializeForm);

    useEffect(() => {
        if(match.params.id){
            getActivity(match.params.id);
        }

        return () => selectActivity(null);

    }, [match.params.id, getActivity, selectActivity])


    useEffect(() => {
        initialActivity && setActivity({...initialActivity, time: initialActivity.date});
    }, [initialActivity])

    const handleFinalFormSubmit = (values: any) => {
        const {date, time, ...activity} = values;
        console.log(activity);

        const dateAndTime = combineDateAndTime(date, time);
        activity.date = dateAndTime;
        
        console.log(activity);

        if(!activity.id) {
            activity.id= uuid();
            handleCreateActivity(activity).then(() => {
                history.push(`/activity/${activity.id}`);
            }).catch(() => {
                toast.error("Problem submitting data");
            });
        } else {
            handleEditActivity(activity).then(() => {
                history.push(`/activity/${activity.id}`);
            }).catch(() => {
                toast.error("Problem submitting data");
            });
        }
    }

    // const handleSubmit = () => {
    //     console.log(`activity:${JSON.stringify(activity)}`);
    //     if(!activity.id) {
    //         activity.id= uuid();
    //         handleCreateActivity(activity).then(() => {
    //             history.push(`/activity/${activity.id}`);
    //         });
    //     } else {
    //         handleEditActivity(activity).then(() => {
    //             history.push(`/activity/${activity.id}`);
    //         });
    //     }
    // }
    // { return isLoadingActivity ? <LoadingComponent content="Loading..."/> 
    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => {
                            return (
                                <Form 
                                    onSubmit={handleSubmit}
                                    key={initialActivity ? initialActivity.id : '0'}
                                    loading={isLoadingActivity}
                                >
                                    <Field 
                                        placeholder="Title" 
                                        value={activity.title} 
                                        name="title" 
                                        component={TextInput}
                                    />
                                    <Field 
                                        rows ={2} 
                                        placeholder="Description" 
                                        value={activity.description} 
                                        name="description"
                                        component={TextAreaInput} 
                                    />
                                    <Field 
                                        placeholder="Category" 
                                        value={activity.category} 
                                        name="category"
                                        options={category}
                                        component={SelectInput} 
                                    />
                                    <Form.Group widths="equal">
                                        <Field 
                                            placeholder="Date" 
                                            value={activity.date} 
                                            name="date" 
                                            component={DateInput}
                                            date
                                        />
                                        {/* TODO: even though we set the correct time in form , it is shown wrongly in details page due 
                                        to timezone format change in details and form page. need to fix it somehow */}
                                        <Field 
                                            placeholder="time" 
                                            value={activity.time} 
                                            name="time" 
                                            component={DateInput}
                                            time
                                        />
                                    </Form.Group>
                                    <Field
                                        placeholder="City" 
                                        value={activity.city} 
                                        name="city" 
                                        component={TextInput}
                                    />
                                    <Field 
                                        placeholder="venue" 
                                        value={activity.venue}
                                        name="venue" 
                                        component={TextInput}
                                    />
                                    <Button 
                                        loading={submitting} 
                                        type="submit" 
                                        content="submit" 
                                        positive 
                                        floated="right"
                                        disabled={isLoadingActivity || invalid || pristine}
                                    />
                                    <Button 
                                        onClick = {() => {history.push(`/activity/${initialActivity ? initialActivity.id : ''}`) }} 
                                        type="button" 
                                        content="Cancel" 
                                        floated="right" 
                                        disabled={isLoadingActivity}
                                    />
                                </Form>
                            )
                        }}
                    />               
                </Segment>
            </Grid.Column>
        </Grid>
      )
    // }
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