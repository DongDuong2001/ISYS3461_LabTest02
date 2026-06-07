import useTourForm from "../features/tours/hooks/useTourForm.js";

function TourForm({ onTourCreated }) {
  const {
    values,
    companies,
    errors,
    submitting,
    setField,
    submit,
  } = useTourForm({ onSuccess: onTourCreated });

  return (
    <section className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-4 text-black uppercase">
        Add Tour
      </h2>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <div>
          <label htmlFor="create-tour-name" className="font-black uppercase">
            Name
          </label>
          <input
            id="create-tour-name"
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
          <label htmlFor="create-tour-price" className="font-black uppercase">
            Price (USD)
          </label>
          <input
            id="create-tour-price"
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
          <label htmlFor="create-tour-company" className="font-black uppercase">
            Operating Company
          </label>
          <select
            id="create-tour-company"
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

        <button
          type="submit"
          disabled={submitting}
          className="bg-lime-400 text-black px-6 py-3 border-4 border-black font-black uppercase hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {submitting ? "Creating..." : "Create Tour"}
        </button>
      </form>
    </section>
  );
}

export default TourForm;
