const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    tasks: [Task!]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
    assignedTo: User
    createdBy: User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    tasks: [Task!]
    task(id: ID!): Task
    users: [User!]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTask(title: String!, description: String, dueDate: String, assignedToId: ID): Task!
    updateTask(id: ID!, title: String, description: String, status: String, dueDate: String, assignedToId: ID): Task!
    deleteTask(id: ID!): Boolean!
  }
`;


module.exports = typeDefs;