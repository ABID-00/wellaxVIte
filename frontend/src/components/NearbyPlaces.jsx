import React from "react";
import { MapPin, School, Building2, ShoppingCart, Train } from "lucide-react";

const NearbyPlaces = ({ location }) => {
  const nearby = [
    { name: "Railway Station", icon: <Train />, distance: "1.2 km" },
    { name: "Supermarket", icon: <ShoppingCart />, distance: "0.8 km" },
    { name: "Business Park", icon: <Building2 />, distance: "2.5 km" },
    { name: "School", icon: <School />, distance: "1.0 km" },
  ];

  return (
    <div className="bg-gray-900/70 rounded-lg shadow-xl p-6 border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="text-indigo-400 w-6 h-6" />
        <h3 className="text-2xl font-bold text-white">Nearby Places</h3>
      </div>

      <p className="text-gray-400 mb-4">Location: {location}</p>

      <div className="grid md:grid-cols-2 gap-4">
        {nearby.map((place, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-gray-800/60 border border-gray-700 p-4 rounded-lg hover:border-indigo-500 transition"
          >
            <div className="text-indigo-400">{place.icon}</div>
            <div>
              <p className="font-semibold text-white">{place.name}</p>
              <p className="text-gray-400 text-sm">{place.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlaces;
