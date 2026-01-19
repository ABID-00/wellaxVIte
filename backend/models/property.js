const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    images: {
  type: [String], // array of strings
  default: [
    "https://imgs.search.brave.com/dVcXdr2P_K5S9C8VqeuOmOTBG1OlViIKL-PE7a9pviQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by93aGl0ZS1ob3Vz/ZS13aXRoLWhvdXNl/LXRvcC1pdF8xMTU5/NTM1LTkzMDAuanBn/P3NlbXQ9YWlzX2Nv/dW50cnlfYm9vc3Qm/dz03NDA",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
  ]
}
,
    description: {
        type: String,
    },
    costPerSqInch: {
        type: Number,
    },
    name: String,
    location: String,
    coordinates: {
        lat: {
            type: Number,
            required: false
        },
        lng: {
            type: Number,
            required: false
        }
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields
});

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;