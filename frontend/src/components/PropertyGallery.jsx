import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles - Vite friendly
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PropertyGalleryCarousel = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-300">Loading...</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center py-20 text-gray-300">No properties found</div>;
  }

  // Flatten all images
  const allImages = properties.flatMap((p) => p.images || []);

  return (
    <div className="max-w-6xl mx-auto py-12">
      {allImages.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          loop
          className="h-[600px]"
        >
          {allImages.map((img, index) => (
            <SwiperSlide key={img || `img-${index}`}>
              <img
                src={img}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover rounded-xl shadow-xl"
                onError={(e) => {
                  e.target.style.display = "none"; // Hide broken images
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-gray-400 text-center">No images available</p>
      )}
    </div>
  );
};

export default PropertyGalleryCarousel;
