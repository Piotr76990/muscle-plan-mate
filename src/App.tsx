import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MuscleMap from "./pages/MuscleMap";
import Exercises from "./pages/Exercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import Plan from "./pages/Plan";
import History from "./pages/History";
import Weight from "./pages/Weight";
import NotFound from "./pages/NotFound";
import { BottomNav } from "./components/BottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/muscle-map" element={<MuscleMap />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/history" element={<History />} />
          <Route path="/weight" element={<Weight />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
