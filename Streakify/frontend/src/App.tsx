import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles"; // GlobalStyles hinzufügen
import LoginPage from "./pages/LoginPage/LoginPage";
import Tutorial from "./pages/Tutorial";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { Provider } from "react-redux";
import store from "./store";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import MissionPage from "./pages/MissionPage/MissionPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import { MissionsProvider } from "./components/Mission/missionsContext"; // MissionsContext importieren
import ShopItemForm from "./pages/ShopPage/ShopItemForm"; // ShopItemForm importieren

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MissionsProvider>
        {/* Globale Styles für die gesamte App */}
        <GlobalStyles />
        <Router>
          <Routes>
            {/* Routen der App */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/missions" element={<MissionPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/verify" element={<VerificationPage />} />
            <Route path="/create-item" element={<ShopItemForm />} />
          </Routes>
        </Router>
      </MissionsProvider>
    </Provider>
  );
};

export default App;
