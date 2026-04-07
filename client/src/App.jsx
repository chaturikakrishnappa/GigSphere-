import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Matches from "./pages/Matches";
import PostGig from "./pages/PostGig";
import BrowseGigs from "./pages/BrowseGigs";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/post-gig" element={<PostGig />} />
            <Route path="/browse-gigs" element={<BrowseGigs />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/ai-matches" element={<Matches />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
