import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourPage from "./pages/TourPage.jsx";
import CompanyProfilePage from "./pages/CompanyProfilePage.jsx";
import { CartProvider } from "./features/cart/CartContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen">
          <header className="relative bg-black text-white p-6 border-b-4 border-black">
            <div className="absolute left-4 top-4 bg-yellow-300 px-3 py-2 text-sm font-black text-black">
              BACKEND SPECIALIST
            </div>
            <div className="container mx-auto">
              <h1 className="text-5xl font-black text-center flex items-center justify-center gap-3">
                WONDER TOUR
              </h1>
              <p className="text-center mt-2 text-yellow-300 font-bold text-lg">
                SOUTHEAST ASIA TOUR MANAGEMENT
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<TourPage />} />
              <Route path="/companies/:id" element={<CompanyProfilePage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
