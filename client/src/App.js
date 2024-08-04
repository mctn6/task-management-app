import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navigation />
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={TaskList} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/create-task" component={TaskForm} />
            <Route path="/edit-task/:id" component={TaskForm} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;