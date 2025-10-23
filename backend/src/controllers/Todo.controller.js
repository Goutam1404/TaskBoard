import Todo from "../models/Todo.model";

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
      return res.status(404 ).json({
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
      const {id}=req.params;
  
      const deleted= await Todo.findByIdAndDelete(id);
      if(!deleted){
        return res.status(400).json({
          success:false,
          message:"Some error in deleting the Todo List"
        })
      }
      return res.status(200).json({
        success:true,
        message:"Successfully deleted the todo list",
        deleteTodo
      })
    } catch (error) {
       return res.status(500).json({
         success: false,
         message: "Server error in deleting the todo list",
         error,
       });
    }
};

export { createTodo, getTodos, updateTodos, getTodoById, deleteTodo };
