const path = require("path");
const Workout = require("../models/userModel");
const router = require("express").Router();
const Worktout = require("../models/userModel");

router.get("api/workouts", (req, res) => {
    Workout.find().sort({ day: -1 }).limit(1);
    Workout.aggregate([
        { 
            $addFields: {
                totalDuration: {
                    $sum: `$excercise.duration`
                }
            }
        }
    ])
})
.then(dbWorkout => {
    res.json(dbWorkout);
})