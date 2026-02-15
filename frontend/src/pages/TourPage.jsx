import { useState, useEffect } from "react";
import axios from "axios";
import API from "../config/api";
import TourList from "../components/TourList.jsx";
import TourForm from "../components/TourForm.jsx";
import UpdateTourDialog from "../components/UpdateTourDialog.jsx";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog.jsx";
import Cart from "../components/Cart.jsx";

function TourPage() {
  const [tours, setTours] = useState([]);
  const [totalTours, setTotalTours] = useState(0);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Delete dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [tourToDelete, setTourToDelete] = useState(null);

  // Update dialog state
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [tourToUpdate, setTourToUpdate] = useState(null);

  // Cart state
  const [cart, setCart] = useState([]);

  const fetchTours = async (pageNum = 1) => {
    try {
      const res = await axios.get(API.TOURS, {
        params: { page: pageNum, limit: PAGE_SIZE },
      });
      if (pageNum === 1) {
        setTours(res.data.tours);
      } else {
        setTours((prev) => [...prev, ...res.data.tours]);
      }
      setTotalTours(res.data.total);
      setPage(pageNum);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    fetchTours(1);
  }, []);

  const handleTourCreated = () => {
    fetchTours(1);
  };

  // DELETE handlers
  const handleDeleteClick = (tour) => {
    setTourToDelete(tour);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API.TOURS}/${tourToDelete.id}`);
      setShowDeleteDialog(false);
      setTourToDelete(null);
      fetchTours(1);
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setTourToDelete(null);
  };

  // UPDATE handlers
  const handleUpdateClick = (tour) => {
    setTourToUpdate(tour);
    setShowUpdateDialog(true);
  };

  const handleUpdateSubmit = async () => {
    setShowUpdateDialog(false);
    setTourToUpdate(null);
    fetchTours(1);
  };

  const handleUpdateCancel = () => {
    setShowUpdateDialog(false);
    setTourToUpdate(null);
  };

  // CART handlers
  const handleBookTicket = (tour) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === tour.id);
      if (existing) {
        return prev.map((item) =>
          item.id === tour.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...tour, quantity: 1 }];
    });
  };

  const handleIncreaseQty = (tourId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === tourId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQty = (tourId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === tourId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  // LOAD MORE
  const handleLoadMore = () => {
    fetchTours(page + 1);
  };

  const hasMore = tours.length < totalTours;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <TourForm onTourCreated={handleTourCreated} />

        <TourList
          tours={tours}
          onDelete={handleDeleteClick}
          onUpdate={handleUpdateClick}
          onBook={handleBookTicket}
        />

        {hasMore && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 cursor-pointer"
            >
              Load More
            </button>
            <p className="text-sm text-gray-500 mt-1">
              Showing {tours.length} of {totalTours} tours
            </p>
          </div>
        )}
      </div>

      <div>
        <Cart
          cart={cart}
          onIncrease={handleIncreaseQty}
          onDecrease={handleDecreaseQty}
          onEmpty={handleEmptyCart}
        />
      </div>

      {showDeleteDialog && tourToDelete && (
        <DeleteConfirmDialog
          tour={tourToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {showUpdateDialog && tourToUpdate && (
        <UpdateTourDialog
          tour={tourToUpdate}
          onSubmit={handleUpdateSubmit}
          onCancel={handleUpdateCancel}
        />
      )}
    </div>
  );
}

export default TourPage;
