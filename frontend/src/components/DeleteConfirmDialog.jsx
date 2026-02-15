function DeleteConfirmDialog({ tour, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p className="mb-6">
          Are you sure you want to delete tour <strong>{tour.name}</strong> with
          ID <strong>{tour.id}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmDialog;
