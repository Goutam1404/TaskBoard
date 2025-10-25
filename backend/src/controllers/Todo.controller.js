import Todo from "../models/Todo.model.js";

const createTodo = async (req, res) => {
  try {
    const { title, tasks } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }
    const todo = new Todo({
      title,
      tasks,
    });
    console.log("Creating a task");
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in creating the todo",
      error,
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      message: "All todos fetched",
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error in fetching todo`,
      error,
    });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Unable to get the todo",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo found",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error. Unable to get the todo",
      error,
    });
  }
};

const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tasks } = req.body;
    const updates = {};
    if (title !== undefined) {
      updates.title = title;
    }
    if (tasks !== undefined) {
      updates.tasks = tasks;
    }
    // MongoDB will only '$set' the fields that exist in our 'updates' object.
    // Any field NOT in 'updates' will be completely ignored and left as is in the database.
    const updatedTodo = await Todo.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({
        message: "can't found the Todo",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notes updates successfully",
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the todo",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(400).json({
        success: false,
        message: "Some error in deleting the Todo List",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully deleted the todo list",
      deleteTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error in deleting the todo list",
      error,
    });
  }
};

//controller for tasks
const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, isCompleted } = req.body; //in model it is -> taskName
    if (!id || !taskName) {
      return res.status(400).json({
        success: false,
        message: "task is required as input",
      });
    }

    //updating the task
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      {
        $push: { tasks: { taskName, isCompleted } },
      },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Error in updating the task",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task added successfully",
      updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in adding the task",
      error,
    });
  }
};

const getTask=async (req,res)=>{
 const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Unable to get the todo",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All tasks found",
      tasks:todo.tasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error. Unable to get the todo",
      error,
    });
  }
}

const updatedTask = async (req, res) => {
  try {
    const { id, taskId } = req.parmas;
    const { task, isCompleted } = req.body;
    if (!id || !taskId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const updateTodo = await Todo.findById(id);
    const updateTask = updateTodo.tasks.id(taskId);
    if (!updateTask || !updateTodo) {
      return res.status(404).json({
        success: false,
        message: "Can't find the task",
      });
    }
    if (task !== undefined) updateTask.taskName = task;
    if (isCompleted !== undefined) updateTask.isCompleted = isCompleted;

    await Todo.save();
    return res.status(200).json({
      success: true,
      message: "Successfully updated the task",
      Todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the task",
      error,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id, taskId } = req.params;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong in deleting",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      todo
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in deleting task",
    });
  }
};

export {
  createTodo,
  getTodos,
  updateTodos,
  getTodoById,
  deleteTodo,
  addTask,
  getTask,
  updatedTask,
  deleteTask,
};
