import React from "react";
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./ApolloClient";
import "bootstrap/dist/css/bootstrap.min.css";

import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navigation />
        <div className="container mt-3">
          <Routes>
            <Route exact path="/" element={<TaskList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
