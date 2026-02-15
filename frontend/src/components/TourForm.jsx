import { useState, useEffect } from "react";
import axios from "axios";
import API from "../config/api";

function TourForm({ onTourCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(API.COMPANIES_DROPDOWN);
        setCompanies(res.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Tour name is required";
    }
    if (!price && price !== 0) {
      newErrors.price = "Tour price is required";
    } else if (Number(price) <= 0) {
      newErrors.price = "Price must be larger than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const tourData = {
        name: name.trim(),
        price: Number(price),
      };
      if (companyId) {
        tourData.company = companyId;
      }
      await axios.post(API.TOURS, tourData);
      setName("");
      setPrice("");
      setCompanyId("");
      setErrors({});
      onTourCreated();
    } catch (error) {
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach((err) => {
          serverErrors[err.field] = err.message;
        });
        setErrors(serverErrors);
      } else {
        console.error("Error creating tour:", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Add New Tour</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="Tour Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border p-2 rounded ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={`w-full border p-2 rounded ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>
        <div>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select Company (optional)</option>
            {companies.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Add Tour
        </button>
      </form>
    </div>
  );
}

export default TourForm;
