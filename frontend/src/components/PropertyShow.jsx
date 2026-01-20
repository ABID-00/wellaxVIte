import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Vite-friendly Swiper imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import EMICalculator from "./EMICalculator";
import NearbyPlaces from "./NearbyPlaces";
import InvestmentAnalysis from "./InvestmentAnalysis";


// Vite env vars use VITE_ prefix
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4090";

const PropertyShow = ({ propertyName, onNavigate }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/projects/${propertyName}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch property:", error);
        setLoading(false);
      });
  }, [propertyName, API_URL]);

  if (loading)
    return <div className="text-center py-20 text-xl text-gray-300">Loading...</div>;
  if (!property)
    return <div className="text-center py-20 text-gray-300">Property not found</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-gray-900/60 rounded-xl shadow-xl overflow-hidden border border-gray-800">
        {/* Carousel */}
        <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-b from-gray-800 to-gray-900">
          {property.images && property.images.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              className="max-w-md w-full h-[300px]"
            >
              {property.images.map((img, index) => (
                <SwiperSlide key={img || `img-${index}`}>
                  <img
                    src={img}
                    alt={`${property.name} ${index + 1}`}
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-gray-400 text-center">No images available</p>
          )}
        </div>
        
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-2 text-white">{property.name}</h1>
          <p className="text-lg text-gray-400 mb-2">📍 {property.location}</p>
          <p className="text-gray-300 mb-6">{property.description}</p>

          <div className="bg-gradient-to-r from-gray-800 to-indigo-900 p-4 rounded-lg mb-6 border border-gray-700">
            <p className="text-2xl font-semibold text-white">
              ₹{(property.costPerSqInch || 0)?.toLocaleString()} per sq. ft.
            </p>
          </div>

          <div className="my-6">
            <h2 className="text-2xl font-semibold text-white mb-3">Location on Map</h2>
            <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-800 shadow-md">
              <iframe
                src={
                  property.coordinates
                    ? `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
                    : `https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`
                }
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="property-map"
              />
            </div>
          </div>

          <button
            onClick={() => onNavigate("calculator", { property })}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 font-medium transition transform hover:scale-105"
          >
            Calculate Total Cost
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-900/60 rounded-xl shadow overflow-hidden border border-gray-800">
        <div className="flex border-b border-gray-800">
          {["overview", "emi", "nearby", "investment"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 font-medium transition ${
                activeTab === tab
                  ? "bg-indigo-700 text-white"
                  : "bg-transparent text-gray-300 hover:bg-gray-800"
              }`}
            >
              {tab === "overview"
                ? "Overview"
                : tab === "emi"
                ? "EMI Calculator"
                : tab === "nearby"
                ? "Nearby Places"
                : "Investment"}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Property Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Property Type:</span>
                  <span className="text-gray-300">Residential Apartment</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Status:</span>
                  <span className="text-yellow-400 font-semibold">Under Construction</span>
                </div>
                <div className="flex justify-between p-4 bg-gray-800 rounded">
                  <span className="font-medium text-gray-200">Possession:</span>
                  <span className="text-gray-300">3 Years</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "emi" && (
            <div className="text-align py-8 text-gray-400">
              <EMICalculator/>
              <br />
              <small>Price: ₹{(property.costPerSqInch * 1000 || 0).toLocaleString()}</small>
            </div>
          )}

          {activeTab === "nearby" && (
            <div className="py-8 text-gray-400">
              <NearbyPlaces location={property.location} />
            </div>
          )}

          {activeTab === "investment" && (
            <div className="py-8 text-gray-400">
              <InvestmentAnalysis propertyPrice={property.costPerSqInch*1000} location={property.location} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyShow;
