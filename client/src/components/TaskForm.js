import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String, $dueDate: String) {
    createTask(title: $title, description: $description, dueDate: $dueDate) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $title: String, $description: String, $status: String, $dueDate: String) {
    updateTask(id: $id, title: $title, description: $description, status: $status, dueDate: $dueDate) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Todo');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();
  const { id } = useParams();

  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted: () => history.push('/'),
    onError: (error) => setError(error.message),
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => history.push('/'),
    onError: (error) => setError(error.message),
  });

  const { loading, data } = useQuery(GET_TASK, {
    variables: { id },
    skip: !id,
  });

  useEffect(() => {
    if (data && data.task) {
      setTitle(data.task.title);
      setDescription(data.task.description);
      setStatus(data.task.status);
      setDueDate(data.task.dueDate.split('T')[0]);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateTask({ variables: { id, title, description, status, dueDate } });
    } else {
      createTask({ variables: { title, description, dueDate } });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="col-md-6 offset-md-3">
      <h2 className="mb-4">{id ? 'Edit Task' : 'Create Task'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {id && (
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        )}
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Update Task' : 'Create Task'}
        </Button>
      </Form>
    </div>
  );
}

export default TaskForm;