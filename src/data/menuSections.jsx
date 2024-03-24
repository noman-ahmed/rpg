export const menuSections = [
  {
    title: "Pokemon",
    items: [
      { name: "Team Roster", path: "/team-roster" },
      { name: "View Box", path: "/view-box" },
      { name: "Set Moves", path: "/set-moves" },
      { name: "Pokedex", path: "/pokedex" },
    ],
  },
  {
    title: "Maps",
    items: [
      { name: "Leafy Village", path: "/leafy-village" },
      { name: "Moonlight Field", path: "/moonlight-field" },
      { name: "Dark Meadow", path: "/dark-meadow" },
    ],
  },
  {
    title: "Trade",
    items: [
      { name: "Create a Trade", path: "/create-trade" },
      { name: "Trade Interests", path: "/trade-interests" },
      { name: "Complete a Trade", path: "/complete-trade" },
    ],
  },
  {
    title: "Buy",
    items: [
      { name: "Buy Pokemon", path: "/buy-pokemon" },
      { name: "Sell Pokemon", path: "/sell-pokemon" },
      { name: "Release Pokemon", path: "/release-pokemon" },
    ],
  },
  {
    title: "Rankings",
    items: [
      { name: "Individual Rankings", path: "/individual-rankings" },
      { name: "Team Rankings", path: "/team-rankings" },
      { name: "Rarity List", path: "/rarity-list" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "My Profile", path: "/my-profile" },
      { name: "Sign Out", path: "/" }, // Assuming this might trigger a logout function rather than navigate
    ],
  },
];
