import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import Adhkar from "./pages/Adhkar";
import QuranWeb from "./pages/QuranWeb";
import CompassPage from "./pages/CompassPage";
import NotFound from "./pages/NotFound";
import { NavigationTabs } from "@/components/NavigationTabs";
import { IslamicHeader } from "@/components/IslamicHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <IslamicHeader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/adhkar" element={<Adhkar />} />
            <Route path="/quran-web" element={<QuranWeb />} />
            <Route path="/compass" element={<CompassPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <NavigationTabs />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
