import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AdminAllBetsPage from "./pages/adminPages/AdminAllBetsPage";
import AdminBetSimulationPage from "./pages/adminPages/AdminBetSimulationPage";
import AdminDrawingPage from "./pages/adminPages/AdminDrawingPage";
import PlayerBettingHistoryPage from "./pages/playerPages/PlayerBettingHistoryPage";
import PlayerBettingPage from "./pages/playerPages/PlayerBettingPage";
import PlayerPrizesPage from "./pages/playerPages/PlayerPrizesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fogadasok" element={<AdminAllBetsPage />} />
        <Route
          path="/fogadas-szimulacio"
          element={<AdminBetSimulationPage />}
        />
        <Route path="/sorsolas" element={<AdminDrawingPage />} />
        <Route path="/szelvenyeim" element={<PlayerBettingHistoryPage />} />
        <Route path="/fogadasaim" element={<PlayerBettingPage />} />
        <Route path="/nyeremenyeim" element={<PlayerPrizesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
