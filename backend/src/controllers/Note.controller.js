import Notes from "../models/Note.Model.js";

const createNote = async (req, res) => {
  try {
    const { title, description, pinned = false } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    
    const notes = await Notes.create({
      title,
      description,
      pinned: pinned || false,
    });
    console.log("Creating the notes");
    
    await notes.save();
    return res.status(200).json({
      message: "Successfully created the notes",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Some issue in creating notes",
      success: false,
    });
  }
};

const showNotes = async (req, res) => {
  try {
    const { id } = req.params;
    // if(!id){
    //     return
    // }
    const note = await Notes.findById({ _id: id });
    if (!note) {
      return res.status(400).json({
        message: "Note not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Found the notes",
      success: true,
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in fetching the note",
      success: false,
      error,
    });
  }
};

const showAllNotes=async (req,res)=>{
  try {
    // const notes=await Notes.find(); a normal way
    const notes=await Notes.find().sort({createdAt:-1 }); //newest first
    // const notes=await Notes.findx();
    return res.status(200).json(notes)
  } catch (error) {
      console.error("Error in getting all the notes");
      return res.status(500).json({
        message:"Internal server error",
      })
  }
}

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    // updatedNotes.title = title || updatedNotes.title;
    // updatedNotes.description = description || updatedNotes.description;

    const updatedNotes = Notes.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNotes) {
      return res.status(400).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Successfully updated the notes",
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: "Error in updating notes",
      success: false,
      error,
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const notes = await Notes.findByIdAndDelete(id);
    if (!notes) {
      return res.status(404).json({
        message: "Note not found",
        success: false,
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      message: "Error in deleting the note",
      error
    });
  }
};
export { createNote, showNotes, updateNote, deleteNote, showAllNotes };
