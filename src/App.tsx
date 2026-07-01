import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SearchPage } from "@/pages/SearchPage";
import { ShortlistPage } from "@/pages/ShortlistPage";

const ProfileDetailPage = lazy(() =>
  import("@/pages/ProfileDetailPage").then((m) => ({
    default: m.ProfileDetailPage,
  }))
);

function App() {
  return (
    <BrowserRouter basename="/wobb-vibe-coder-assignment">
      <Suspense fallback={<div className="p-8 text-gray-400">Loading...</div>}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
          <Route path="/shortlist" element={<ShortlistPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
