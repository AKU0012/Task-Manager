import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 50,
        trim: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
},
    { timestamps: true }
)

export default mongoose.model("Task", TaskSchema)