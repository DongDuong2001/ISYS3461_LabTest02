import { BrowserRouter, Routes, Route } from "react-router-dom";
import TourPage from "./pages/TourPage.jsx";
import CompanyProfilePage from "./pages/CompanyProfilePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">Wonder Tour</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TourPage />} />
            <Route path="/companies/:id" element={<CompanyProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
