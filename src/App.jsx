import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import { useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// Components
import Header from "./components/header";
import Footer from "./components/footer/Footer";

// Main Pages
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import ChatRoom from "./pages/chatroom";
import Battle from "./pages/Battle";
import Dashboard from "./pages/Dashboard";

// Buy Pages
import BuyPokemon from "./pages/Buy/BuyPokemon";
import ReleasePokemon from "./pages/Buy/ReleasePokemon";
import SellPokemon from "./pages/Buy/SellPokemon";

// Trade Pages
import TradePokemon from "./pages/Trade/Trade";
import TradeInterests from "./pages/Trade/Interests";
import TradeComplete from "./pages/Trade/CompleteTrade";

// Map Pages
import LeafyVillage from "./pages/Maps/LeafyVillage";
import MoonlightField from "./pages/Maps/MoonlightField";
import DarkMeadow from "./pages/Maps/DarkMeadow";

// Pokemon Pages
import Pokedex from "./pages/Pokemon/Pokedex";
import SetMoves from "./pages/Pokemon/SetMoves";
import TeamRoster from "./pages/Pokemon/TeamRoster";
import ViewBox from "./pages/Pokemon/ViewBox";

// Ranking Pages
import Individual from "./pages/Rankings/Individual";
import Rarity from "./pages/Rankings/Rarity";
import Team from "./pages/Rankings/Team";

// Account Pages
import Profile from "./pages/Account/Profile";
import SignOut from "./pages/Account/SignOut";

function ExternalLayout({ children, showHeader = true }) {
  return (
    <>
      {showHeader && <Header />}
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
}

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        {/* External and Protected pages */}
        <Route path="/" element={<ExternalLayout children={<Home />} />} />
        <Route
          path="/login"
          element={<ExternalLayout children={<Login />} />}
        />
        <Route
          path="/register"
          element={<ExternalLayout children={<Register />} />}
        />
        <Route
          path="/chatroom"
          element={<ExternalLayout children={<ChatRoom />} />}
        />

        {/* Using ExternalLayout to wrap ProtectedRoute for consistent layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Dashboard />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<BuyPokemon />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/release-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout
                children={<ReleasePokemon />}
                showHeader={false}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<SellPokemon />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trade"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<TradePokemon />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trade-interests"
          element={
            <ProtectedRoute>
              <ExternalLayout
                children={<TradeInterests />}
                showHeader={false}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-trade"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<TradeComplete />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leafy-village"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<LeafyVillage />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/moonlight-field"
          element={
            <ProtectedRoute>
              <ExternalLayout
                children={<MoonlightField />}
                showHeader={false}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dark-meadow"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<DarkMeadow />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokedex"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Pokedex />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-moves"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<SetMoves />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-roster"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<TeamRoster />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-box"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<ViewBox />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/battle"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Battle />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/individual-rankings"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Individual />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rarity-list"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Rarity />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-rankings"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Team />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<Profile />} showHeader={false} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-out"
          element={
            <ProtectedRoute>
              <ExternalLayout children={<SignOut />} showHeader={false} />
            </ProtectedRoute>
          }
        />

        {/* Redirect unknown routes based on isLoggedIn status */}
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
