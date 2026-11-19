const Workout = require("../models/Workout.js");

module.exports.addWorkout = async (req, res) => {
    try{
        const {name, duration, status} = req.body;

        if(!name || !duration){
            return res.status(400).send({error: "Workout name and duration are required"});
        }

        const newWorkout = new Workout({
            name,
            duration,
            userId: req.user.id,
            status: status || "pending"
        });

        const savedWorkout = await newWorkout.save();
        return res.status(201).send({workout: savedWorkout});
    }catch(err){
        return res.status(500).send({error: "Error adding workout", details: err.message});
    }
};

module.exports.getMyWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find({userId: req.user.id});
        return res.status(200).send({workouts});
    }catch(err){
        return res.status(500).send({error: "Error retrieving workouts", details: err.message});
    }
};

module.exports.updateWorkout = async (req, res) => {
    try{
        const { name, duration, status } = req.body;
        const updates = {};

        if(name !== undefined) updates.name = name;
        if(duration !== undefined) updates.duration = duration;
        if(status !== undefined) updates.status = status;

        const updateWorkout = await Workout.findOneAndUpdate(
            { _id:req.params.id, userId: req.user.id},
            {$set: updates},
            {new: true, runValidators: true}
        );

        if(!updateWorkout){
            return res.status(200).send({error: "Workout not found"});
        }

        return res.status(200).send({message: "Workout successfully updated", updateWorkout: updateWorkout});

    }catch(err){
        return res.status(500).send({error: "Error updating workout", details: err.message});
    }
};

module.exports.completeWorkoutStatus =async(req,res) => {
    try{
        const updatedWorkout = await Workout.findOneAndUpdate(
            {_id: req.params.id, userId: req.user.id},
            {$set:{status: "completed"}},
            {new: true}
        );
        if(!updatedWorkout){
            return res.status(404).send({error: "Workout not found"});
        }

        return res.status(200).send({message: "Workout status update to completed", updateWorkout});
    }catch(err){
        return res.status(500).send({error: "Error updating workout status", details: err.message})
    }
}


module.exports.deleteWorkout = async(req,res) => {
    try{
        const deleteWorkout = await Workout.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if(!deleteWorkout){
            return res.status(404).send({error: "Workout not found"});
        }

        return res.status(200).send({message: "Workout deleted successfully"});
    }catch(err){
        return res.status(500).send({error: "Error deleting workout", details: err.message});
    }
}



