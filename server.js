require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const House = require("./models/house");
const session = require("express-session");
const cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {
    console.log("Raat ke 12 baj gaye! Sab reset ho raha hai...");
    await House.updateMany({}, {
        $set: {
            status: "Need cleaning", batchId: null, handShakeCode: null,
            dailyCode: Math.floor(Math.random() * 900000 + 100000).toString()
        }
    });
    console.log("Reset Done!");
});


app.use(session({
    secret: "nishant_secret",
    resave: false,
    saveUninitialized: false
}));


//middle_ware setup 
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// database connection middleware (Best for Vercel Serverless)
app.use(async (req, res, next) => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is undefined! Check Vercel Environment Variables.");
        }
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URI);
            console.log("MongoDB Connected!");
        }
        next();
    } catch (err) {
        console.error("MongoDB Error:", err);
        res.status(500).send("Database Connection Error: " + err.message);
    }
});


// communication blw server and database
app.get("/api/houses/:floor/:ward", async (req, res) => {
    const { floor, ward } = req.params;
    const houses = await House.find({
        floor: floor,
        ward: ward
    });
    res.json(houses);
});


app.post("/api/verify-house", async (req, res) => {
    const { houseId, enteredCode, isSegregated } = req.body;
    const houseData = await House.findById(houseId);
    if (!houseData) {
        return res.json({
            success: false,
            massage: "House does not found"
        });
    }

    if (houseData.floor != req.session.assignedWard) {
        return res.json({
            success: false,
            message: "you dont have permission to visit this area."
        });
    }

    if (houseData.status !== "Need cleaning") {
        return res.json({
            success: false,
            message: "House has already been processed today."
        });
    }
    if (houseData.dailyCode === enteredCode) {
        houseData.status = "Clean";
        if (isSegregated === true) {
            houseData.coins += 1;
        }
        await houseData.save();

        return res.json({
            success: true,
            message: "House verification successfull",
            coins: houseData.coins
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid code."
        })
    }
});

app.post("/api/mark-unavailable", async (req, res) => {
    const { houseId } = req.body;
    const houseData = await House.findById(houseId);
    if (!houseData) {
        return res.json({
            success: false,
            massage: "House did not found"
        });
    }
    if (houseData.floor !== req.session.assignedWard) {
        return res.json({
            success: false,
            messsage: " you are not allowed to update this house"
        })
    }

    if (houseData.status !== "Need cleaning") {
        return res.json({
            success: false,
            message: "House has already been processed today."
        });
    }
    houseData.status = 'Unavailable';
    await houseData.save();

    return res.json({
        success: true,
        message: "House has been marked as unavailable."
    });
});

app.post("/api/end-trip", async (req, res) => {
    const assignedWard = req.session.assignedWard;

    const leftHouses = await House.findOne({ floor: assignedWard, status: "Need cleaning" });
    if (leftHouses) {
        return res.json({
            success: false,
            message: "You need to clean all the houses first, before ending trip (otherwise you will mark as absent for today)"
        });
    }

    const batchName = "BATCH_" + Date.now();
    const secretCode = Math.floor(1000 + Math.random() * 9000).toString();

    const result = await House.updateMany(
        {
            floor: assignedWard,
            status: "Clean"
        },
        {
            $set: {
                status: "Pending at Hub",
                batchId: batchName,
                handShakeCode: secretCode

            }
        });

    if (result.modifiedCount === 0) {
        return res.json({
            success: false,
            message: "no cleaning house availbel to create batch"
        });
    }

    return res.json({
        success: true,
        message: "Trip ended! batch has been created successfully",
        batchId: batchName,
        handshakeCode: secretCode
    })
});

app.post("/api/verify-batch", async (req, res) => {
    const { code } = req.body;
    const assignedWard = req.session.assignedWard;


    const houseVerify = await House.find({
        status: "Pending at Hub",
        handShakeCode: code,
        floor: assignedWard
    });

    if (houseVerify.length === 0) {
        return res.json({
            success: false,
            message: "Invalid Code!"
        });
    }

    await House.updateMany(
        {
            floor: assignedWard,
            handShakeCode: code,
            status: "Pending at Hub"
        },
        {
            $set: {
                status: "Recycled",
                batchId: null,
                handShakeCode: null
            }
        }
    );

    return res.json({
        success: true,
        message: "batch verified successfully",
    });
});



