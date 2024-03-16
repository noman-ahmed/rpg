import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#252525",
            color: "#ffffff",
            justifyContent: "center",
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              margin: "2rem",
              paddingBottom: "1.2rem",
              border: "2px solid #303030",
              borderRadius: "10px",
            }}
          >
            <Typography className="roster">
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/charizard.png"
                width="50"
              />
              <h5 sx={{ padding: 0 }}>Shiny Charizard &#9794;</h5>
              <h6 sx={{ padding: 0 }}>Level: 2,400</h6>
            </Typography>
            <Typography className="roster">
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/1x/blastoise.png"
                width="50"
              />
              <h5>Shiny Blastoise</h5>
              <h6>Level: 2,400</h6>
            </Typography>
            <Typography className="roster">
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/venusaur.png"
                width="50"
              />
              <h5>Shiny Venusaur &#9792;</h5>
              <h6>Level: 2,400</h6>
            </Typography>
            <Typography className="roster">
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/1x/regirock.png"
                width="50"
              />
              <h5>Shiny Regirock</h5>
              <h6>Level: 2,400</h6>
            </Typography>
            <Typography className="roster">
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/regice.png"
                width="50"
              />
              <h5>Shiny Regice</h5>
              <h6>Level: 2,400</h6>
            </Typography>
            <Typography>
              <img
                src="https://img.pokemondb.net/sprites/home/shiny/registeel.png"
                width="50"
              />
              <h5>Shiny Registeel</h5>
              <h6>Level: 2,400</h6>
            </Typography>
          </Box>
        </Box>
      </Drawer>
      <hr />
    </>
  );
}
