import useTourForm from "../features/tours/hooks/useTourForm.js";

function UpdateTourDialog({ tour, onSubmit, onCancel }) {
  const {
    values,
    companies,
    errors,
    submitting,
    setField,
    submit,
  } = useTourForm({ tour, onSuccess: onSubmit });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-tour-title"
    >
      <div className="bg-white p-8 max-w-md w-full mx-4 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h3
          id="update-tour-title"
          className="text-3xl font-black mb-6 text-black uppercase"
        >
          Update Tour #{tour.id}
        </h3>

        <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
          <div>
            <label htmlFor="update-tour-name" className="font-black uppercase">
              Name
            </label>
            <input
              id="update-tour-name"
              type="text"
              value={values.name}
              onChange={(event) => setField("name", event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={`mt-1 w-full border-4 border-black p-3 font-bold focus:outline-none ${
                errors.name ? "bg-red-200" : "bg-white focus:bg-yellow-100"
              }`}
            />
            {errors.name && (
              <p className="text-red-700 text-sm mt-2 font-black">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="update-tour-price" className="font-black uppercase">
              Price (USD)
            </label>
            <input
              id="update-tour-price"
              type="number"
              min="1"
              value={values.price}
              onChange={(event) => setField("price", event.target.value)}
              aria-invalid={Boolean(errors.price)}
              className={`mt-1 w-full border-4 border-black p-3 font-bold focus:outline-none ${
                errors.price ? "bg-red-200" : "bg-white focus:bg-yellow-100"
              }`}
            />
            {errors.price && (
              <p className="text-red-700 text-sm mt-2 font-black">
                {errors.price}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="update-tour-company"
              className="font-black uppercase"
            >
              Operating Company
            </label>
            <select
              id="update-tour-company"
              value={values.companyId}
              onChange={(event) => setField("companyId", event.target.value)}
              aria-invalid={Boolean(errors.companyId)}
              className={`mt-1 w-full border-4 border-black p-3 font-bold focus:outline-none ${
                errors.companyId ? "bg-red-200" : "bg-white focus:bg-yellow-100"
              }`}
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            {errors.companyId && (
              <p className="text-red-700 text-sm mt-2 font-black">
                {errors.companyId}
              </p>
            )}
          </div>

          {errors.form && (
            <p className="border-4 border-red-700 bg-red-100 p-3 font-black text-red-800">
              {errors.form}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 px-6 py-3 border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-lime-400 px-6 py-3 border-4 border-black font-black uppercase disabled:opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTourDialog;
