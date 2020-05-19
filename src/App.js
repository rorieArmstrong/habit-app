import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import ViewPage from './pages/ViewPage'
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact  component={Login}/>
          <Route path='/habits/:id' component={ViewPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
