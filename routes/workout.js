const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout.js");
const { verify } = require("../auth.js");

router.post("/addWorkout", verify, workoutController.addWorkout);
router.get("/getMyWrokouts", verify, workoutController.getMyWorkouts);
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);
router.patch("/completeWorkoutStatus/:id",verify, workoutController.completeWorkoutStatus);

module.exports = router;