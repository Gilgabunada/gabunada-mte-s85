const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"]
    },
    name:{
        type:String,
        required: [true, "Workout name is required"],
        trim: true
    },
    duration:{
        type: String,
        required: [true, "Workout Duration is required"],
        trim: true
    },
    status:{
        type: String,
        default: "pending",
        trim: true
    },
    dateAdded:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Workout", workoutSchema);