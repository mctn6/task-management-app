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
    user: User!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User
    tasks: [Task!]
    task(id: ID!): Task
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createTask(title: String!, description: String, dueDate: String): Task!
    updateTask(id: ID!, title: String, description: String, status: String, dueDate: String): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;