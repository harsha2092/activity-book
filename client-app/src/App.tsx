import React from 'react';
import { Container } from 'semantic-ui-react';
import Navbar from './components/common/navbar/navbar';
import ActivityDashboard from './components/activities/activity-dashboard';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import ActivityForm from './components/activities/activity-form';
import activityDetails from './components/activities/activity-details/activity-details';
import NotFound from './components/common/not-found/not-found';
import { ToastContainer } from 'react-toastify';

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
      <React.Fragment>
        <ToastContainer position="bottom-right"/>
        <Route path="/" exact component={HomePage}/>
        <Route 
          path={'/(.+)'} 
          render={ () => 
            (
              <React.Fragment>
                <Navbar/>
                <Container style={{marginTop: '7em'}}>
                  <Switch>
                    <Route path="/activity" exact component={ActivityDashboard}/>
                    <Route path="/activity/:id" component={activityDetails}/>
                    <Route key={location.key} path={["/create", "/manage/:id"]} component={ActivityForm}/>
                    <Route component={NotFound}/>
                  </Switch>
                </Container>
              </React.Fragment>
            )
          }
        />
        
      </React.Fragment>
    );
}

export default withRouter(App);
