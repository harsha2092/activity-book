import React, {useState, useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from './models/activity';
import Navbar from './components/common/navbar/navbar';
import ActivityDashboard from './components/activities/activity-dashboard';
import agent from './api/agent';
import { LoadingComponent } from './components/common/loading/loading';

const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');

  const handleSelectActivity = (id: string) => {
      setselectedActivity(activities.filter(x => x.id === id)[0]);
      setEditMode(false);
  }

  const handleCreateActivityOnClick = () => {
    console.log(`handleCreateActivityOnClick called`);
    setselectedActivity(null);
    setEditMode(true);
  }

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
    .then(() => {
      setActivities([...activities, activity]);
      setselectedActivity(activity);
      setEditMode(false);
    })
    .then(() => {
      setSubmitting(false);
    });
  }

  const handleEditActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity).then(() => {
      setActivities([...activities.filter(x => x.id !== activity.id), activity]);
      setselectedActivity(activity);
      setEditMode(false);
    })
    .then(() => {
      setSubmitting(false);
    });
  }

  const handleDeleteActivity = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setTarget(event.currentTarget.name);
    setSubmitting(true);

    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id  !== id)]);
      setselectedActivity(null);
      setEditMode(false);
    })
    .then(() => {
      setSubmitting(false);
      setTarget('');
    });
  }

  useEffect(() => {
      agent.Activities.list()
      .then(response => {
        const activities = response.map(activity => {
          activity.date = activity.date.split('.')[0];
          return activity;
        });
        setActivities(activities);
      }).then(() => {
        setIsLoading(false);
      });
  }, []);

    return isLoading ? <LoadingComponent content={"Loading List"}/> :
    (
      <React.Fragment>
        <Navbar handleCreateActivityOnClick={handleCreateActivityOnClick}/>
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            handleSelectActivity={handleSelectActivity}
            editMode={editMode}
            setEditMode={setEditMode}
            setselectedActivity={setselectedActivity}
            handleCreateActivity={handleCreateActivity}
            handleEditActivity={handleEditActivity}
            handleDeleteActivity={handleDeleteActivity}
            submitting={submitting}
            target={target}
            />
        </Container>
      </React.Fragment>
    );
}

export default App;
