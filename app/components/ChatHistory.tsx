"use client";
import { Drawer, List, ListItem, ListItemText, IconButton, Toolbar } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useState } from "react";

export default function ChatHistory({ history, onSelect }: any) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ position: "absolute", right: 20, top: 80, zIndex: 1200 }}
      >
        <HistoryIcon />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Toolbar>
          <h3>Chat History</h3>
        </Toolbar>
        <List sx={{ width: 300 }}>
          {history.map((item: any, i: number) => (
            <ListItem button key={i} onClick={() => onSelect(item)}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
