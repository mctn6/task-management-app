const User = require("../models/User");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const user = await User.findById(user.id);
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Unable to fetch user");
      }
    },
    tasks: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const tasks = await Task.find({
          $or: [{ createdBy: user.id }, { assignedTo: user.id }],
        });
        return tasks;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Unable to fetch tasks");
      }
    },
    task: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const task = await Task.findOne({ _id: id });
        return task;
      } catch (error) {
        console.error("Error fetching task:", error);
        throw new Error("Unable to fetch task");
      }
    },
    users: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Unable to fetch users");
      }
    },
  },
  Mutation: {
    register: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });
      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) throw new Error("Invalid password");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return { token, user };
    },
    createTask: async (
      _,
      { title, description, dueDate, assignedToId },
      { user }
    ) => {
      if (!user) throw new Error("Not authenticated");

      let assignedTo = null;
      if (assignedToId) {
        if (!mongoose.Types.ObjectId.isValid(assignedToId)) {
          throw new Error("Invalid assignedToId");
        }
        assignedTo = new mongoose.Types.ObjectId(assignedToId);
      }

      const task = new Task({
        title,
        description,
        dueDate,
        createdBy: user.id,
        assignedTo,
      });
      try {
        await task.save();
        return task;
      } catch (error) {
        throw new Error("Error saving task");
      }
    },
    updateTask: async (_, { id, ...updates }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const task = await Task.findOneAndUpdate(
        { _id: id },
        updates,
        { new: true }
      );
      if (!task) throw new Error("Task not found");
      return task;
    },
    deleteTask: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      try {
        const result = await Task.deleteOne({ _id: id });
        return result.deletedCount > 0;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Failed to delete task");
      }
    },
  },
  Task: {
    assignedTo: async (task) => {
      return User.findById(task.assignedTo);
    },
    createdBy: async (task) => {
      return User.findById(task.createdBy);
    },
  },
  User: {
    tasks: async (user) => {
      return Task.find({
        $or: [{ createdBy: user.id }, { assignedTo: user.id }],
      });
    },
  },
};

module.exports = resolvers;
