const Task = require("../models/Task");

// ================= GET TASKS =================
const getTasks = async (req, res) => {
  try {
    const { status, project } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (project) filter.project = project;

    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find(filter).populate("assignedTo", "name email profileImageUrl");
    } else {
      tasks = await Task.find({
        ...filter,
        assignedTo: req.user._id,
      }).populate("assignedTo", "name email profileImageUrl");
    }

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET BY ID =================
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assignedTo");
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CREATE =================
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
      project, // ✅ NEW
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
      project,
      createdBy: req.user._id, // ✅ FIXED
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE =================
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.project = req.body.project || task.project; // ✅ NEW
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;

    if (req.body.assignedTo) {
      task.assignedTo = req.body.assignedTo;
    }

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DELETE =================
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= STATUS UPDATE =================
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    const isAssigned = task.assignedTo.some(
      (id) => id.toString() === req.user._id.toString()
    );

    // ✅ FIXED LOGIC
    if (!isAssigned && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = req.body.status;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CHECKLIST =================
const updateTaskChecklist = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.todoChecklist = req.body.todoChecklist;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= DASHBOARD =================
const getDashboardData = async (req, res) => {
  try {
    // Get all tasks for admin
    const allTasks = await Task.find().populate("assignedTo", "name email profileImageUrl");
    
    // Count tasks by status
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const inProgressTasks = await Task.countDocuments({ status: "In Progress" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const totalTasks = pendingTasks + inProgressTasks + completedTasks;

    // Count tasks by priority
    const lowPriority = await Task.countDocuments({ priority: "Low" });
    const mediumPriority = await Task.countDocuments({ priority: "Medium" });
    const highPriority = await Task.countDocuments({ priority: "High" });

    // Get recent tasks (last 5)
    const recentTasks = allTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    res.json({
      totalTasks,
      charts: {
        taskDustrubution: {
          Pending: pendingTasks,
          InProgress: inProgressTasks,
          Completed: completedTasks,
        },
        taskPriorityLevels: {
          Low: lowPriority,
          Medium: mediumPriority,
          High: highPriority,
        },
      },
      recentTasks,
      statusSummary: {
        all: totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDashboardData = async (req, res) => {
  try {
    // Get tasks assigned to the user
    const userTasks = await Task.find({
      assignedTo: req.user._id,
    }).populate("assignedTo", "name email profileImageUrl");

    // Count tasks by status
    const pendingTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "Pending",
    });
    const inProgressTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "In Progress",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: req.user._id,
      status: "Completed",
    });
    const totalTasks = pendingTasks + inProgressTasks + completedTasks;

    // Count tasks by priority
    const lowPriority = await Task.countDocuments({
      assignedTo: req.user._id,
      priority: "Low",
    });
    const mediumPriority = await Task.countDocuments({
      assignedTo: req.user._id,
      priority: "Medium",
    });
    const highPriority = await Task.countDocuments({
      assignedTo: req.user._id,
      priority: "High",
    });

    // Get recent tasks (last 5)
    const recentTasks = userTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

    res.json({
      totalTasks,
      charts: {
        taskDustrubution: {
          Pending: pendingTasks,
          InProgress: inProgressTasks,
          Completed: completedTasks,
        },
        taskPriorityLevels: {
          Low: lowPriority,
          Medium: mediumPriority,
          High: highPriority,
        },
      },
      recentTasks,
      statusSummary: {
        all: totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};