//route
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // collector login verificaiton 
    if (username === "collector_1" && password === "nishant123") {
        req.session.role = 'collector';
        req.session.assignedWard = "frist_floor";
        return res.redirect("/collector");
    }
    if (username === "collector_2" && password === "nishant123") {
        req.session.role = 'collector';
        req.session.assignedWard = "second_floor";
        return res.redirect("/collector");
    }
    if (username === "collector_3" && password === "nishant123") {
        req.session.role = 'collector';
        req.session.assignedWard = "third_floor";
        return res.redirect("/collector");
    }
    if (username === "collector_4" && password === "nishant123") {
        req.session.role = 'collector';
        req.session.assignedWard = "fourth_floor";
        return res.redirect("/collector");
    }
    if (username === "recycler_1" && password === "nishant123") {
        req.session.role = 'recycler';
        return res.redirect("/hub");
    }
    if (username === "nishant123" && password === "admin") {
        req.session.role = 'admin';
        return res.redirect("/admin");
    }
    const user = await House.findOne({ username })
    if (!user) {
        return res.render("login", { "error": "wrong username.." });
    }
    if (user.password !== password) {
        return res.render("login", { "error": "wrong password." })
    }
    req.session.userId = user._id;
    res.redirect("/dashboard");
});


app.get("/dashboard", async (req, res) => {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    const user = await House.findById(req.session.userId);
    res.render("dashboard", { houseData: user });
});

app.get("/collector", async (req, res) => {
    if (req.session.role != "collector") {
        return res.redirect("/login");
    }

    const pendingHouse = await House.findOne({
        floor: req.session.assignedWard,
        status: "Pending at Hub"
    });

    let batchId = null;
    let handShakeCode = null;
    if (pendingHouse) {
        batchId = pendingHouse.batchId;
        handShakeCode = pendingHouse.handShakeCode;
    }

    res.render("index", {
        assignedWard: req.session.assignedWard,
        batchId: batchId,
        handShakeCode: handShakeCode
    });
})

app.get("/hub", async (req, res) => {
    if (req.session.role != "recycler") {
        return res.redirect("/login");
    }
    const pendingHouses = await House.find({
        status: "Pending at Hub"
    });
    const uniqueBatches = [];
    const seenBatches = new Set();

    pendingHouses.forEach(house => {
        if (!seenBatches.has(house.batchId)) {
            seenBatches.add(house.batchId);
            uniqueBatches.push({
                batchId: house.batchId,
                handShakeCode: house.handShakeCode,
                floor: house.floor,
                ward: house.ward
            });
        }
    });

    res.render("bin", {
        batches: uniqueBatches
    })
});


app.get("/admin", async (req, res) => {
    if (req.session.role !== "admin") {
        return res.redirect("/login");
    }

    const allHouses = await House.find();

    const floorReport = {};

    allHouses.forEach(house => {
        const floor = house.floor;
        if (!floorReport[floor]) {
            floorReport[floor] = {
                floorName: floor,
                total: 0,
                needCleaning: 0,
                collected: 0,
                pendingAtHub: 0,
                recycled: 0,
                unavailable: 0
            };
        }


        floorReport[floor].total += 1;

        if (house.status === "Need cleaning") {
            floorReport[floor].needCleaning += 1;
        } else if (house.status === "Unavailable") {
            floorReport[floor].unavailable += 1;
        } else if (house.status === "Clean") {
            floorReport[floor].collected += 1;
        } else if (house.status === "Pending at Hub") {
            floorReport[floor].pendingAtHub += 1;
        }
        else {
            floorReport[floor].recycled += 1;
        }

    });

    const reportArray = Object.values(floorReport);

    res.render("admin-dashboard", {
        reports: reportArray
    });
});


app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.send("Error logging out");
        res.redirect("/login");
    })
});

//app listening port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;