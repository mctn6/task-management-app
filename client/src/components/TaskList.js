import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      status
      dueDate
    }
  }
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

function TaskList() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask({ variables: { id } });
    }
  };

  return (
    <div>
      <h2 className="mb-4">Task List</h2>
      <Link to="/create-task" className="btn btn-primary mb-3">
        Create New Task
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <Badge bg={task.status === 'Done' ? 'success' : task.status === 'In Progress' ? 'warning' : 'secondary'}>
                  {task.status}
                </Badge>
              </td>
              <td>{new Date(task.dueDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit-task/${task.id}`} className="btn btn-sm btn-primary me-2">
                  Edit
                </Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskList;