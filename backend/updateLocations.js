const mongoose = require("mongoose");
const Property = require("./models/property.js");

const mongo_url = "mongodb://127.0.0.1:27017/wellax";

mongoose.connect(mongo_url)
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("Error:", err));

const locationUpdates = [
    {
        name: "wellax",
        coordinates: {
            lat: 19.0330,
            lng: 73.0297
        },
        costPerSqInch:6500,
    },
    {
        name: "wellax2",
        coordinates: {
            lat: 19.0459,
            lng: 73.0697
        },
        costPerSqInch:6000,
    }
];

async function updateLocations() {
    try {
        for (const update of locationUpdates) {
            const result = await Property.findOneAndUpdate(
                { name: update.name },
                { coordinates: update.coordinates },
                {costPerSqInch : update.costPerSqInch},
                { new: true }
            );
            
            if (result) {
                console.log(`✓ Updated ${update.name}`);
                console.log(`  Coordinates: ${result.coordinates.lat}, ${result.coordinates.lng}`);
                console.log(`   Updated ${result.costPerSqInch}`);

            } else {
                console.log(`✗ Property ${update.name} not found`);
            }
        }
        
        console.log("\nCoordinates updated successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
        mongoose.connection.close();
    }
}

updateLocations();