import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:4090";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch(`${API_URL}/enquire/all`);
        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }
        const data = await response.json();
        setEnquiries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-300">Loading enquiries...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-xl text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">All Enquiries</h1>
      {enquiries.length === 0 ? (
        <p className="text-center text-gray-400">No enquiries found.</p>
      ) : (
        <div className="bg-gray-900/60 rounded-xl shadow-xl overflow-hidden border border-gray-800">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Enquiry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-800">
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{enquiry.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{enquiry.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{enquiry.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{enquiry.enquiry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{new Date(enquiry.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquiryList;
