function Cart({ cart, onIncrease, onDecrease, onEmpty }) {
  const totalTickets = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Booking Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item.id)}
                    className="bg-gray-200 text-gray-800 w-7 h-7 rounded hover:bg-gray-300 cursor-pointer text-sm"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    className="bg-gray-200 text-gray-800 w-7 h-7 rounded hover:bg-gray-300 cursor-pointer text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold">
              Total Tickets: <span className="text-blue-600">{totalTickets}</span>
            </p>
            <p className="font-semibold">
              Total Price:{" "}
              <span className="text-green-600">${totalPrice.toFixed(2)} USD</span>
            </p>
          </div>

          <button
            onClick={onEmpty}
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
          >
            Empty Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
