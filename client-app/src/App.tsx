import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { IActivity } from './models/activity';
import Navbar from './components/common/navbar/navbar';
import ActivityDashboard from './components/activities/activity-dashboard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

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
    setActivities([...activities, activity]);
    setselectedActivity(activity);
    setEditMode(false);
  }

  const handleEditActivity = (activity: IActivity) => {
    setActivities([...activities.filter(x => x.id !== activity.id), activity]);
    setselectedActivity(activity);
    setEditMode(false);
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter(x => x.id  !== id)]);
    setselectedActivity(null);
    setEditMode(false);
  }

  useEffect(() => {
      axios.get<IActivity[]>('http://localhost:5000/api/activities')
      .then(response => {
        const activities = response.data.map(activity => {
          activity.date = activity.date.split('.')[0];
          return activity;
        });
        setActivities(activities);
      });
  }, []);

    return (
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
            />
        </Container>
      </React.Fragment>
    );
}

export default App;
