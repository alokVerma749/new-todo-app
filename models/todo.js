import mongoose from 'mongoose'
const { Schema } = mongoose
const todoSchema = new Schema({
    name: {
        type: String,
        max: [20, 'todo title cannot be more than 20 characters'],
        required: [true, 'Todo title is required'],
    },
    tasks: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export default mongoose.model("Todo", todoSchema)