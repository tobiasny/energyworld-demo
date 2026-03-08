import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { MapPage } from "@/pages/MapPage";
import { FieldDetailPage } from "@/pages/FieldDetailPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold">NCS Overview</h1>
            <span className="text-sm text-muted-foreground">
              Norwegian Continental Shelf Production
            </span>
          </div>
        </header>

        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">
          <Routes>
            <Route path="/" element={<MapPage />} />
            <Route path="/field/:fieldId" element={<FieldDetailPage />} />
          </Routes>
        </main>

        <Toaster position="top-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
