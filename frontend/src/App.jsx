import { useState } from "react";
// // import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import PropertyShow from "./components/PropertyShow";
import Calculator from "./components/Calculator";
import EnquiryForm from "./components/EnquiryForm";
import PropertyGallery from "./components/PropertyGallery";
import EnquiryList from "./components/EnquiryList";
// // import Auth from "./Auth";

// // function AppContent() {
export default function App() {
  // export default function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [params, setParams] = useState({});
  const [user, setUser] = useState(null);

  const handleNavigate = (page, pageParams = {}) => {
    setCurrentPage(page);
    setParams(pageParams);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentPage("home");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "property":
        return (
          <PropertyShow
            propertyName={params.name}
            onNavigate={handleNavigate}
          />
        );
      case "gallery":
        return <PropertyGallery />;
      case "calculator":
        return <Calculator />;
      case "enquiry-form":
        return <EnquiryForm />;
      case "enquiries":
        return <EnquiryList />;
      case "auth":
        return <div>Auth (create this component)</div>;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
     <Navbar onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <main className="flex-1 container mx-auto px-6 py-10">{renderPage()}</main>
      <Footer />
    </div>
    

  );
  }

  // export default function App() {
  //   return (
  //     // <GoogleOAuthProvider clientId="286883709485-u64618t640d2uvlto2uqrfhf2invbaoi.apps.googleusercontent.com">
  //     <AppContent />
  //     // </GoogleOAuthProvider>
  //   );
  // }

// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
//       <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-12 rounded-3xl shadow-2xl text-center max-w-lg mx-4 transform hover:scale-105 transition-all duration-300">
//         <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
//           TAILWIND WORKS!
//         </h1>
//         <p className="text-xl text-blue-100 mb-8 font-light tracking-wide">
//           If you see gradients, shadows, and hover effects → SUCCESS ✅
//         </p>
//         <button className="px-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl text-lg shadow-xl hover:bg-indigo-50 hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
//           Test Button
//         </button>
//       </div>
//     </div>
//   );
// }

