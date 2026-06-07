import { useState } from "react";
import Cart from "../components/Cart.jsx";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog.jsx";
import TourForm from "../components/TourForm.jsx";
import TourList from "../components/TourList.jsx";
import UpdateTourDialog from "../components/UpdateTourDialog.jsx";
import { useCart } from "../features/cart/CartContext.jsx";
import useTours from "../features/tours/hooks/useTours.js";

function TourPage() {
  const {
    tours,
    totalTours,
    loading,
    error,
    hasMore,
    refreshTours,
    loadMoreTours,
    removeTour,
  } = useTours();
  const {
    cart,
    bookTour,
    increaseQuantity,
    decreaseQuantity,
    emptyCart,
  } = useCart();
  const [tourToDelete, setTourToDelete] = useState(null);
  const [tourToUpdate, setTourToUpdate] = useState(null);
  const [actionError, setActionError] = useState("");

  const confirmDelete = async () => {
    try {
      setActionError("");
      await removeTour(tourToDelete.id);
      setTourToDelete(null);
    } catch (requestError) {
      setActionError(
        requestError.response?.data?.message ?? "Unable to delete tour."
      );
    }
  };

  const completeUpdate = async () => {
    setTourToUpdate(null);
    await refreshTours();
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <TourForm onTourCreated={refreshTours} />

        {(error || actionError) && (
          <p className="mt-6 border-4 border-red-700 bg-red-100 p-4 font-black text-red-800">
            {error || actionError}
          </p>
        )}

        {loading && tours.length === 0 ? (
          <p className="mt-6 font-black">Loading tours...</p>
        ) : (
          <TourList
            tours={tours}
            onDelete={setTourToDelete}
            onUpdate={setTourToUpdate}
            onBook={bookTour}
          />
        )}

        {hasMore && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={loadMoreTours}
              disabled={loading}
              className="bg-cyan-400 text-black px-8 py-4 border-4 border-black font-black uppercase disabled:opacity-60 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
            <p className="text-sm text-black mt-3 font-bold">
              {tours.length} / {totalTours} tours
            </p>
          </div>
        )}
      </div>

      <Cart
        cart={cart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onEmpty={emptyCart}
      />

      {tourToDelete && (
        <DeleteConfirmDialog
          tour={tourToDelete}
          onConfirm={confirmDelete}
          onCancel={() => setTourToDelete(null)}
        />
      )}

      {tourToUpdate && (
        <UpdateTourDialog
          tour={tourToUpdate}
          onSubmit={completeUpdate}
          onCancel={() => setTourToUpdate(null)}
        />
      )}
    </div>
  );
}

export default TourPage;
