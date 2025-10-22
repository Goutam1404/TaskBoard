import Todo from "../models/Todo.model";

const createTodo = async (req, res) => {
  try {
    const { title, tasks } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
        success: false,
      });
    }
    const todo = new Todo({
      title,
      tasks,
    });
    console.log("Creating a task");
    await todo.save();
    return res.status(200).json({
      message: "Todo created successfully",
      success: true,
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in creating the todo",
      success: false,
      error,
    });
  }
};
