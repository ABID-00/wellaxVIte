const mongoose = require("mongoose");
const Property = require("./models/property.js");

const mongo_url = "mongodb://127.0.0.1:27017/wellax";

mongoose.connect(mongo_url)
    .then(() => {
        console.log("Connected to DB");
        checkProperties();
    })
    .catch(err => {
        console.log("Error:", err);
        mongoose.connection.close();
    });

async function checkProperties() {
    try {
        const properties = await Property.find({});
        
        if (properties.length === 0) {
            console.log("No properties found in database!");
        } else {
            console.log(`Found ${properties.length} properties:\n`);
            properties.forEach((prop, index) => {
                console.log(`${index + 1}. Name: "${prop.name}"`);
                console.log(`   Location: "${prop.location}"`);
                console.log(`   ID: ${prop._id}\n`);
            });
        }
        
        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
        mongoose.connection.close();
    }
}