import asyncHandler from 'express-async-handler'
import TaskModel from '../../models/tasks/taskModel.js'

export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body

    if(!title || title.trim() === "" ) {
      res.status(400).json({ message: "Title is required" })
    }

    if(description && description.trim() === "") {
      res.status(400).json({ message: "Description cannot be empty" })
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id
    })

    await task.save()

    res.status(201).json({ message: "Task created successfully", task })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id
    if(!userId) {
      return res.status(400).json({ message: "User not found" })
    }
    const tasks = await TaskModel.find({ user: req.user._id })
    res.status(200).json({
      length: tasks.length,
      tasks
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export const getTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params
    if(!id) {
      return res.status(400).json({ message: "Please provide a task ID" })
    }

    const task = await TaskModel.findById(id)
    if(!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if(!task.user.equals(userId)) {
      return res.status(401).json({ message: "You are not authorized to view this task" })
    }

    res.status(200).json(task)

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export const updateTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params
    const { title, description, dueDate, priority, status, completed } = req.body

    if(!id) {
      return res.status(400).json({ message: "Please provide a task ID" })
    }


    if(!title || title.trim() === "" ) {
      res.status(400).json({ message: "Title is required" })
    }

    if(description && description.trim() === "") {
      res.status(400).json({ message: "Description cannot be empty" })
    }

    const task = await TaskModel.findById(id)

    if(!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if(!task.user.equals(userId)) {
      return res.status(401).json({ message: "You are not authorized to update this task" })
    }

    // Update task fields
    task.title = title || task.title
    task.description = description || task.description
    task.dueDate = dueDate || task.dueDate
    task.priority = priority || task.priority
    task.status = status || task.status
    task.completed = completed || task.completed

    await task.save()

    res.status(200).json({ message: "Task updated successfully", task })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id
    const { id } = req.params

    if(!id) {
      return res.status(400).json({ message: "Please provide a task ID" })
    }

    const task = await TaskModel.findById(id)
    if(!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    if(!task.user.equals(userId)) {
      return res.status(401).json({ message: "You are not authorized to delete this task" })
    }

    await TaskModel.findByIdAndDelete(id)

    res.status(200).json({ message: "Task deleted successfully" })

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})