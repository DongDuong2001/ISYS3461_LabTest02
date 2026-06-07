function Cart({ cart, onIncrease, onDecrease, onEmpty }) {
  const totalTickets = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="self-start bg-white p-6 sticky top-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black mb-4 text-black uppercase">
        Ticket Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-black text-center py-6 font-bold">Cart is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b-4 border-black pb-3 p-2 hover:bg-cyan-100"
              >
                <div className="flex-1">
                  <p className="font-black text-sm">{item.name}</p>
                  <p className="text-black text-xs font-bold">ID: {item.id}</p>
                  <p className="text-black text-xs font-bold">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onDecrease(item.id)}
                    aria-label={`Decrease tickets for ${item.name}`}
                    className="bg-red-300 text-black w-8 h-8 border-3 border-black hover:bg-red-200 cursor-pointer text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                  >
                    −
                  </button>
                  <span className="text-sm font-black w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onIncrease(item.id)}
                    aria-label={`Increase tickets for ${item.name}`}
                    className="bg-green-300 text-black w-8 h-8 border-3 border-black hover:bg-green-200 cursor-pointer text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-black pt-4 bg-yellow-100 -mx-6 px-6 py-4 mt-4">
            <p className="font-black text-lg mb-1">
              TICKETS: {totalTickets}
            </p>
            <p className="font-black text-xl">
              TOTAL: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <button
            onClick={onEmpty}
            className="mt-4 w-full bg-red-400 text-black px-4 py-3 border-4 border-black font-black uppercase hover:bg-red-300 cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Empty Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
