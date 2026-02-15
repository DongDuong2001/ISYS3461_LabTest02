import { Link } from "react-router-dom";

function TourList({ tours, onDelete, onUpdate, onBook }) {
  if (tours.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-4">
        <p className="text-gray-500 text-center">No tours available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-xl font-bold mb-4">Tour List</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price (USD)</th>
            <th className="text-left p-2">Company</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id} className="border-b hover:bg-gray-50">
              <td className="p-2 text-sm text-gray-600">{tour._id}</td>
              <td className="p-2">{tour.name}</td>
              <td className="p-2">${tour.price}</td>
              <td className="p-2">
                {tour.company ? (
                  <Link
                    to={`/companies/${tour.company._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {tour.company.name}
                  </Link>
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </td>
              <td className="p-2 flex gap-2 flex-wrap">
                <button
                  onClick={() => onUpdate(tour)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 cursor-pointer"
                >
                  UPDATE
                </button>
                <button
                  onClick={() => onDelete(tour)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 cursor-pointer"
                >
                  DELETE
                </button>
                <button
                  onClick={() => onBook(tour)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 cursor-pointer"
                >
                  Book a Ticket
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TourList;
