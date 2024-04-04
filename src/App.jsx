import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Box from "@mui/material/Box";
import ProtectedRoute from "./auth/ProtectedRoute";
import ExternalLayout from "./pages/ExternalLayout";
import { useAuthState } from "./contexts/AuthContext";

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

function App() {
  const { isLoggedIn } = useAuthState();

  return (
    <Router>
      <Routes>
        {/* External and Protected pages */}
        <Route
          path="/"
          element={
            <ExternalLayout isLoggedIn={isLoggedIn}>
              <Home />
            </ExternalLayout>
          }
        />
        <Route
          path="/login"
          element={
            <ExternalLayout isLoggedIn={isLoggedIn}>
              <Login />
            </ExternalLayout>
          }
        />
        <Route
          path="/register"
          element={
            <ExternalLayout isLoggedIn={isLoggedIn}>
              <Register />
            </ExternalLayout>
          }
        />
        <Route
          path="/chatroom"
          element={
            <ExternalLayout isLoggedIn={isLoggedIn}>
              <ChatRoom />
            </ExternalLayout>
          }
        />

        {/* Using ExternalLayout to wrap ProtectedRoute for consistent layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Dashboard />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <BuyPokemon />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/release-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <ReleasePokemon />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sell-pokemon"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <SellPokemon />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-trade"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <TradePokemon />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trade-interests"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <TradeInterests />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/complete-trade"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <TradeComplete />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/leafy-village"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <LeafyVillage />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/moonlight-field"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <MoonlightField />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dark-meadow"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <DarkMeadow />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokedex"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Pokedex />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/set-moves"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <SetMoves />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-roster"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <TeamRoster />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-box"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <ViewBox />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/battle"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Battle />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/individual-rankings"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Individual />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/rarity-list"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Rarity />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/team-rankings"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Team />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <Profile />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sign-out"
          element={
            <ProtectedRoute>
              <ExternalLayout isLoggedIn={isLoggedIn}>
                <SignOut />
              </ExternalLayout>
            </ProtectedRoute>
          }
        />

        {/* Redirect based on authentication status */}
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
