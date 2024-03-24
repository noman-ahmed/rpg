import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";

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

function ExternalLayout({ children }) {
  return (
    <>
      <Header />
      <Box component="main">{children}</Box>
      <Footer />
    </>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        {/* External pages */}
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
        {/* Internal pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Buy pages */}
        <Route path="/buy-pokemon" element={<BuyPokemon />} />
        <Route path="/release-pokemon" element={<ReleasePokemon />} />
        <Route path="/sell-pokemon" element={<SellPokemon />} />
        {/* Trade pages */}
        <Route path="/create-trade" element={<TradePokemon />} />
        <Route path="/trade-interests" element={<TradeInterests />} />
        <Route path="/complete-trade" element={<TradeComplete />} />
        {/* Maps pages */}
        <Route path="/leafy-village" element={<LeafyVillage />} />
        <Route path="/moonlight-field" element={<MoonlightField />} />
        <Route path="/dark-meadow" element={<DarkMeadow />} />
        {/* Pokemon pages */}
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/set-moves" element={<SetMoves />} />
        <Route path="/team-roster" element={<TeamRoster />} />
        <Route path="/view-box" element={<ViewBox />} />
        {/* Battle pages */}
        <Route path="/battle" element={<Battle />} />
        {/* Ranking pages */}
        <Route path="/individual-rankings" element={<Individual />} />
        <Route path="/rarity-list" element={<Rarity />} />
        <Route path="/team-rankings" element={<Team />} />
        {/* Account pages */}
        <Route path="/my-profile" element={<Profile />} />
        <Route path="/sign-out" element={<SignOut />} />
      </Routes>
    </Router>
  );
}

export default App;
