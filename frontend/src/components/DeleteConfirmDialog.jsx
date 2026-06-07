function DeleteConfirmDialog({ tour, onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-tour-title"
    >
      <div className="bg-white p-8 max-w-md w-full mx-4 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h3
          id="delete-tour-title"
          className="text-3xl font-black mb-4 text-black uppercase"
        >
          Delete Tour?
        </h3>
        <p className="mb-6 text-black font-bold leading-relaxed">
          Delete <span className="bg-yellow-300 px-1">{tour.name}</span> (ID: {tour.id})?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-black px-6 py-3 border-4 border-black hover:bg-gray-200 cursor-pointer font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-400 text-black px-6 py-3 border-4 border-black hover:bg-red-300 cursor-pointer font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmDialog;
