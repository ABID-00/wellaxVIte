const mongoose = require("mongoose");
const Property = require("./models/property.js");

// const mongo_url = "mongodb://127.0.0.1:27017/wellax";
const mongo_url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wellax";


const defaultImages = [
    "https://imgs.search.brave.com/dVcXdr2P_K5S9C8VqeuOmOTBG1OlViIKL-PE7a9pviQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93aGl0ZS1ob3Vz/ZS13aXRoLWhvdXNl/LXRvcC1pdF8xMTU5/NTM1LTkzMDAuanBn/P3NlbXQ9YWlzX2Nv/dW50cnlfYm9vc3Qm/dz03NDA",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
];

async function addImagesToProperties() {
    try {
        await mongoose.connect(mongo_url);
        console.log("Connected to DB");

        const properties = await Property.find({});
        
        for (const property of properties) {
            if (!property.images || property.images.length === 0) {
                property.images = defaultImages;
                await property.save();
                console.log(`✓ Added images to ${property.name}`);
            } else {
                console.log(`- ${property.name} already has images.`);
            }
        }
        
        console.log("\nAll properties updated successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
        if (mongoose.connection.readyState === 1) {
            mongoose.connection.close();
        }
    }
}

addImagesToProperties();
