import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API from "../config/api";

function CompanyProfilePage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const [companyRes, toursRes] = await Promise.all([
          axios.get(`${API.COMPANIES}/${id}`),
          axios.get(`${API.COMPANIES}/${id}/tours`),
        ]);
        setCompany(companyRes.data);
        setTours(toursRes.data);
      } catch (error) {
        console.error("Error fetching company:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  if (!company) {
    return <p className="text-center mt-8 text-red-500">Company not found.</p>;
  }

  return (
    <div>
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Tours
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Company Profile</h2>
        <div className="flex items-center gap-4 mb-4">
          <div>
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {company.name}
            </p>
            <p className="text-lg flex items-center gap-2">
              <span className="font-semibold">Country:</span> {company.country}
              {company.flagUrl && (
                <img
                  src={company.flagUrl}
                  alt={`${company.country} flag`}
                  style={{ width: "30px" }}
                />
              )}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Revenue:</span> $
              {company.revenue?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">
          Tours managed by {company.name}
        </h3>
        {tours.length === 0 ? (
          <p className="text-gray-500">No tours found for this company.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id} className="border-b">
                  <td className="p-2 text-sm text-gray-600">{tour.id}</td>
                  <td className="p-2">{tour.name}</td>
                  <td className="p-2">${tour.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CompanyProfilePage;
