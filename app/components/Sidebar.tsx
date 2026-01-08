"use client";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Box,
  Tooltip,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PolicyIcon from "@mui/icons-material/Policy";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const sections = [
  { text: "Academics", icon: <SchoolIcon />, message: "Tell me about GMU academic programs" },
  { text: "Housing", icon: <HomeIcon />, message: "Tell me about GMU housing options" },
  { text: "Transport", icon: <DirectionsBusIcon />, message: "What are the GMU shuttle timings?" },
  { text: "Dining", icon: <RestaurantIcon />, message: "What dining options are available on campus?" },
  { text: "Policies", icon: <PolicyIcon />, message: "What are GMU student policies?" },
];

export default function Sidebar({ onSelect }: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const drawerWidth = 220;

  const handleClick = (item: any) => {
    setActive(item.text);
    onSelect(item.message);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ bgcolor: "#006633", height: "100%", color: "white" }}>
      <Toolbar>
        <h3 style={{ margin: "auto", color: "#FFCC33" }}>GMU Sections</h3>
      </Toolbar>
      <List>
        {sections.map((item) => (
          <Tooltip key={item.text} title={`Learn about ${item.text}`} placement="right" arrow>
            <ListItemButton
              onClick={() => handleClick(item)}
              sx={{
                backgroundColor: active === item.text ? "#FFCC33" : "transparent",
                color: active === item.text ? "#000" : "white",
                "&:hover": {
                  backgroundColor: active === item.text ? "#FFD84D" : "rgba(255,255,255,0.2)",
                },
                transition: "0.2s",
              }}
            >
              <ListItemIcon sx={{ color: active === item.text ? "#000" : "white" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <IconButton
        color="primary"
        onClick={() => setMobileOpen(!mobileOpen)}
        sx={{
          display: { sm: "none" },
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1200,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawers */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        {/* Mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "border-box" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
