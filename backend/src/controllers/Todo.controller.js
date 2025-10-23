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

const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, tasks } = req.body;
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(404).json({
        message: "can't found the Todo",
        success: false,
      });
    }
    todo.title = title || todo.title;

    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Notes updates successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in updating the todo",
    });
  }
};

export { createTodo, getTodos, updateTodos };
