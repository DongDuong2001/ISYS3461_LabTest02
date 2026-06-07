import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Cart from "../components/Cart.jsx";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog.jsx";
import TourList from "../components/TourList.jsx";
import UpdateTourDialog from "../components/UpdateTourDialog.jsx";
import { useCart } from "../features/cart/CartContext.jsx";
import useCompanyProfile from "../features/companies/hooks/useCompanyProfile.js";
import useTours from "../features/tours/hooks/useTours.js";

function CompanyProfilePage() {
  const { id } = useParams();
  const {
    company,
    loading: companyLoading,
    error: companyError,
  } = useCompanyProfile(id);
  const {
    tours,
    loading: toursLoading,
    error: toursError,
    refreshTours,
    removeTour,
  } = useTours({ companyId: id, lazy: false });
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

  if (companyLoading) {
    return <p className="text-center mt-8 font-black">Loading company...</p>;
  }

  if (!company) {
    return (
      <p className="border-4 border-red-700 bg-red-100 p-4 font-black text-red-800">
        {companyError || "Company not found."}
      </p>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="mb-6 inline-block bg-white px-4 py-2 border-4 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        Back to Tours
      </Link>

      <section className="bg-white p-8 mb-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-3xl font-black mb-6 text-black uppercase">
          Company Profile
        </h2>
        <dl className="space-y-3 text-lg">
          <div>
            <dt className="inline font-black uppercase">Name: </dt>
            <dd className="inline font-bold">{company.name}</dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="font-black uppercase">Country:</dt>
            <dd className="font-bold">{company.country}</dd>
            {company.flagUrl && (
              <img
                src={company.flagUrl}
                alt={`${company.country} flag`}
                width="30"
                className="h-auto border-2 border-black"
              />
            )}
          </div>
          <div>
            <dt className="inline font-black uppercase">Revenue: </dt>
            <dd className="inline font-black">
              ${company.revenue.toLocaleString()}
            </dd>
          </div>
        </dl>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {(toursError || actionError) && (
            <p className="border-4 border-red-700 bg-red-100 p-4 font-black text-red-800">
              {toursError || actionError}
            </p>
          )}

          {toursLoading ? (
            <p className="font-black">Loading company tours...</p>
          ) : (
            <TourList
              tours={tours}
              onDelete={setTourToDelete}
              onUpdate={setTourToUpdate}
              onBook={bookTour}
            />
          )}
        </div>

        <Cart
          cart={cart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onEmpty={emptyCart}
        />
      </div>

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

export default CompanyProfilePage;
