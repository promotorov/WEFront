import React from 'react';
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import withAuth from './components/withAuth'
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={withAuth(Home)} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
