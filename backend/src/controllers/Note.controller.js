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

    if (!notes) {
      return res.status(501).json({
        message: "Failed to create notes",
        success: false,
      });
    }
    await notes.save();
    return res.status(200).json({
      message: "Successfully created the notes",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      message: "Some issur in creating notes",
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

const showAllNotes=async (_,res)=>{
  try {
    // const notes=await Notes.find(); a normal way
    const notes=await Notes.find().sort({createdAt:-1 }); //newest first
    if(!notes){
      return res.status(404).json({
        message:"Wrong id! Note not found"
      })
    }
    return res.status(200).json({
      message:"Notes found successfully"
    })
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

    const notes = Notes.findByIDAndDelete(id);
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
    return res.status(500).json({
      message: "Error in deleting the note",
    });
  }
};
export { createNote, showNotes, updateNote, deleteNote };
