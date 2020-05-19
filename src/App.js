import React from 'react';
import './App.css';
import ViewPage from './pages/ViewPage'
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";
import HomePage from './pages/HomePage';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact  component={HomePage}/>
          <Route path='/habits' component={ViewPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
