const mongoose = require('mongoose');
const house = require('./models/house');

const data = {
    frist_floor: {
        "ward 1": [
            { id: 1, house: "House 1", status: "Clean" },
            { id: 2, house: "House 2", status: "Need cleaning" },
            { id: 3, house: "House 3", status: "Clean" },
            { id: 4, house: "House 4", status: "Need cleaning" },
            { id: 5, house: "House 5", status: "Clean" },
            { id: 6, house: "House 6", status: "Need cleaning" },
            { id: 7, house: "House 7", status: "Clean" },
            { id: 8, house: "House 8", status: "Need cleaning" }
        ],
        "ward 2": [
            { id: 9, house: "House 1", status: "Clean" },
            { id: 10, house: "House 2", status: "Need cleaning" },
            { id: 11, house: "House 3", status: "Clean" },
            { id: 12, house: "House 4", status: "Need cleaning" },
            { id: 13, house: "House 5", status: "Clean" },
            { id: 14, house: "House 6", status: "Need cleaning" },
            { id: 15, house: "House 7", status: "Clean" },
            { id: 16, house: "House 8", status: "Need cleaning" }
        ],
        "ward 3": [
            { id: 17, house: "House 1", status: "Clean" },
            { id: 18, house: "House 2", status: "Need cleaning" },
            { id: 19, house: "House 3", status: "Clean" },
            { id: 20, house: "House 4", status: "Need cleaning" },
            { id: 21, house: "House 5", status: "Clean" },
            { id: 22, house: "House 6", status: "Need cleaning" },
            { id: 23, house: "House 7", status: "Clean" },
            { id: 24, house: "House 8", status: "Need cleaning" }
        ],
        "ward 4": [
            { id: 25, house: "House 1", status: "Clean" },
            { id: 26, house: "House 2", status: "Need cleaning" },
            { id: 27, house: "House 3", status: "Clean" },
            { id: 28, house: "House 4", status: "Need cleaning" },
            { id: 29, house: "House 5", status: "Clean" },
            { id: 30, house: "House 6", status: "Need cleaning" },
            { id: 31, house: "House 7", status: "Clean" },
            { id: 32, house: "House 8", status: "Need cleaning" }
        ]
    },
    second_floor: {
        "ward 1": [
            { id: 33, house: "House 1", status: "Clean" },
            { id: 34, house: "House 2", status: "Need cleaning" },
            { id: 35, house: "House 3", status: "Clean" },
            { id: 36, house: "House 4", status: "Need cleaning" },
            { id: 37, house: "House 5", status: "Clean" },
            { id: 38, house: "House 6", status: "Need cleaning" },
            { id: 39, house: "House 7", status: "Clean" },
            { id: 40, house: "House 8", status: "Need cleaning" }
        ],
        "ward 2": [
            { id: 41, house: "House 1", status: "Clean" },
            { id: 42, house: "House 2", status: "Need cleaning" },
            { id: 43, house: "House 3", status: "Clean" },
            { id: 44, house: "House 4", status: "Need cleaning" },
            { id: 45, house: "House 5", status: "Clean" },
            { id: 46, house: "House 6", status: "Need cleaning" },
            { id: 47, house: "House 7", status: "Clean" },
            { id: 48, house: "House 8", status: "Need cleaning" }
        ],
        "ward 3": [
            { id: 49, house: "House 1", status: "Clean" },
            { id: 50, house: "House 2", status: "Need cleaning" },
            { id: 51, house: "House 3", status: "Clean" },
            { id: 52, house: "House 4", status: "Need cleaning" },
            { id: 53, house: "House 5", status: "Clean" },
            { id: 54, house: "House 6", status: "Need cleaning" },
            { id: 55, house: "House 7", status: "Clean" },
            { id: 56, house: "House 8", status: "Need cleaning" }
        ],
        "ward 4": [
            { id: 57, house: "House 1", status: "Clean" },
            { id: 58, house: "House 2", status: "Need cleaning" },
            { id: 59, house: "House 3", status: "Clean" },
            { id: 60, house: "House 4", status: "Need cleaning" },
            { id: 61, house: "House 5", status: "Clean" },
            { id: 62, house: "House 6", status: "Need cleaning" },
            { id: 63, house: "House 7", status: "Clean" },
            { id: 64, house: "House 8", status: "Need cleaning" }
        ]
    },
    third_floor: {
        "ward 1": [
            { id: 65, house: "House 1", status: "Clean" },
            { id: 66, house: "House 2", status: "Need cleaning" },
            { id: 67, house: "House 3", status: "Clean" },
            { id: 68, house: "House 4", status: "Need cleaning" },
            { id: 69, house: "House 5", status: "Clean" },
            { id: 70, house: "House 6", status: "Need cleaning" },
            { id: 71, house: "House 7", status: "Clean" },
            { id: 72, house: "House 8", status: "Need cleaning" }
        ],
        "ward 2": [
            { id: 73, house: "House 1", status: "Clean" },
            { id: 74, house: "House 2", status: "Need cleaning" },
            { id: 75, house: "House 3", status: "Clean" },
            { id: 76, house: "House 4", status: "Need cleaning" },
            { id: 77, house: "House 5", status: "Clean" },
            { id: 78, house: "House 6", status: "Need cleaning" },
            { id: 79, house: "House 7", status: "Clean" },
            { id: 80, house: "House 8", status: "Need cleaning" }
        ],
        "ward 3": [
            { id: 81, house: "House 1", status: "Clean" },
            { id: 82, house: "House 2", status: "Need cleaning" },
            { id: 83, house: "House 3", status: "Clean" },
            { id: 84, house: "House 4", status: "Need cleaning" },
            { id: 85, house: "House 5", status: "Clean" },
            { id: 86, house: "House 6", status: "Need cleaning" },
            { id: 87, house: "House 7", status: "Clean" },
            { id: 88, house: "House 8", status: "Need cleaning" }
        ],
        "ward 4": [
            { id: 89, house: "House 1", status: "Clean" },
            { id: 90, house: "House 2", status: "Need cleaning" },
            { id: 91, house: "House 3", status: "Clean" },
            { id: 92, house: "House 4", status: "Need cleaning" },
            { id: 93, house: "House 5", status: "Clean" },
            { id: 94, house: "House 6", status: "Need cleaning" },
            { id: 95, house: "House 7", status: "Clean" },
            { id: 96, house: "House 8", status: "Need cleaning" }
        ]
    },
    fourth_floor: {
        "ward 1": [
            { id: 97, house: "House 1", status: "Clean" },
            { id: 98, house: "House 2", status: "Need cleaning" },
            { id: 99, house: "House 3", status: "Clean" },
            { id: 100, house: "House 4", status: "Need cleaning" },
            { id: 101, house: "House 5", status: "Clean" },
            { id: 102, house: "House 6", status: "Need cleaning" },
            { id: 103, house: "House 7", status: "Clean" },
            { id: 104, house: "House 8", status: "Need cleaning" }
        ],
        "ward 2": [
            { id: 105, house: "House 1", status: "Clean" },
            { id: 106, house: "House 2", status: "Need cleaning" },
            { id: 107, house: "House 3", status: "Clean" },
            { id: 108, house: "House 4", status: "Need cleaning" },
            { id: 109, house: "House 5", status: "Clean" },
            { id: 110, house: "House 6", status: "Need cleaning" },
            { id: 111, house: "House 7", status: "Clean" },
            { id: 112, house: "House 8", status: "Need cleaning" }
        ],
        "ward 3": [
            { id: 113, house: "House 1", status: "Clean" },
            { id: 114, house: "House 2", status: "Need cleaning" },
            { id: 115, house: "House 3", status: "Clean" },
            { id: 116, house: "House 4", status: "Need cleaning" },
            { id: 117, house: "House 5", status: "Clean" },
            { id: 118, house: "House 6", status: "Need cleaning" },
            { id: 119, house: "House 7", status: "Clean" },
            { id: 120, house: "House 8", status: "Need cleaning" }
        ],
        "ward 4": [
            { id: 121, house: "House 1", status: "Clean" },
            { id: 122, house: "House 2", status: "Need cleaning" },
            { id: 123, house: "House 3", status: "Clean" },
            { id: 124, house: "House 4", status: "Need cleaning" },
            { id: 125, house: "House 5", status: "Clean" },
            { id: 126, house: "House 6", status: "Need cleaning" },
            { id: 127, house: "House 7", status: "Clean" },
            { id: 128, house: "House 8", status: "Need cleaning" }
        ]
    }
};

mongoose.connect('mongodb://127.0.0.1:27017/waste_management')
    .then(async () => {
        console.log("Connected for seeding...");
        await house.deleteMany({});

        for (const floor in data) {
            for (const ward in data[floor]) {
                const houses = data[floor][ward];
                for (let h of houses) {
                    const generatedUsername =
                        `${floor}_${ward}_${h.house}`.replace(/\s+/g, '_')
                            .toLowerCase(); //frist_floor_ward_1_house_1
                    await house.create({
                        id: h.id,
                        house: h.house,
                        status: h.status,
                        floor: floor,
                        ward: ward,
                        username: generatedUsername,
                        password: "password123",
                        dailyCode: "123456"  //default
                    });
                }
            }
        }
        console.log("Data successfully fed to MongoDB!");
        process.exit();
    });
