import { Link } from "react-router-dom";

function TourList({ tours, onDelete, onUpdate, onBook }) {
  if (tours.length === 0) {
    return (
      <div className="bg-white p-6 mt-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <p className="text-black text-center font-bold">NO TOURS AVAILABLE</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 mt-4 overflow-x-auto border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-4 text-black uppercase">
        Tour List
      </h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-yellow-300 border-4 border-black">
            <th className="text-left p-3 font-black text-black uppercase">ID</th>
            <th className="text-left p-3 font-black text-black uppercase">Name</th>
            <th className="text-left p-3 font-black text-black uppercase">Price</th>
            <th className="text-left p-3 font-black text-black uppercase">Company</th>
            <th className="text-left p-3 font-black text-black uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="border-b-4 border-black hover:bg-pink-100">
              <td className="p-3 text-sm font-bold">{tour.id}</td>
              <td className="p-3 font-bold">{tour.name}</td>
              <td className="p-3 font-black">${tour.price}</td>
              <td className="p-3">
                {tour.company ? (
                  <Link
                    to={`/companies/${tour.company.id}`}
                    className="text-black font-bold underline hover:bg-yellow-200 px-1"
                  >
                    {tour.company.name}
                  </Link>
                ) : (
                  <span className="text-gray-400 font-bold">N/A</span>
                )}
              </td>
              <td className="p-3 flex gap-2 flex-wrap">
                <button
                  onClick={() => onUpdate(tour)}
                  className="bg-yellow-400 text-black px-3 py-2 border-3 border-black text-xs hover:bg-yellow-300 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black uppercase"
                >
                  Update
                </button>
                <button
                  onClick={() => onDelete(tour)}
                  className="bg-red-400 text-black px-3 py-2 border-3 border-black text-xs hover:bg-red-300 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black uppercase"
                >
                  Delete
                </button>
                <button
                  onClick={() => onBook(tour)}
                  className="bg-green-400 text-black px-3 py-2 border-3 border-black text-xs hover:bg-green-300 cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-black uppercase"
                >
                  Book Ticket
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
