const path = require("path");
const Workout = require("../models/userModel");
const router = require("express").Router();


router.get("api/workouts", (req, res) => {
        Workout.find().sort({
            day: -1
        }).limit(1);
        Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: `$excercise.duration`
                }
            }
        }])
    })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })

router.put("api/workouts/:id", (req, res) => {
    Workout.create({
            body
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
})

router.post("api/workouts/"), (res, req) => {
    Workout.create({
            body
        })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
}

router.get("api/workouts/range", (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: `$excercise.duration`
            }
        },
        totalPounds: {
            $sum: `$excercise.weight`
        }
    }])
})
.then(dbWorkout => {
    res.json(dbWorkout);
})
.catch(err => {
    res.status(400).json(err);
})

router.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/excercise", (req, res) => {
    res.sendFile(path.join(_dirname, "../public/exercise.html"));
});
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;