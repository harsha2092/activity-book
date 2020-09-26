import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { IActivity } from '../../models/activity'
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    initialActivity: IActivity | null;
    handleCreateActivity: (activity: IActivity) => void;
    handleEditActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, initialActivity, handleCreateActivity, handleEditActivity, submitting}) => {

    const initializeForm = () => {
        return initialActivity ? initialActivity : ({
            id: '',
            title: '',
            description: '',
            category: '',
            date: '',
            city: '',
            venue: ''
        }
        ) 
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm)

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
            handleCreateActivity(activity);
        }else{
            handleEditActivity(activity);
        }
    }

    return (
        <div>
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleOnChange}/>
                    <Form.TextArea rows ={2} placeholder="Description" value={activity.description} name="description" onChange={handleOnChange}/>
                    <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleOnChange}/>
                    <Form.Input type="datetime-local" placeholder="Date" value={activity.date} name="date" onChange={handleOnChange}/>
                    <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleOnChange}/>
                    <Form.Input placeholder="venue" value={activity.venue} name="venue" onChange={handleOnChange}/>
                    <Button loading={submitting} type="submit" content="submit" positive floated="right"/>
                    <Button onClick = {() => setEditMode(false)} type="button" content="Cancel" floated="right" />
                </Form>
            </Segment>
        </div>
    )
}
