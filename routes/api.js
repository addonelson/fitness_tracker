const path = require("path");
const router = require("express").Router();
const Workout = require("../models/userModel")

router.get("/api/workouts", (req, res) => {
    Workout.find().sort({ day: -1 }).limit(1) 
    Workout.aggregate([ 
        {
            $addFields: {
                totalDuration: {
                    $sum: `$exercises.duration`
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
        $push: { exercises: req.body } 
    })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: `$exercises.duration`
                },
                totalPounds: {
                    $sum: `$exercises.weight`
                }
            },
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

module.exports = router;